import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import app from "../lib/firebase";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) return;

    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setIsCodeValid(true);
      })
      .catch(() => setMessage("Invalid or expired reset link."));
  }, [auth, oobCode]);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode as string, newPassword);
      setMessage("Password reset successfully.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
  };

  if (!isCodeValid) return <p className="text-red-600 mt-12">{message}</p>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">Reset Password for {email}</h2>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleReset}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Reset Password
      </button>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};

export default ResetPassword;
