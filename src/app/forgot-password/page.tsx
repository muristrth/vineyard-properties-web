// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { getAuth, sendPasswordResetEmail, AuthError } from "firebase/auth"; // Import AuthError
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase"; // Import 'app' from your firebase config

// Assume you have Header, Footer, Button, Input, Card components or use basic HTML
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Type Definitions for UI Components (can be shared or defined locally) ---
interface InputProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
}

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Added event type for onClick
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
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    // Message state now explicitly typed for UX/UI feedback
    const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); // Clear previous messages
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email, {
                url: "https://vineyardproperties.co.ke/reset-password", // Ensure this URL matches your Firebase Console
                handleCodeInApp: true,
            });
            setMessage({ type: 'success', text: 'If your email is registered, a password reset link has been sent to your inbox. Please check your spam folder as well.' });
            setEmail(''); // Clear email input on success
        } catch (error: unknown) {
            // Check if error is a Firebase AuthError by checking for 'code' property
            if (typeof error === 'object' && error !== null && 'code' in error) {
                let errorMessage = "An unexpected error occurred. Please try again.";
                switch ((error as { code: string }).code) {
                    case 'auth/user-not-found':
                        errorMessage = "No user found with that email address. Please check and try again.";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "The email address is not valid.";
                        break;
                    default:
                        errorMessage = `Error: ${typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : 'Unknown error'}`; // Fallback to generic Firebase error message
                }
                setMessage({ type: 'error', text: errorMessage });
            } else if (error instanceof Error) {
                setMessage({ type: 'error', text: `An unexpected error occurred: ${error.message}` });
            } else {
                setMessage({ type: 'error', text: 'An unknown error occurred during password reset.' });
            }
            console.error("Forgot password error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-black flex flex-col">
            <Header /> {/* Assuming Header is used here as well */}
            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold mb-2">Forgot Your Password?</CardTitle>
                        <p className="text-gray-600 text-sm">Enter your email address below and we'll send you a link to reset your password.</p>
                    </CardHeader>
                    <CardContent className="mt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                                    className="focus:border-red-500 focus:ring-red-500"
                                />
                            </div>
                            <Button type="submit" className="w-full text-lg py-2" disabled={loading}>
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </Button>
                        </form>

                        {message.text && (
                            <p className={`mt-6 text-center text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </p>
                        )}

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => router.push("/")}
                                className="text-sm text-red-600 hover:underline transition-colors duration-200"
                            >
                                Back to Login
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
}