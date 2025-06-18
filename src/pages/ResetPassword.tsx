'use client'; // This directive is crucial for Client Components in the App Router

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'; // Next.js App Router hooks
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
  AuthError, // Import AuthError for better type checking if available in your Firebase SDK version
} from "firebase/auth";
import { app } from "../lib/firebase"; // Ensure this path is correct for your Firebase config

// --- Type Guard for Firebase Errors ---
// This helps us safely check the 'code' property of Firebase errors.
interface CustomFirebaseError extends Error {
  code?: string; // Firebase errors often include a 'code' string (e.g., "auth/weak-password")
}

function isCustomFirebaseError(error: unknown): error is CustomFirebaseError {
  return (
    error instanceof Error &&
    typeof (error as CustomFirebaseError).code === 'string'
  );
}
// --- End Type Guard ---

export default function ResetPasswordPage() { // Changed to default export for app router pages
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize Next.js router for navigation

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null); // Use null for no message
  const [email, setEmail] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const auth = getAuth(app);
  const oobCode = searchParams?.get("oobCode") ?? null; // Safely handle possible null value

  // Effect to verify the password reset code from the URL
  useEffect(() => {
    if (!oobCode) {
      setMessage("No password reset code found. Please check your link.");
      setIsLoading(false); // Stop loading if code is missing
      return;
    }

    // Verify the code with Firebase
    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail); // Set the email from the verification
        setIsCodeValid(true);
        setMessage(null); // Clear any initial messages on success
      })
      .catch((error) => {
        console.error("Error verifying password reset code:", error);
        if (isCustomFirebaseError(error)) {
          // Specific Firebase error messages
          if (error.code === 'auth/invalid-action-code') {
            setMessage("The reset link is invalid or has expired. Please request a new password reset.");
          } else {
            setMessage(`Failed to verify link: ${error.message}`);
          }
        } else {
          setMessage("An unexpected error occurred while verifying the reset link.");
        }
        setIsCodeValid(false); // Mark code as invalid
      })
      .finally(() => {
        setIsLoading(false); // Always stop loading after verification attempt
      });
  }, [auth, oobCode]); // Dependencies for useEffect

  // Function to handle password reset submission
  const handleReset = async () => {
    setMessage(null); // Clear previous messages on new attempt

    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) { // Firebase default min password length is 6 characters
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!oobCode) { // Should ideally be handled by useEffect, but a final check
      setMessage("Missing reset code. Cannot proceed with password reset.");
      return;
    }

    try {
      // Confirm the password reset with Firebase
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password reset successfully! Redirecting to login...");
      
      // Redirect to login page after a short delay
      setTimeout(() => router.push("/investor"), 2000);

    } catch (error) {
      console.error("Error resetting password:", error);
      if (isCustomFirebaseError(error)) {
        // Specific Firebase error handling
        switch (error.code) {
          case 'auth/weak-password':
            setMessage("Error: The new password is too weak. Please choose a stronger one.");
            break;
          case 'auth/user-disabled':
            setMessage("Error: This account has been disabled.");
            break;
          case 'auth/user-not-found':
            setMessage("Error: User not found.");
            break;
          case 'auth/expired-action-code':
            setMessage("Error: The reset link has expired. Please request a new one.");
            break;
          case 'auth/invalid-action-code':
            setMessage("Error: The reset link is invalid. Please check the URL or request a new one.");
            break;
          default:
            setMessage(`Error: ${error.message || "An unknown Firebase error occurred."}`);
            break;
        }
      } else if (error instanceof Error) {
        // General JavaScript error
        setMessage(`An unexpected error occurred: ${error.message}`);
      } else {
        // Fallback for non-Error thrown values
        setMessage("An unknown error occurred during password reset.");
      }
    }
  };

  // --- Render Logic Based on States ---
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow-lg text-center">
        <p className="text-gray-600">Verifying reset link...</p>
      </div>
    );
  }

  if (!isCodeValid) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow-lg text-center">
        <p className="text-red-600 font-semibold">{message || "Invalid or expired reset link."}</p>
        <p className="mt-4 text-gray-700">Please make sure you're using the complete link from your email, or request a new password reset if the link has expired.</p>
      </div>
    );
  }

  // If code is valid, show the password reset form
  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password for <span className="text-blue-600">{email}</span></h2>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          placeholder="••••••••"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
          autoComplete="new-password" // Helps browsers suggest strong passwords
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
          autoComplete="new-password" // Helps browsers suggest strong passwords
          required
        />
      </div>

      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
      >
        Reset Password
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm ${
          message.includes("success") ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}