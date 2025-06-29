'use client'; // This directive makes the component a Client Component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct hook for Next.js App Router params
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'; // Added onSnapshot
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { db } from '@/lib/firebase'; // Adjust this path if your firebase.ts is elsewhere
import { RefreshCw, CheckCircle, XCircle, Upload, Download } from 'lucide-react'; // Added Download icon
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Re-using UI Components from your existing page.tsx for consistency ---
// These should ideally be in a shared components folder, but for this example,
// I'm including them here for completeness if you don't have them globally accessible.
// If you have them in a shared location, you can import them instead.

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 pb-0 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Button = ({
    children, onClick, variant = 'primary', size = 'md', disabled = false, className = '', type = 'button', href, target
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'success';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    href?: string; // Added for download link
    target?: string; // Added for download link
}) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50';
    const variants = {
        primary: 'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-600 text-white hover:bg-green-700'
    };
    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-lg'
    };

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};
const Input = ({
    type = 'text', placeholder, value, onChange, required = false, className = '', id, name, accept // Added accept prop for file input
}: {
    type?: string;
    placeholder?: string;
    value?: string | number; // Made optional for file input
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
    name?: string; // Added name prop for consistent handling
    accept?: string; // Added accept prop for file input
}) => (
    <input
        id={id}
        name={name} // Pass name prop
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        accept={accept} // Pass accept prop
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);

const Textarea = ({
    placeholder, value, onChange, required = false, className = '', id, name
}: {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
    name?: string; // Added name prop for consistent handling
}) => (
    <textarea
        id={id}
        name={name} // Pass name prop
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);

const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
        {children}
    </label>
);

// --- Type Definitions for Firestore Data ---
type PropertyData = {
    name: string;
    beacon: string;
    price: string; // Storing as string to handle "1,500,000" format, convert to number for calculations
    viewedDate: string;
    salesperson: string;
};

type ClientInfo = {
    name1: string;
    name2: string;
    tel: string;
    kraPin: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
    nextOfKin: string;
    idNumber: string;
    signed: boolean; // Indicates if the form has been digitally signed
    passportPhotoUrl?: string; // Field for passport photo URL
    pdfDownloadUrl?: string; // NEW: Field for PDF download URL
};

type FormDataDoc = {
    formId: string;
    property: PropertyData;
    client: ClientInfo;
    status: 'pending' | 'submitted' | 'completed'; // Added 'completed' for potential future states
};

