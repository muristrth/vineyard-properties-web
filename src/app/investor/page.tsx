"use client";

import { useRouter } from "next/navigation";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animation variants for fade-in effect
const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
import {
    DollarSign, Home, TrendingUp, MapPin, Eye, Heart, FileText, CreditCard, Wallet, Navigation, CheckCircle, XCircle, Download, Calendar, AlertCircle, PiggyBank, Shield, Users, Bell, Settings, BarChart3, PieChart, LineChart, Lock, LogOut, User, Edit, Plus, Minus, Calculator, Target, Award, Zap, TrendingDown, Globe, Map, MessageCircle, Phone, Mail, Upload, RefreshCw, ExternalLink,
    Building,
    LandPlot,
    Banknote, // Added for payment icon
    Receipt, // Added for View Transactions icon
} from 'lucide-react';

import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc, addDoc } from 'firebase/firestore';

// --- UI Components ---
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
    type = 'text', placeholder, value, onChange, required = false, className = '', id
}: {
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
}) => (
    <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);

const Textarea = ({
    placeholder, value, onChange, required = false, className = '', id
}: {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    className?: string;
    id?: string;
}) => (
    <textarea
        id={id}
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


const Badge = ({
    children, variant = 'default', className = ''
}: {
    children: React.ReactNode;
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'secondary';
    className?: string;
}) => {
    const variants = {
        default: 'bg-red-100 text-red-800',
        destructive: 'bg-red-100 text-red-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        secondary: 'bg-gray-100 text-gray-800'
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
const Tabs = ({
    value, onValueChange, children, className = ''
}: {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={className}>{children}</div>
);
const TabsList = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>{children}</div>
);
// Revised TabsTrigger definition
const TabsTrigger = ({ children, value, onClick, activeTab }: { children: React.ReactNode; value: string; onClick: () => void; activeTab: string }) => (
    <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-50 dark:data-[state=active]:text-gray-900
                   sm:px-3 sm:py-1.5 sm:text-sm" // Apply larger padding and font size for small screens and up
        data-state={activeTab === value ? 'active' : 'inactive'}
        onClick={onClick}
    >
        {children}
    </button>
);
const TabsContent = ({
    value, children, activeValue
}: {
    value: string;
    children: React.ReactNode;
    activeValue: string;
}) => (
    <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${value === activeValue ? 'block' : 'hidden'}`}>
        {children}
    </div>
);
const Dialog = ({
    open, onOpenChange, children
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto">
            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full m-4" onClick={e => e.stopPropagation()}>
                {children}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <XCircle className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

const DialogContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

const DialogHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`text-center sm:text-left ${className}`}>{children}</div>
);

const DialogTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const DialogDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const DialogFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0 ${className}`}>{children}</div>
);

const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className="w-full overflow-auto">
        <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
    </div>
);

const TableHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>
);

const TableBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>
);

const TableRow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tr className={`border-b transition-colors hover:bg-gray-100 data-[state=selected]:bg-gray-100 ${className}`}>{children}</tr>
);

const TableHead = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>
);

const TableCell = ({ children, className = '', colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) => (
    <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} colSpan={colSpan}>{children}</td>
);

const TableCaption = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <caption className={`mt-4 text-sm text-gray-500 ${className}`}>{children}</caption>
);


// --- Types ---
interface User {
    id: string;
    email: string;
    name: string;
    role: 'investor' | 'admin';
    twoFactorEnabled: boolean;
    lastLogin: string;
    profileImage?: string;
    phone?: string;
    address?: string;
    investorLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    kycStatus: 'pending' | 'approved' | 'rejected';
}
interface Property {
    id: string;
    ownerId: string;
    name: string;
    location: [number, number];
    purchasePrice: number;
    currentValue: number;
    sellRequest?: boolean;
    image?: string;
    address?: string;
}
interface Portfolio {
    totalValue: number;
    totalProperties: number;
    yearlyAppreciation: number;
    totalRent?: number;
    totalROI?: number;
}
interface Transaction {
    id: string;
    investorId: string;
    description: string;
    date: string; // ISO string format
    type: 'credit' | 'debit' | 'dividend' | 'rent' | 'expense' | 'appreciation';
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    category: string;
    propertyId?: string;
}
interface Document {
    id: string;
    investorId: string;
    name: string;
    type: 'contract' | 'financial_report' | 'tax_document' | 'insurance' | 'legal' | 'maintenance';
    date: string; // ISO string format
    url: string;
    category?: string;
    property?: string;
    size?: string;
    digitallySigned?: boolean;
    confidentialityLevel?: string;
}
interface Loan {
    id: string;
    investorId: string;
    type: 'property_loan' | 'bridge_loan' | 'line_of_credit';
    outstandingBalance: number;
    nextPaymentDate: string; // ISO string format
    status: 'active' | 'completed' | 'overdue';
    monthlyPayment?: number;
    interestRate?: number;
    creditLimit: number; // Added creditLimit here for accurate representation
}
interface LoanTransaction { // New type for loan-specific transactions
    id: string;
    loanId: string;
    investorId: string;
    type: 'Disbursement' | 'Repayment' | 'Interest Charge';
    amount: number;
    date: string; // ISO string format
    status: 'Completed' | 'Pending' | 'Failed';
}

