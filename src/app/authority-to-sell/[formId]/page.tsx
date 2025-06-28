'use client'; // This directive makes the component a Client Component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct hook for Next.js App Router params
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust this path if your firebase.ts is elsewhere
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react'; // Assuming these icons are available
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
    children, onClick, variant = 'primary', size = 'md', disabled = false, className = '', type = 'button'
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'success';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit';
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
    type = 'text', placeholder, value, onChange, required = false, className = '', id, name, checked
}: {
    type?: string;
    placeholder?: string;
    value?: string | number; // Value can be optional for checkbox
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
    name?: string;
    checked?: boolean; // Added for checkbox
}) => (
    <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        checked={checked} // For checkbox
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${type === 'checkbox' ? 'h-4 w-4 text-red-600 rounded focus:ring-red-500' : ''} ${className}`}
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
    name?: string;
}) => (
    <textarea
        id={id}
        name={name}
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
type CompanyDetails = {
    name: string;
    address: string;
    tel1: string;
    tel2: string;
    email: string;
    website: string;
    tagline: string;
};

type PropertySaleDetails = {
    titleNo1: string;
    titleNo2: string;
    plotSize: string;
    price: string;
    location: string;
};

type SellerInfo = {
    name: string;
    idNo: string;
    signature: boolean; // Represents a digital acknowledgment/signature
    date: string; // Date of signing by this seller
};

type AuthorityToSellDoc = {
    formId: string;
    companyDetails: CompanyDetails;
    documentDate: string; // Date the document was created/issued
    sellerNames: string; // e.g., "ISAAC KIBURI MWIRIGI AND HANNAH WAITHIRA KIBURI"
    propertyDetails: PropertySaleDetails;
    terms: string[]; // Array of strings for the terms
    seller1: SellerInfo;
    seller2: SellerInfo;
    status: 'pending' | 'submitted';
};

// --- AuthorityToSellForm Component ---
const AuthorityToSellForm: React.FC = () => {
  const params = useParams();
  const formId = params?.formId as string;

  const [formData, setFormData] = useState<AuthorityToSellDoc | null>(null);
  const [seller1Info, setSeller1Info] = useState<SellerInfo>({
    name: '',
    idNo: '',
    signature: false,
    date: '',
  });
  const [seller2Info, setSeller2Info] = useState<SellerInfo>({
    name: '',
    idNo: '',
    signature: false,
    date: '',
  });
  const [agreedTerms, setAgreedTerms] = useState<boolean[]>([]); // New state for terms checkboxes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch form data from Firestore on mount
  useEffect(() => {
    const fetchFormData = async () => {
      if (!formId) {
        setError('Form ID is missing from the URL.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Path: /authorityToSellForms/{formId} (assuming top-level collection)
        const formRef = doc(db, 'authorityToSellForms', formId);
        const formSnap = await getDoc(formRef);

        if (formSnap.exists()) {
          const data = formSnap.data() as AuthorityToSellDoc;
          setFormData(data);
          // Initialize agreedTerms based on fetched terms
          setAgreedTerms(new Array((data.terms || []).length).fill(false));

          // Pre-fill seller info if it already exists
          if (data.seller1) {
            setSeller1Info(data.seller1);
          }
          if (data.seller2) {
            setSeller2Info(data.seller2);
          }
        } else {
          setError('Authority to Sell form not found or invalid ID.');
        }
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError(
          `Failed to load form: ${
            typeof err === 'object' && err !== null && 'message' in err
              ? (err as { message: string }).message
              : String(err)
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [formId]);

  // Handle input changes for seller 1
  const handleChangeSeller1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSeller1Info((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle input changes for seller 2
  const handleChangeSeller2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSeller2Info((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle changes for terms checkboxes
  const handleTermChange = (index: number, isChecked: boolean) => {
    setAgreedTerms((prev) => {
      const newAgreedTerms = [...prev];
      newAgreedTerms[index] = isChecked;
      return newAgreedTerms;
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formId || !formData) {
      setError('Form data is not loaded or ID is missing.');
      setLoading(false);
      return;
    }

    // Basic validation
    if (!seller1Info.name || !seller1Info.idNo || !seller2Info.name || !seller2Info.idNo) {
        alert('Please fill in all required fields for both sellers.');
        setLoading(false);
        return;
    }

    // Validate all terms are checked
    if (agreedTerms.length === 0 || !agreedTerms.every(term => term === true)) {
        alert('Please confirm that you agree to all the terms by checking each box.');
        setLoading(false);
        return;
    }

    // Validate signature checkboxes are checked
    if (!seller1Info.signature || !seller2Info.signature) {
        alert('Please check the signature acknowledgment for both sellers.');
        setLoading(false);
        return;
    }


    setLoading(true);
    setError(null);

    try {
        const formRef = doc(db, 'authorityToSellForms', formId);
        const now = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        await updateDoc(formRef, {
            seller1: {
                ...seller1Info,
                signature: true, // Ensure it's true on submission
                date: now, // Set signing date to today
            },
            seller2: {
                ...seller2Info,
                signature: true, // Ensure it's true on submission
                date: now, // Set signing date to today
            },
            status: 'submitted', // Update overall form status
        });

        setIsSubmitted(true);
        setLoading(false);
    } catch (err) {
        console.error('Error submitting form:', err);
        setError(
          `Failed to submit form: ${
            typeof err === 'object' && err !== null && 'message' in err
              ? (err as { message: string }).message
              : String(err)
          }`
        );
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
          <p className="mt-4 text-gray-700">Loading Authority to Sell form...</p>
        </div>
      </div>
      <Footer/>
          </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-black text-black flex flex-col">
                        <Header />
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
      <Footer/>
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
            <p className="text-gray-700">Thank you for providing your authorization. Your form has been received.</p>
            <p className="mt-4 text-gray-500">You can close this page now.</p>
          </CardContent>
        </Card>
      </div>
      <Footer/>
          </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-black flex flex-col">
                        <Header />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-red-700">AUTHORITY TO SELL PROPERTY</CardTitle>
          <p className="text-center text-gray-600">Please review and provide your authorization.</p>
        </CardHeader>
        <CardContent>
          {/* Company Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm">
            <p className="font-bold text-lg text-red-800">{formData?.companyDetails.name}</p>
            <p>{formData?.companyDetails.address}</p>
            <p>Tel: {formData?.companyDetails.tel1} / {formData?.companyDetails.tel2} Email: {formData?.companyDetails.email}. Website: {formData?.companyDetails.website}</p>
            <p className="italic">{formData?.companyDetails.tagline}</p>
          </div>

          <p className="mb-4 text-right font-semibold">DATE: {formData?.documentDate}</p>

          <p className="mb-4">Dear Sir/Madam,</p>
          <p className="mb-4 font-bold">RE: AUTHORITY TO SELL PROPERTY ON BEHALF OF {formData?.sellerNames.toUpperCase()}</p>

          <p className="mb-4">
            We {formData?.sellerNames} do hereby authorize
            **{formData?.companyDetails.name}** Tel. No {formData?.companyDetails.tel1} 0R {formData?.companyDetails.tel2} P.O Box 1128 - 00200
            NAIROBI to sell my properties known as Title No: **{formData?.propertyDetails.titleNo1}**
            and **{formData?.propertyDetails.titleNo2}**
          </p>

          {/* Property Details */}
          <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">DETAILS OF PROPERTY:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <div>
                <strong className="block text-sm">Size of the plots:</strong>
                <p className="font-medium">{formData?.propertyDetails.plotSize}</p>
              </div>
              <div>
                <strong className="block text-sm">Price:</strong>
                <p className="font-medium">Kshs. {formData?.propertyDetails.price}</p>
              </div>
              <div className="md:col-span-2">
                <strong className="block text-sm">Physical location:</strong>
                <p className="font-medium">{formData?.propertyDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Terms Section - Now plain text, left-aligned */}
          <div> {/* Removed flex justify-end and width constraints from this div */}
            <p className="mb-4 text-left">I hereby undertake the following;</p>
            <ul className="list-decimal list-inside mb-6 space-y-2 text-left"> {/* Changed to list-decimal and text-left */}
              {(formData?.terms || []).map((term, index) => (
                <li key={index} className="text-gray-700"> {/* Simplified li structure */}
                  {term}
                </li>
              ))}
            </ul>
          </div>

          <p className="mb-6">We agree with the above Conditions.</p>

          {/* Seller Information Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller 1 */}
              <div className="p-4 border rounded-md bg-white shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Seller 1 Details</h4>
                <div>
                  <Label htmlFor="seller1Name">Name</Label>
                  <Input
                    id="seller1Name"
                    type="text"
                    name="name"
                    value={seller1Info.name}
                    onChange={handleChangeSeller1}
                    required
                    placeholder="Enter Seller 1's Name"
                  />
                </div>
                <div className="mt-3">
                  <Label htmlFor="seller1IdNo">ID NO</Label>
                  <Input
                    id="seller1IdNo"
                    type="text"
                    name="idNo"
                    value={seller1Info.idNo}
                    onChange={handleChangeSeller1}
                    required
                    placeholder="Enter Seller 1's ID Number"
                  />
                </div>
                <div className="mt-3 flex items-center">
                    <Input
                        type="checkbox"
                        id="seller1Signature"
                        name="signature"
                        checked={seller1Info.signature}
                        onChange={handleChangeSeller1}
                        className="mr-2"
                        required // Make signature required
                    />
                    <Label htmlFor="seller1Signature">Signature (Digital Acknowledgment)</Label>
                </div>
                <div className="mt-3">
                    <Label>Date Signed</Label>
                    <p className="font-semibold text-gray-700">{seller1Info.date || 'Pending'}</p>
                </div>
              </div>

              {/* Seller 2 */}
              <div className="p-4 border rounded-md bg-white shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Seller 2 Details</h4>
                <div>
                  <Label htmlFor="seller2Name">Name</Label>
                  <Input
                    id="seller2Name"
                    type="text"
                    name="name"
                    value={seller2Info.name}
                    onChange={handleChangeSeller2}
                    required
                    placeholder="Enter Seller 2's Name"
                  />
                </div>
                <div className="mt-3">
                  <Label htmlFor="seller2IdNo">ID NO</Label>
                  <Input
                    id="seller2IdNo"
                    type="text"
                    name="idNo"
                    value={seller2Info.idNo}
                    onChange={handleChangeSeller2}
                    required
                    placeholder="Enter Seller 2's ID Number"
                  />
                </div>
                <div className="mt-3 flex items-center">
                    <Input
                        type="checkbox"
                        id="seller2Signature"
                        name="signature"
                        checked={seller2Info.signature}
                        onChange={handleChangeSeller2}
                        className="mr-2"
                        required // Make signature required
                    />
                    <Label htmlFor="seller2Signature">Signature (Digital Acknowledgment)</Label>
                </div>
                <div className="mt-3">
                    <Label>Date Signed</Label>
                    <p className="font-semibold text-gray-700">{seller2Info.date || 'Pending'}</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Submit Authority to Sell
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    <Footer/>
          </div>
  );
};

export default AuthorityToSellForm;