// --- ClientForm Component ---
const ClientForm: React.FC = () => {
    const params = useParams();
    const formId = params?.formId as string | undefined; // Get formId from URL params safely

    const [formData, setFormData] = useState<FormDataDoc | null>(null);
    const [clientInfo, setClientInfo] = useState<ClientInfo>({
        name1: '',
        name2: '',
        tel: '',
        kraPin: '',
        email: '',
        currentAddress: '',
        permanentAddress: '',
        nextOfKin: '',
        idNumber: '',
        signed: false, // Default to false
        passportPhotoUrl: undefined,
        pdfDownloadUrl: undefined, // Initialize new field
    });
    const [passportPhotoFile, setPassportPhotoFile] = useState<File | null>(null);
    const [passportPhotoPreviewUrl, setPassportPhotoPreviewUrl] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // To show success message after submission
    const [isPdfGenerating, setIsPdfGenerating] = useState(false); // New state for PDF generation status

    // Fetch form data from Firestore on mount and listen for updates
    useEffect(() => {
        if (!formId) {
            setError('Form ID is missing from the URL.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // Use onSnapshot to listen for real-time updates to the document
        const formRef = doc(db, 'forms', formId);
        const unsubscribe = onSnapshot(formRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as FormDataDoc;
                setFormData(data);
                setClientInfo(data.client || clientInfo); // Update clientInfo from fetched data

                // If form was already submitted or is now submitted
                if (data.status === 'submitted' || data.status === 'completed') {
                    setIsSubmitted(true);
                    // If PDF URL is available, set PDF generating to false
                    if (data.client?.pdfDownloadUrl) {
                        setIsPdfGenerating(false);
                    } else {
                        // If submitted but no PDF URL, assume PDF is still generating
                        setIsPdfGenerating(true);
                    }
                } else {
                    setIsSubmitted(false);
                    setIsPdfGenerating(false);
                }

                // Set passport photo preview if URL exists
                if (data.client?.passportPhotoUrl && !passportPhotoFile) {
                    setPassportPhotoPreviewUrl(data.client.passportPhotoUrl);
                }

            } else {
                setError('Form not found or invalid ID.');
                setIsSubmitted(false);
                setIsPdfGenerating(false);
            }
            setLoading(false);
        }, (err) => {
            console.error('Error listening to form data:', err);
            setError(`Failed to load form: ${err.message}`);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [formId]); // Only re-run if formId changes

    // Handle form input changes for text/textarea fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClientInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle file input change for passport photo
    const handlePassportPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Validate file type (optional but recommended)
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file (e.g., JPEG, PNG).');
                setPassportPhotoFile(null);
                setPassportPhotoPreviewUrl(null);
                return;
            }
            setPassportPhotoFile(file);
            setPassportPhotoPreviewUrl(URL.createObjectURL(file));
            setError(null); // Clear previous errors
        } else {
            setPassportPhotoFile(null);
            setPassportPhotoPreviewUrl(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formId || !formData) {
            setError('Form data is not loaded or ID is missing.');
            return;
        }

        // Check if a new file is selected OR if an existing photo URL is present
        if (!passportPhotoFile && !clientInfo.passportPhotoUrl) {
            setError('Passport photo is required.');
            return;
        }

        setLoading(true);
        setError(null);
        let uploadedPhotoUrl = clientInfo.passportPhotoUrl; // Start with existing URL if any

        try {
            // If a new passport photo file is selected, upload it
            if (passportPhotoFile) {
                const storage = getStorage();
                const photoRef = ref(storage, `forms/${formId}/passport_photo.jpg`); // Standardize filename
                await uploadBytes(photoRef, passportPhotoFile);
                uploadedPhotoUrl = await getDownloadURL(photoRef);
            }

            const formRef = doc(db, 'forms', formId);

            // Update the document in Firestore
            await updateDoc(formRef, {
                client: {
                    ...clientInfo,
                    signed: true, // Mark as signed upon submission
                    passportPhotoUrl: uploadedPhotoUrl, // Save the uploaded photo URL
                },
                status: 'submitted', // Update status to submitted
            });

            // Set state to indicate submission and PDF generation in progress
            setIsSubmitted(true);
            setIsPdfGenerating(true); // Assume PDF generation starts on backend

        } catch (err) {
            console.error('Error submitting form:', err);
            if (err instanceof Error) {
                setError(`Failed to submit form: ${err.message}`);
            } else {
                setError('Failed to submit form: An unknown error occurred.');
            }
            setIsSubmitted(false); // Revert submission state on error
            setIsPdfGenerating(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-black flex flex-col">
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <RefreshCw className="h-10 w-10 text-red-600 animate-spin mx-auto" />
                        <p className="mt-4 text-gray-700">Loading form...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="text-red-600 flex items-center justify-center">
                            <XCircle className="h-6 w-6 mr-2" /> Error
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">{error}</p>
                        <p className="mt-4 text-gray-500">Please check the link or contact support.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-black text-black flex flex-col">
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
                    <Card className="w-full max-w-md text-center">
                        <CardHeader>
                            <CardTitle className="text-green-600 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 mr-2" /> Form Submitted Successfully!
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">Thank you for providing your details. Your form has been received.</p>
                            {isPdfGenerating ? (
                                <div className="mt-6 flex flex-col items-center">
                                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                                    <p className="mt-2 text-blue-700">Generating your PDF form...</p>
                                    <p className="text-sm text-gray-500">This may take a moment.</p>
                                </div>
                            ) : formData?.client?.pdfDownloadUrl ? (
                                <div className="mt-6">
                                    <p className="text-gray-700 mb-4">Your personalized sales form is ready!</p>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        href={formData.client.pdfDownloadUrl}
                                        target="_blank"
                                        className="w-full"
                                    >
                                        <Download className="h-5 w-5 mr-2" /> Download Your Sales Form PDF
                                    </Button>
                                    <p className="mt-4 text-gray-500 text-sm">A copy has also been sent to your email.</p>
                                </div>
                            ) : (
                                <p className="mt-4 text-gray-500">We are processing your request. Please check your email for the PDF shortly.</p>
                            )}
                            <p className="mt-4 text-gray-500 text-sm">Register as an investor in our Investor Portal to view your assets in one place.</p>
                        </CardContent>
                    </Card>
                </div>
                
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-black flex flex-col">
            <Header />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-center">VPL Sales Form</CardTitle>
                        <p className="text-center text-gray-600">Please fill in your personal information.</p>
                    </CardHeader>
                    <CardContent>
                        {/* Property Information - Prefilled */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Property Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                                <div>
                                    <strong className="block text-sm">Property Name:</strong>
                                    <p className="font-medium">{formData?.property.name}</p>
                                </div>
                                <div>
                                    <strong className="block text-sm">Beacon No.:</strong>
                                    <p className="font-medium">{formData?.property.beacon}</p>
                                </div>
                                <div>
                                    <strong className="block text-sm">Price:</strong>
                                    <p className="font-medium">Ksh {formData?.property.price}</p>
                                </div>
                                <div>
                                    <strong className="block text-sm">Salesperson:</strong>
                                    <p className="font-medium">{formData?.property.salesperson}</p>
                                </div>
                                <div>
                                    <strong className="block text-sm">Date Viewed:</strong>
                                    <p className="font-medium">{formData?.property.viewedDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Client Information Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name1">First Name</Label>
                                    <Input
                                        id="name1"
                                        type="text"
                                        name="name1"
                                        value={clientInfo.name1}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="name2">Last Name</Label>
                                    <Input
                                        id="name2"
                                        type="text"
                                        name="name2"
                                        value={clientInfo.name2}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="tel">Telephone</Label>
                                    <Input
                                        id="tel"
                                        type="tel"
                                        name="tel"
                                        value={clientInfo.tel}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., +2547XXXXXXXX"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={clientInfo.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="kraPin">KRA PIN</Label>
                                <Input
                                    id="kraPin"
                                    type="text"
                                    name="kraPin"
                                    value={clientInfo.kraPin}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your KRA PIN"
                                />
                            </div>

                            <div>
                                <Label htmlFor="idNumber">ID Number</Label>
                                <Input
                                    id="idNumber"
                                    type="text"
                                    name="idNumber"
                                    value={clientInfo.idNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your ID number"
                                />
                            </div>

                            <div>
                                <Label htmlFor="currentAddress">Current Address</Label>
                                <Textarea
                                    id="currentAddress"
                                    name="currentAddress"
                                    value={clientInfo.currentAddress}
                                    onChange={handleChange}
                                    placeholder="Your current residential address"
                                />
                            </div>

                            <div>
                                <Label htmlFor="permanentAddress">Permanent Address</Label>
                                <Textarea
                                    id="permanentAddress"
                                    name="permanentAddress"
                                    value={clientInfo.permanentAddress}
                                    onChange={handleChange}
                                    placeholder="Your permanent address"
                                />
                            </div>

                            <div>
                                <Label htmlFor="nextOfKin">Next of Kin (Full Name)</Label>
                                <Input
                                    id="nextOfKin"
                                    type="text"
                                    name="nextOfKin"
                                    value={clientInfo.nextOfKin}
                                    onChange={handleChange}
                                    placeholder="Full name of your next of kin"
                                />
                            </div>

                            {/* Passport Photo Upload Section */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                    <Upload className="h-5 w-5 mr-2 text-red-600" />
                                    Upload Passport Photo <span className="text-red-500 ml-1">*</span>
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Please upload a clear, recent passport-sized photo. This is a required field.
                                </p>
                                <div>
                                    <Label htmlFor="passportPhoto">Choose File</Label>
                                    <Input
                                        type="file"
                                        id="passportPhoto"
                                        name="passportPhoto"
                                        accept="image/*" // Restrict to image files
                                        onChange={handlePassportPhotoChange}
                                        required={!clientInfo.passportPhotoUrl} // Required only if no existing photo
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-white hover:file:bg-red-600"
                                    />
                                    {(passportPhotoPreviewUrl || clientInfo.passportPhotoUrl) && (
                                        <div className="mt-4 p-2 border border-gray-200 rounded-md bg-white">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                            <img
                                                src={passportPhotoPreviewUrl || clientInfo.passportPhotoUrl || ''}
                                                alt="Passport Photo Preview"
                                                className="max-w-full h-auto rounded-md shadow-md border border-gray-200 object-contain"
                                                style={{ maxHeight: '200px' }} // Limit preview height
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                Submit Form
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
            <Footer />
        </div>
    );
};

export default ClientForm;