interface Balances {
    availableBalance: number;
    expectedDividends: number;
    pendingBalance?: number;
    loanBalance: number; // Represents the total outstanding loan balance
    creditLimit: number; // Represents the overall credit limit available
}
interface Notification {
    id: string;
    recipientId: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    date: string; // ISO string format
    read: boolean;
    actionRequired: boolean;
}

// --- Main Component ---
export default function InvestorPortal() {
    const router = useRouter();
    // --- State ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [twoFactorRequired, setTwoFactorRequired] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]); // Array of Loan objects
    const [loanTransactions, setLoanTransactions] = useState<LoanTransaction[]>([]); // Separate for loan transactions
    const [balances, setBalances] = useState<Balances | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [showPropertyModal, setShowPropertyModal] = useState(false);

    // Loan specific modals and state
    const [showLoanRequestModal, setShowLoanRequestModal] = useState(false); // Renamed for clarity
    const [showBankDetailsModal, setShowBankDetailsModal] = useState(false); // New modal for bank details
    const [loanRequestAmount, setLoanRequestAmount] = useState<number | string>(0);
    const [loanRequestPurpose, setLoanRequestPurpose] = useState('');
    const [loanRequestTerm, setLoanRequestTerm] = useState<number | string>(12); // Added term
    const [loanRequestCollateral, setLoanRequestCollateral] = useState(''); // Added collateral


    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState({
        subject: '',
        content: '',
        priority: 'normal'
    });
    const [filters, setFilters] = useState({
        transactionType: 'all',
        dateRange: '30days',
        documentType: 'all'
    });

    // --- Utility Functions ---
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
    const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`; // Adjusted to display actual percentage

    // --- Data Fetching ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, 'investors', currentUser.uid);
                try {
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data() as User;
                        setUser(userData);
                        setIsLoggedIn(true);
                        fetchInvestorData(currentUser.uid);
                    } else {
                        await signOut(auth);
                        alert('User profile data missing. Please register or contact support.');
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    await signOut(auth);
                    alert("Failed to load user profile. Please try again.");
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setPortfolio(null);
                setProperties([]);
                setTransactions([]);
                setDocuments([]);
                setLoans([]);
                setLoanTransactions([]);
                setBalances(null);
                setNotifications([]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchInvestorData = async (userId: string) => {
        setLoading(true);
        try {
            // Portfolio
            const portfolioDocRef = doc(db, 'portfolios', userId);
            const portfolioDocSnap = await getDoc(portfolioDocRef);
            if (portfolioDocSnap.exists()) {
                setPortfolio(portfolioDocSnap.data() as Portfolio);
            } else {
                setPortfolio(null);
            }

            // Properties
            const propertiesColRef = collection(db, 'properties');
            const propertiesQuery = query(propertiesColRef, where('ownerId', '==', userId));
            const propertiesSnapshot = await getDocs(propertiesQuery);
            setProperties(propertiesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Property[]);

            // Transactions
            const transactionsColRef = collection(db, 'transactions');
            const transactionsQuery = query(transactionsColRef, where('investorId', '==', userId));
            const transactionsSnapshot = await getDocs(transactionsQuery);
            setTransactions(transactionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Transaction[]);

            // Documents
            const documentsColRef = collection(db, 'documents');
            const documentsQuery = query(documentsColRef, where('investorId', '==', userId));
            const documentsSnapshot = await getDocs(documentsQuery);
            setDocuments(documentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Document[]);

            // Loans
            const loansColRef = collection(db, 'loans');
            const loansQuery = query(loansColRef, where('investorId', '==', userId));
            const loansSnapshot = await getDocs(loansQuery);
            const fetchedLoans = loansSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Loan[];
            setLoans(fetchedLoans);

            // Calculate aggregated loanBalance and creditLimit from fetched loans
            const totalOutstandingLoanBalance = fetchedLoans.reduce((sum, loan) => sum + loan.outstandingBalance, 0);
            const totalCreditLimit = fetchedLoans.reduce((sum, loan) => sum + (loan.creditLimit || 0), 0); // Summing up credit limits from all loans, adjust if only one main credit line
            
            // Balances
            const balancesDocRef = doc(db, 'balances', userId);
            const balancesDocSnap = await getDoc(balancesDocRef);
            if (balancesDocSnap.exists()) {
                setBalances({
                    ...balancesDocSnap.data() as Balances,
                    loanBalance: totalOutstandingLoanBalance, // Override or add loanBalance
                    creditLimit: totalCreditLimit // Override or add creditLimit
                });
            } else {
                setBalances({
                    availableBalance: 0,
                    expectedDividends: 0,
                    loanBalance: totalOutstandingLoanBalance,
                    creditLimit: totalCreditLimit
                });
            }

            // Loan Transactions (fetch related to investor's loans)
            const loanTransactionsColRef = collection(db, 'loanTransactions');
            const loanTransactionQuery = query(loanTransactionsColRef, where('investorId', '==', userId));
            const loanTransactionsSnapshot = await getDocs(loanTransactionQuery);
            setLoanTransactions(loanTransactionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as LoanTransaction[]);

            // Notifications
            const notificationsColRef = collection(db, 'notifications');
            const notificationsQuery = query(notificationsColRef, where('recipientId', '==', userId));
            const notificationsSnapshot = await getDocs(notificationsQuery);
            setNotifications(notificationsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Notification[]);

        } catch (error) {
            console.error("Error fetching investor data:", error);
            alert("Failed to load investor data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // --- Auth Functions ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const firebaseUser = userCredential.user;
            const userDocRef = doc(db, 'investors', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setUser(userDocSnap.data() as User);
                setIsLoggedIn(true);
                setTwoFactorRequired(false); // Assume no 2FA initially or handle specific 2FA logic here
            } else {
                await signOut(auth);
                alert('User profile data missing. Please register or contact support.');
            }
        } catch (error) {
            alert(`Login failed: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleTwoFactorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // This is a placeholder. Real 2FA would involve sending the code to a backend
        // for verification against a generated token (e.g., TOTP).
        try {
            if (twoFactorCode === '123456') { // Dummy code
                setIsLoggedIn(true);
                setTwoFactorRequired(false);
                // After successful 2FA, fetch user data
                if (auth.currentUser) {
                    fetchInvestorData(auth.currentUser.uid);
                }
            } else {
                alert('Invalid 2FA code. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const newUser = userCredential.user;
            const newUserDoc: User = {
                id: newUser.uid,
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                role: 'investor',
                twoFactorEnabled: false,
                lastLogin: new Date().toISOString(),
                investorLevel: 'Bronze',
                kycStatus: 'pending',
            };
            await setDoc(doc(db, 'investors', newUser.uid), newUserDoc);

            // Initialize default portfolio/balance/loan structure for new user if needed
            await setDoc(doc(db, 'portfolios', newUser.uid), { totalValue: 0, totalProperties: 0, yearlyAppreciation: 0 });
            await setDoc(doc(db, 'balances', newUser.uid), { availableBalance: 0, expectedDividends: 0, loanBalance: 0, creditLimit: 0 });


            alert('Account created successfully! Please login.');
            setIsRegistering(false);
            setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
        } catch (error) {
            alert(`Registration failed: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setUser(null);
            setTwoFactorRequired(false);
            setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
            setActiveTab('dashboard');
        } catch (error) {
            alert(`Logout failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    // --- Business Logic ---
    const requestNewLoan = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        if (!user) {
            alert('Please log in to request a loan.');
            return;
        }
        if (typeof loanRequestAmount !== 'number' || loanRequestAmount <= 0) {
            alert('Please enter a valid positive loan amount.');
            return;
        }
        if (loanRequestPurpose.trim() === '' || typeof loanRequestTerm !== 'number' || loanRequestTerm <= 0 || loanRequestCollateral.trim() === '') {
            alert('Please fill in all loan details (purpose, term, and collateral).');
            return;
        }

        setLoading(true);
        try {
            const newLoanRequestDoc = {
                investorId: user.id,
                senderEmail: user.email,
                amount: loanRequestAmount,
                purpose: loanRequestPurpose,
                term: loanRequestTerm,
                collateral: loanRequestCollateral,
                status: 'pending', // Initial status for a new request
                requestDate: new Date().toISOString(),
                // Add more fields as needed, e.g., creditScore, propertyValue, etc.
            };
            await addDoc(collection(db, 'loanRequests'), newLoanRequestDoc); // Use 'loanRequests' collection for requests

            alert(`Loan request for ${formatCurrency(loanRequestAmount)} submitted successfully! We will review your application.`);
            setShowLoanRequestModal(false);
            setLoanRequestAmount(0);
            setLoanRequestPurpose('');
            setLoanRequestTerm(12);
            setLoanRequestCollateral('');
        } catch (error) {
            console.error("Error submitting loan request:", error);
            alert(`Failed to submit loan request: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };


    const handlePayLoan = () => {
        // This function will simply show the bank details modal.
        // Actual payment confirmation would typically involve an admin marking it as paid
        // after verifying the bank transfer, or integrating with a payment gateway.
        setShowBankDetailsModal(true);
    };


    const togglePropertySellRequest = async (propertyId: string) => {
        if (!user) return;
        setLoading(true);
        try {
            const propertyRef = doc(db, 'properties', propertyId);
            const propertySnap = await getDoc(propertyRef);
            if (propertySnap.exists()) {
                const currentSellRequestStatus = propertySnap.data().sellRequest || false;
                await updateDoc(propertyRef, { sellRequest: !currentSellRequestStatus });
                setProperties(prev => prev.map(prop =>
                    prop.id === propertyId
                        ? { ...prop, sellRequest: !currentSellRequestStatus }
                        : prop
                ));
                alert('Sell request updated successfully!');
            } else {
                alert('Property not found.');
            }
        } catch (error) {
            alert(`Failed to update sell request: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!user) {
            alert('Please log in to send a message.');
            return;
        }
        if (message.subject.trim() === '' || message.content.trim() === '') {
            alert('Subject and content cannot be empty.');
            return;
        }
        setLoading(true);
        try {
            const newMessage = {
                senderId: user.id,
                senderEmail: user.email,
                subject: message.subject,
                content: message.content,
                priority: message.priority,
                timestamp: new Date().toISOString(),
                readByAdmin: false,
                status: 'sent'
            };
            await addDoc(collection(db, 'messages'), newMessage);
            alert('Message sent successfully!');
            setShowMessageModal(false);
            setMessage({ subject: '', content: '', priority: 'normal' });
        } catch (error) {
            alert(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const markNotificationAsRead = async (notificationId: string) => {
        setLoading(true);
        try {
            const notificationRef = doc(db, 'notifications', notificationId);
            await updateDoc(notificationRef, { read: true });
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId
                        ? { ...notif, read: true }
                        : notif
                )
            );
        } catch (error) {
            alert(`Failed to update notification status: ${(error instanceof Error ? error.message : String(error))}`);
        } finally {
            setLoading(false);
        }
    };

    const openDirections = (location: [number, number]) => {
        const [lat, lng] = location;
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(mapsUrl, '_blank');
    };

    const downloadDocument = (document: Document) => {
        window.open(document.url, '_blank');
    };

    const getFilteredTransactions = () => {
        return transactions.filter(transaction => {
            if (filters.transactionType !== 'all' && transaction.type !== filters.transactionType) return false;
            const transactionDate = new Date(transaction.date);
            const now = new Date();
            switch (filters.dateRange) {
                case '7days': return transactionDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                case '30days': return transactionDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                case '90days': return transactionDate >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                case '1year': return transactionDate >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                case 'all': return true;
                default: return true;
            }
        });
    };

    const getFilteredDocuments = () => {
        return documents.filter(document => {
            if (filters.documentType !== 'all' && document.type !== filters.documentType) return false;
            return true;
        });
    };


    const unreadNotifications = notifications.filter(notif => !notif.read).length;

    // --- Main Render ---
    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <RefreshCw className="h-10 w-10 text-red-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

// --- Auth UI ---
    if (!isLoggedIn) {
        if (twoFactorRequired) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Two-Factor Authentication</CardTitle>
                            <p className="text-gray-600 text-center">Enter the 6-digit code from your authenticator app</p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
                                <Input
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    value={twoFactorCode}
                                    onChange={(e) => setTwoFactorCode(e.target.value)}
                                    className="text-center text-2xl tracking-widest"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading || twoFactorCode.length !== 6}
                                >
                                    {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
                                    Verify
                                </Button>
                            </form>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setTwoFactorRequired(false)}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    Back to login
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }
        return (
            <div className="min-h-screen bg-black text-black">
                <Header />
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"></div>
                    <div className="relative container mx-auto px-4 py-20">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Secure Investor Portal
                                </Badge>
                                <h1 className="text-white text-5xl lg:text-7xl font-bold mb-6">
                                    Your Real Estate
                                    <span className="block text-red-500">Investment Hub</span>
                                </h1>
                                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Access your portfolio, track performance, manage documents, and stay connected with your investment journey.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center text-gray-900">
                                    {isRegistering ? 'Create Account' : 'Welcome Back'}
                                </CardTitle>
                                <p className="text-gray-600 text-center">
                                    {isRegistering
                                        ? 'Join our exclusive investor community'
                                        : 'Sign in to access your investor dashboard'
                                    }
                                </p>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                                    {isRegistering && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Full Name
                                                </label>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Phone Number
                                                </label>
                                                <Input
                                                    type="tel"
                                                    placeholder="Enter your phone number"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    {isRegistering && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm Password
                                            </label>
                                            <Input
                                                type="password"
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    )}
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? (
                                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                                        ) : isRegistering ? (
                                            <User className="h-4 w-4 mr-2" />
                                        ) : (
                                            <Lock className="h-4 w-4 mr-2" />
                                        )}
                                        {isRegistering ? 'Create Account' : 'Sign In'}
                                    </Button>
                                </form>
                                <div className="mt-6 text-center">
                                    <button onClick={() => setIsRegistering(!isRegistering)} className="text-red-600 hover:text-red-700 font-medium" >
                                        {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register" }
                                    </button>
                                </div>
                                {!isRegistering && (
                                    <div className="mt-4 text-center">
                                        <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => router.push("/forgot-password")} >
                                            Forgot your password?
                                        </button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

  function setShowLoanModal(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-black border-b border-gray-800 sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Building className="h-8 w-8 text-red-500" />
                                <h1 className="text-xl font-bold text-white">VPL InvestorHub</h1>
                            </div>
                            <Badge variant="success" className="hidden sm:block">
                                {user?.investorLevel} Member
                            </Badge>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button className="p-2 text-gray-300 hover:text-white relative" onClick={() => setActiveTab('notifications')}>
                                    <Bell className="h-5 w-5" />
                                    {notifications.filter(n => !n.read).length > 0 && (
                                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                            {notifications.filter(n => !n.read).length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* User Menu */}
                            <div className="flex items-center space-x-3">
                                {user?.profileImage && (
                                    <img
                                        src={user.profileImage}
                                        alt={user?.name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                )}
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-400">{user?.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-300 hover:text-white"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-600">
                            Here's an overview of your real estate investment portfolio.
                        </p>
                    </motion.div>
                </div>

                <main className="flex-1"> {/* Removed p-4 md:p-6 here as outer container now handles padding */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        {/* Adjusted TabsList for better responsiveness */}
                        <TabsList className="grid w-full overflow-x-auto grid-cols-2 gap-y-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
                        <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')} activeTab={''}>
                            <Home className="h-4 w-4 mr-2" /> Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="properties" onClick={() => setActiveTab('properties')} activeTab={''}>
                            <Home className="h-4 w-4 mr-2" /> Properties
                        </TabsTrigger>
                        <TabsTrigger value="portfolio" onClick={() => setActiveTab('portfolio')} activeTab={''}>
                            <PieChart className="h-4 w-4 mr-2" /> Portfolio
                        </TabsTrigger>
                        <TabsTrigger value="transactions" onClick={() => setActiveTab('transactions')} activeTab={''}>
                            <Receipt className="h-4 w-4 mr-2" /> Transactions
                        </TabsTrigger>
                        <TabsTrigger value="loans" onClick={() => setActiveTab('loans')} activeTab={''}>
                            <Banknote className="h-4 w-4 mr-2" /> Loans
                        </TabsTrigger>
                        <TabsTrigger value="documents" onClick={() => setActiveTab('documents')} activeTab={''}>
                            <FileText className="h-4 w-4 mr-2" /> Documents
                        </TabsTrigger>
                        <TabsTrigger value="messages" onClick={() => setShowMessageModal(true)} activeTab={''}>
                            <MessageCircle className="h-4 w-4 mr-2" /> Message Admin
                        </TabsTrigger>
                        <TabsTrigger value="settings" onClick={() => setShowProfileModal(true)} activeTab={''}>
                            <User className="h-4 w-4 mr-2" /> Profile
                        </TabsTrigger>
                    </TabsList>

                        {/* Dashboard Tab */}
                        <TabsContent value="dashboard" activeValue={activeTab}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Total Portfolio Value</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-red-600">
                                            {portfolio ? formatCurrency(portfolio.totalValue) : formatCurrency(0)}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Yearly Appreciation:{' '}
                                            <Badge variant={portfolio && portfolio.yearlyAppreciation > 0 ? 'success' : 'destructive'}>
                                                {portfolio ? formatPercentage(portfolio.yearlyAppreciation) : formatPercentage(0)}
                                            </Badge>
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
                                    <Wallet className="h-4 w-4 text-gray-600" />
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {formatCurrency(balances?.availableBalance || 0)}
                                    </div>
                                    <p className="text-xs text-gray-600">
                                      Pending: {formatCurrency(balances?.pendingBalance || 0)}
                                    </p>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
                                  <DollarSign className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-green-600">
                                    {formatCurrency(portfolio?.totalRent || 0)}
                                  </div>
                                  <p className="text-xs text-gray-600">
                                    From {portfolio?.totalProperties || 0} properties
                                  </p>
                                </CardContent>
                              </Card>
                                <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">Total ROI</CardTitle>
                                  <Target className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-green-600">
                                    {formatPercentage(portfolio?.totalROI || 0)}
                                  </div>
                                  <p className="text-xs text-gray-600">Average across portfolio</p>
                                </CardContent>
                              </Card>
                                

                                <Card className="lg:col-span-3">
                                    <CardHeader>
                                        <CardTitle>Recent Transactions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {transactions.length > 0 ? (
                                                    transactions.slice(0, 5).map(transaction => (
                                                        <TableRow key={transaction.id}>
                                                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                                            <TableCell>{transaction.description}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={transaction.type === 'credit' || transaction.type === 'dividend' ? 'success' : 'destructive'}>
                                                                    {transaction.type}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'destructive'}>
                                                                    {transaction.status}
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center text-gray-500">
                                                            No recent transactions.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                        <Button variant="outline" onClick={() => setActiveTab('transactions')} className="mt-4 w-full">
                                            View All Transactions
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            {/* Quick Actions (UNCHANGED) */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <Button
                                        variant="outline"
                                        className="h-auto py-4 flex flex-col items-center space-y-2"
                                        onClick={() => setActiveTab('properties')}
                                      >
                                        <Home className="h-6 w-6" />
                                        <span>View Properties</span>
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="h-auto py-4 flex flex-col items-center space-y-2"
                                        onClick={() => setShowLoanRequestModal(true)}
                                      >
                                        <PiggyBank className="h-6 w-6" />
                                        <span>Request Loan</span>
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="h-auto py-4 flex flex-col items-center space-y-2"
                                        onClick={() => setActiveTab('documents')}
                                      >
                                        <FileText className="h-6 w-6" />
                                        <span>Documents</span>
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="h-auto py-4 flex flex-col items-center space-y-2"
                                        onClick={() => setShowMessageModal(true)}
                                      >
                                        <MessageCircle className="h-6 w-6" />
                                        <span>Contact Support</span>
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                        </TabsContent>

                        {/* Portfolio Tab (UNCHANGED) */}
                    <TabsContent value="portfolio" activeValue={activeTab}>
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Portfolio Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Total Portfolio Value</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {formatCurrency(portfolio?.totalValue || 0)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Total Properties</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {portfolio?.totalProperties || 0}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Yearly Appreciation</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {formatPercentage(portfolio?.yearlyAppreciation || 0)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Total Monthly Rent</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {formatCurrency(portfolio?.totalRent || 0)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Overall ROI</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {formatPercentage(portfolio?.totalROI || 0)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h4 className="text-lg font-semibold mb-4">Investment Breakdown</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {properties.map(property => (
                                                <Card key={property.id} className="p-4">
                                                    <h5 className="font-semibold text-gray-900">{property.name}</h5>
                                                    <p className="text-sm text-gray-600">Value: {formatCurrency(property.currentValue)}</p>
                                                    <p className="text-sm text-gray-600">ROI: {formatPercentage((property.currentValue - property.purchasePrice) / property.purchasePrice * 100)}</p>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                        {/* Properties Tab */}
                        <TabsContent value="properties" activeValue={activeTab}>
                          <div className="space-y-6">
                            {/* Properties Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {properties.length > 0 ? (
                                properties.map((property) => (
                                  <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                      <div className="relative">
                                        <img
                                          src={property.image}
                                          alt={property.name}
                                          className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 right-4">
                                          <Badge variant={property.sellRequest ? 'destructive' : 'secondary'}>
                                            {property.sellRequest ? 'Sell Pending' : 'Active'}
                                          </Badge>
                                        </div>
                                      </div>

                                      <CardHeader>
                                        <div className="flex items-start justify-between">
                                          <div>
                                            <CardTitle className="text-lg">{property.name}</CardTitle>
                                            <p className="text-sm text-gray-600 flex items-center mt-1">
                                              <MapPin className="h-4 w-4 mr-1" />
                                              {property.address}
                                            </p>
                                          </div>
                                          <button
                                            onClick={() => {
                                              setSelectedProperty(property);
                                              setShowPropertyModal(true);
                                            }}
                                          >
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                          </button>
                                        </div>
                                      </CardHeader>

                                      <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                          <div>
                                            <p className="text-gray-600">Purchase Price</p>
                                            <p className="font-semibold">{formatCurrency(property.purchasePrice)}</p>
                                          </div>
                                          <div>
                                            <p className="text-gray-600">Current Value</p>
                                            <p className="font-semibold text-green-600">{formatCurrency(property.currentValue)}</p>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openDirections(property.location)}
                                          >
                                            <Navigation className="h-4 w-4 mr-1" />
                                            Directions
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => alert(`Showing land map for ${property.name}`)}
                                          >
                                            <LandPlot className="h-4 w-4 mr-1" />
                                            Land Map
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant={property.sellRequest ? 'destructive' : 'outline'}
                                            onClick={() => togglePropertySellRequest(property.id)}
                                          >
                                            {property.sellRequest ? (
                                              <>
                                                <XCircle className="h-4 w-4 mr-1" />
                                                Cancel Sell
                                              </>
                                            ) : (
                                              <>
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                Sell Request
                                              </>
                                            )}
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="col-span-full text-center text-gray-500">No properties found.</p>
                              )}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Transactions Tab */}
                        <TabsContent value="transactions" activeValue={activeTab}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900">All Transactions</h2>
                                <Card>
                                    <CardHeader className="flex flex-row justify-between items-center">
                                        <CardTitle>Transaction Filters</CardTitle>
                                        <Button onClick={() => fetchInvestorData(user!.id)} variant="outline" size="sm">
                                            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="transactionType">Type</Label>
                                                <select
                                                    id="transactionType"
                                                    value={filters.transactionType}
                                                    onChange={(e) => setFilters({ ...filters, transactionType: e.target.value })}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-10"
                                                >
                                                    <option value="all">All</option>
                                                    <option value="credit">Credit</option>
                                                    <option value="debit">Debit</option>
                                                    <option value="dividend">Dividend</option>
                                                    <option value="rent">Rent</option>
                                                    <option value="expense">Expense</option>
                                                    <option value="appreciation">Appreciation</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="dateRange">Date Range</Label>
                                                <select
                                                    id="dateRange"
                                                    value={filters.dateRange}
                                                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-10"
                                                >
                                                    <option value="30days">Last 30 Days</option>
                                                    <option value="7days">Last 7 Days</option>
                                                    <option value="90days">Last 90 Days</option>
                                                    <option value="1year">Last 1 Year</option>
                                                    <option value="all">All Time</option>
                                                </select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Category</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {getFilteredTransactions().length > 0 ? (
                                                    getFilteredTransactions().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(transaction => (
                                                        <TableRow key={transaction.id}>
                                                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                                            <TableCell>{transaction.description}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={transaction.type === 'credit' || transaction.type === 'dividend' || transaction.type === 'rent' || transaction.type === 'appreciation' ? 'success' : 'destructive'}>
                                                                    {transaction.type}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'destructive'}>
                                                                    {transaction.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>{transaction.category}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center text-gray-500">
                                                            No transactions found for the selected filters.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        {/* NEW LOANS TAB CONTENT */}
                        <TabsContent value="loans" activeValue={activeTab}>
                            <div className="space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <CreditCard className="h-5 w-5 mr-2" /> Loan Overview
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="border p-4 rounded-lg flex flex-col items-center justify-center bg-blue-50">
                                                <h3 className="font-semibold text-gray-700">Current Loan Balance</h3>
                                                <p className="text-4xl font-bold text-red-600 mt-2">
                                                    {formatCurrency(balances?.loanBalance || 0)}
                                                </p>
                                            </div>
                                            <div className="border p-4 rounded-lg flex flex-col items-center justify-center bg-green-50">
                                                <h3 className="font-semibold text-gray-700">Available Credit Limit</h3>
                                                <p className="text-4xl font-bold text-green-600 mt-2">
                                                    {formatCurrency(balances?.creditLimit || 0)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-center space-x-4">
                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => setShowLoanRequestModal(true)}
                                            >
                                                <PiggyBank className="h-5 w-5 mr-2" /> Request New Loan
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border-green-600 text-green-600 hover:bg-green-50"
                                                onClick={handlePayLoan}
                                            >
                                                <Banknote className="h-5 w-5 mr-2" /> Pay Loan
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Receipt className="h-5 w-5 mr-2" /> Loan Transactions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {loanTransactions && loanTransactions.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <Table>
                                                    <TableCaption>A list of your recent loan transactions.</TableCaption>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Date</TableHead>
                                                            <TableHead>Type</TableHead>
                                                            <TableHead>Amount</TableHead>
                                                            <TableHead>Status</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {loanTransactions.map((transaction) => (
                                                            <TableRow key={transaction.id}>
                                                                <TableCell className="font-medium">
                                                                    {new Date(transaction.date).toLocaleDateString()}
                                                                </TableCell>
                                                                <TableCell>{transaction.type}</TableCell>
                                                                <TableCell className={transaction.type === 'Repayment' ? 'text-red-600' : 'text-green-600'}>
                                                                    {formatCurrency(transaction.amount)}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge variant={
                                                                        transaction.status === 'Completed' ? 'success' :
                                                                        transaction.status === 'Pending' ? 'warning' : 'destructive'
                                                                    }>
                                                                        {transaction.status}
                                                                    </Badge>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-500">No loan transactions found.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Documents Tab */}
                        <TabsContent value="documents" activeValue={activeTab}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900">Your Documents</h2>
                                <Card>
                                    <CardHeader className="flex flex-row justify-between items-center">
                                        <CardTitle>Document Filters</CardTitle>
                                        <Button onClick={() => fetchInvestorData(user!.id)} variant="outline" size="sm">
                                            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <Label htmlFor="documentType">Type</Label>
                                            <select
                                                id="documentType"
                                                value={filters.documentType}
                                                onChange={(e) => setFilters({ ...filters, documentType: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-10"
                                            >
                                                <option value="all">All</option>
                                                <option value="contract">Contract</option>
                                                <option value="financial_report">Financial Report</option>
                                                <option value="tax_document">Tax Document</option>
                                                <option value="insurance">Insurance</option>
                                                <option value="legal">Legal</option>
                                                <option value="maintenance">Maintenance</option>
                                            </select>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {getFilteredDocuments().length > 0 ? (
                                                    getFilteredDocuments().map(document => (
                                                        <TableRow key={document.id}>
                                                            <TableCell className="font-medium">{document.name}</TableCell>
                                                            <TableCell>{document.type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</TableCell>
                                                            <TableCell>{new Date(document.date).toLocaleDateString()}</TableCell>
                                                            <TableCell>{document.category || 'N/A'}</TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => downloadDocument(document)}
                                                                >
                                                                    <Download className="h-4 w-4 mr-1" /> Download
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center text-gray-500">
                                                            No documents found for the selected filters.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                    </Tabs>
                </main>
            </div> {/* Closing tag for container mx-auto px-4 py-8 that wraps main content */}
            <Footer />

                    {/* Property Details Modal (from previous code) */}
              <Dialog open={showPropertyModal} onOpenChange={setShowPropertyModal}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{selectedProperty?.name}</DialogTitle>
                    <DialogDescription>{selectedProperty?.address}</DialogDescription>
                  </DialogHeader>
                  {selectedProperty && (
                    <div className="grid gap-4 py-4">
                      <img src={selectedProperty.image} alt={selectedProperty.name} className="w-full h-60 object-cover rounded-md" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Purchase Price</p>
                          <p className="font-bold">{formatCurrency(selectedProperty.purchasePrice)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Value</p>
                          <p className="font-bold text-green-600">{formatCurrency(selectedProperty.currentValue)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Sell Request Status</p>
                          <p className="font-bold">
                            <Badge variant={selectedProperty.sellRequest ? 'destructive' : 'default'}>
                              {selectedProperty.sellRequest ? 'Pending Sale' : 'No Sell Request'}
                            </Badge>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={() => openDirections(selectedProperty.location)}>
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button
                          variant={selectedProperty.sellRequest ? 'destructive' : 'secondary'}
                          onClick={() => {
                            togglePropertySellRequest(selectedProperty.id);
                            setShowPropertyModal(false); // Close modal after action
                          }}
                        >
                          {selectedProperty.sellRequest ? 'Cancel Sell Request' : 'Initiate Sell Request'}
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

                        {/* Loan Request Modal (UNCHANGED) */}
                        <Dialog open={showLoanRequestModal} onOpenChange={setShowLoanRequestModal}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Request a Loan</DialogTitle>
                              <DialogDescription>Fill in the details below to request a new loan.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={requestNewLoan} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Loan Amount
                                </label>
                                <Input
                                  type="number"
                                  placeholder="Enter amount"
                                  value={loanRequestAmount}
                                  onChange={(e) => setLoanRequestAmount(Number(e.target.value))}
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Purpose
                                </label>
                                <select
                                  value={loanRequestPurpose}
                                  onChange={(e) => setLoanRequestPurpose(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                  required
                                >
                                  <option value="">Select purpose</option>
                                  <option value="property_purchase">Property Purchase</option>
                                  <option value="renovation">Renovation</option>
                                  <option value="bridge_financing">Bridge Financing</option>
                                  <option value="working_capital">Working Capital</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Term (months)
                                </label>
                                <Input
                                  type="number"
                                  placeholder="Enter term in months"
                                  value={loanRequestTerm}
                                  onChange={(e) => setLoanRequestTerm(Number(e.target.value))}
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Collateral
                                </label>
                                <select
                                  value={loanRequestCollateral}
                                  onChange={(e) => setLoanRequestCollateral(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                  required
                                >
                                  <option value="">Select collateral property</option>
                                  {properties.map((property) => (
                                    <option key={property.id} value={property.id}>
                                      {property.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  disabled={
                                    loading ||
                                    !loanRequestAmount ||
                                    !loanRequestPurpose ||
                                    !loanRequestCollateral
                                  }
                                >
                                  {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <PiggyBank className="h-4 w-4 mr-2" />}
                                  Submit Request
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setShowLoanRequestModal(false)}
                                >
                                  Cancel
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

            {/* Bank Details Modal */}
            <Dialog open={showBankDetailsModal} onOpenChange={setShowBankDetailsModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bank Details for Loan Repayment</DialogTitle>
                        <DialogDescription>Please make your loan payment to the following bank account:</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3">
                        <p><strong>Bank Name:</strong> Example Bank PLC</p>
                        <p><strong>Account Name:</strong> Real Estate Investment Co. Ltd</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>SWIFT/BIC Code:</strong> EXAMPLBANK</p>
                        <p className="text-sm text-gray-600 italic">
                            Kindly include your Investor ID (e.g., {user?.id.substring(0, 8)}...) as the reference for your payment.
                            Your payment will be verified by our finance team within 1-2 business days.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowBankDetailsModal(false)}>Got It</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Profile/Settings Modal */}
            <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Your Profile & Settings</DialogTitle>
                        <DialogDescription>Manage your personal information and account settings.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
                        <p><strong>Investor Level:</strong> <Badge>{user?.investorLevel}</Badge></p>
                        <p><strong>KYC Status:</strong> <Badge variant={user?.kycStatus === 'approved' ? 'success' : user?.kycStatus === 'pending' ? 'warning' : 'destructive'}>{user?.kycStatus}</Badge></p>
                        <p><strong>Last Login:</strong> {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</p>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="twoFactorEnabled"
                                checked={user?.twoFactorEnabled || false}
                                onChange={() => alert('2FA setting change is not implemented in this demo.')}
                                className="form-checkbox h-5 w-5 text-red-600 rounded"
                                disabled
                            />
                            <label htmlFor="twoFactorEnabled" className="text-sm font-medium text-gray-700">Two-Factor Authentication (Coming Soon)</label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowProfileModal(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Message Admin Modal */}
            <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Message Administrator</DialogTitle>
                        <DialogDescription>Send a message to the portal administrators.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4"> {/* Replaced CardContent with div for structural correctness */}
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}> {/* Added onSubmit to form */}
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Subject of your message"
                                    value={message.subject}
                                    onChange={(e) => setMessage(prev => ({ ...prev, subject: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="priority">Priority</Label>
                                <div className="relative">
                                    <select
                                        id="priority"
                                        value={message.priority}
                                        onChange={(e) => setMessage(prev => ({ ...prev, priority: e.target.value }))}
                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="low">Low</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Enter your message"
                                    value={message.content}
                                    onChange={(e) => setMessage(prev => ({ ...prev, content: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <DialogFooter> {/* Buttons inside DialogFooter */}
                                <Button type="button" variant="outline" onClick={() => setShowMessageModal(false)} disabled={loading}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit" // Changed to submit
                                    disabled={loading || !message.subject || !message.content}
                                >
                                    {loading ? (
                                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                        <Mail className="h-4 w-4 mr-2" />
                                    )}
                                    Send Message
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}