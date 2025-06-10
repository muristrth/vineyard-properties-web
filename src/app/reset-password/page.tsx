// app/reset-password/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState, Suspense } from "react"; // Import Suspense
// AuthError is imported as a type, not used as a value directly in instanceof check
import { getAuth, verifyPasswordResetCode, confirmPasswordReset, AuthError } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { app } from "@/lib/firebase"; // Import 'app' from your firebase config

// --- Type Definitions for UI Components ---
interface InputProps {
    type?: string;
    placeholder?: string;
    value: string; // Value must be a string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
}

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Explicit type for onClick event
    type?: 'button' | 'submit';
    className?: string;
    disabled?: boolean;
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

// --- Placeholder UI components ---
// Replace with your actual components if they are globally available or imported
const Input = ({ type = 'text', placeholder, value, onChange, required = false, className = '', id = '' }: InputProps) => (
    <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    />
);

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }: ButtonProps) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

const Card = ({ children, className = '' }: CardProps) => (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
    <div className={`pb-0 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }: CardTitleProps) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = '' }: CardContentProps) => (
    <div className={`pt-0 ${className}`}>{children}</div>
);

// --- Type guard for Firebase errors ---
interface FirebaseErrorWithCodeAndMessage extends Error {
    code: string;
    message: string;
    name: string; // Typically "FirebaseError"
}

function isFirebaseErrorWithCodeAndMessage(error: unknown): error is FirebaseErrorWithCodeAndMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error && typeof (error as { code: unknown }).code === 'string' &&
        'message' in error && typeof (error as { message: unknown }).message === 'string' &&
        'name' in error && typeof (error as { name: unknown }).name === 'string' &&
        (error as { name: string }).name.startsWith('Firebase')
    );
}

// Separate component to handle the actual password reset logic and useSearchParams
// This allows wrapping it in Suspense easily in the main page component
function PasswordResetContent() {
    const searchParams = useSearchParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });
    const [email, setEmail] = useState("");
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const auth = getAuth(app);
    const oobCode = searchParams?.get("oobCode");

    useEffect(() => {
        if (!oobCode) {
            setMessage({ type: 'error', text: "Invalid or missing reset code. Please use the link from your email." });
            return;
        }

        verifyPasswordResetCode(auth, oobCode)
            .then((userEmail) => {
                setEmail(userEmail);
                setIsCodeValid(true);
                setMessage({ type: 'success', text: "Code verified. Please set your new password." });
            })
            .catch((error: unknown) => {
                if (isFirebaseErrorWithCodeAndMessage(error)) {
                    let errorMessage = "The reset link is invalid or has expired. Please request a new one.";
                    if (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code') {
                        errorMessage = "The reset link is invalid or has expired. Please request a new one.";
                    } else {
                        errorMessage = `Error: ${error.message}`;
                    }
                    setMessage({ type: 'error', text: errorMessage });
                } else if (error instanceof Error) {
                    setMessage({ type: 'error', text: `An unexpected error occurred: ${error.message}` });
                } else {
                    setMessage({ type: 'error', text: "An unknown error occurred while verifying the link." });
                }
                setIsCodeValid(false);
            });
    }, [auth, oobCode]);

    const handleReset = async () => {
        setMessage({ type: '', text: '' });
        setLoading(true);

        if (!newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: "Please fill in both new password fields." });
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "Passwords do not match. Please try again." });
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: "Password must be at least 6 characters long." });
            setLoading(false);
            return;
        }

        try {
            if (oobCode === null) {
                setMessage({ type: 'error', text: "Invalid reset operation: Missing code." });
                setLoading(false);
                return;
            }
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage({ type: 'success', text: "Password reset successful! Redirecting to login..." });
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => router.push("/"), 2000);
        } catch (error: unknown) {
            if (isFirebaseErrorWithCodeAndMessage(error)) {
                let errorMessage = "Failed to reset password. Please try again.";
                switch (error.code) {
                    case 'auth/weak-password':
                        errorMessage = "Password is too weak. Please choose a stronger password.";
                        break;
                    case 'auth/expired-action-code':
                        errorMessage = "The reset link has expired. Please request a new one.";
                        break;
                    case 'auth/invalid-action-code':
                        errorMessage = "The reset link is invalid. Please request a new one.";
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                }
                setMessage({ type: 'error', text: errorMessage });
            } else if (error instanceof Error) {
                setMessage({ type: 'error', text: `An unexpected error occurred: ${error.message}` });
            } else {
                setMessage({ type: 'error', text: "An unknown error occurred during password reset." });
            }
            console.error("Password reset error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!oobCode) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <p className="text-red-600 text-center text-lg">
                    {message.text || "No reset code found in the URL. Please use the complete link from your email."}
                </p>
                <Button onClick={() => router.push("/investor")} className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Go to Login
                </Button>
            </div>
        );
    }

    if (!isCodeValid) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <p className={`text-center text-lg ${message.type === 'error' ? 'text-red-600' : 'text-yellow-500'}`}>
                    {message.text || "Verifying reset link..."}
                </p>
                <Button onClick={() => router.push("/investor")} className="mt-6 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    Go to Login
                </Button>
            </div>
        );
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold mb-2">Reset Password</CardTitle>
                    <p className="text-gray-600 text-sm">Setting new password for: <span className="font-semibold text-gray-800">{email}</span></p>
                </CardHeader>
                <CardContent className="mt-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                                required
                                className="focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                required
                                className="focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                        <Button onClick={handleReset} className="w-full text-lg py-2 bg-green-600 hover:bg-green-700" disabled={loading}>
                            {loading ? 'Resetting Password...' : 'Reset Password'}
                        </Button>

                        {message.text && (
                            <p className={`mt-6 text-center text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-black text-black flex flex-col">
            <Header />
            {/* Wrap the component that uses useSearchParams with Suspense */}
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white text-lg">Loading password reset form...</div>}>
                <PasswordResetContent />
            </Suspense>
            <Footer />
        </div>
    );
}