'use client'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign, Home, TrendingUp, MapPin, Eye, Heart, FileText, CreditCard, Wallet, Navigation, CheckCircle, XCircle, Download, Calendar, AlertCircle, PiggyBank, Shield, Users, Bell, Settings, BarChart3, PieChart, LineChart, Lock, LogOut, User, Edit, Plus, Minus, Calculator, Target, Award, Zap, TrendingDown, Globe, Map, MessageCircle, Phone, Mail, Upload, RefreshCw, ExternalLink,
    Building,
    LandPlot
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
const TabsTrigger = ({
    value, children, onClick
}: {
    value: string;
    children: React.ReactNode;
    onClick?: () => void;
}) => (
    <button
        onClick={onClick}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm hover:bg-white/50"
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
const Modal = ({
    isOpen, onClose, children, title
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XCircle className="h-6 w-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

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
    date: string;
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
    date: string;
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
    nextPaymentDate: string;
    status: 'active' | 'completed' | 'overdue';
    monthlyPayment?: number;
    interestRate?: number;
    creditLimit?: number;
}
interface Balances {
    availableBalance: number;
    expectedDividends: number;
    pendingBalance?: number;
}
interface Notification {
    id: string;
    recipientId: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    date: string;
    read: boolean;
    actionRequired: boolean;
}

// --- Main Component ---
export default function InvestorPortal() {
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
    const [loans, setLoans] = useState<Loan[]>([]);
    const [balances, setBalances] = useState<Balances | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showLoanModal, setShowLoanModal] = useState(false);
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
    const [loanRequest, setLoanRequest] = useState({
        amount: 0,
        purpose: '',
        term: 12,
        collateral: ''
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
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES' }).format(amount);
    const formatPercentage = (value: number) => `${value?.toFixed(2) ?? '0.00'}%`;

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
                    }
                } catch {
                    await signOut(auth);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setPortfolio(null);
                setProperties([]);
                setTransactions([]);
                setDocuments([]);
                setLoans([]);
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
            setLoans(loansSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Loan[]);
            // Balances
            const balancesDocRef = doc(db, 'balances', userId);
            const balancesDocSnap = await getDoc(balancesDocRef);
            if (balancesDocSnap.exists()) {
                setBalances(balancesDocSnap.data() as Balances);
            } else {
                setBalances(null);
            }
            // Notifications
            const notificationsColRef = collection(db, 'notifications');
            const notificationsQuery = query(notificationsColRef, where('recipientId', '==', userId));
            const notificationsSnapshot = await getDocs(notificationsQuery);
            setNotifications(notificationsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Notification[]);
        } catch (error) {
            alert("Failed to load investor data.");
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
                setTwoFactorRequired(false);
            } else {
                await signOut(auth);
                alert('User profile data missing. Please register or contact support.');
            }
        } catch (error: any) {
            alert(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    const handleTwoFactorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (twoFactorCode === '123456') {
                setIsLoggedIn(true);
                setTwoFactorRequired(false);
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
            alert('Account created successfully! Please login.');
            setIsRegistering(false);
            setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
        } catch (error: any) {
            alert(`Registration failed: ${error.message}`);
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
        } catch (error: any) {
            alert(`Logout failed: ${error.message}`);
        }
    };

    // --- Business Logic ---
    const requestLoan = async () => {
        if (!user) {
            alert('Please log in to request a loan.');
            return;
        }
        if (loanRequest.amount <= 0 || loanRequest.purpose.trim() === '' || !loanRequest.term || !loanRequest.collateral) {
            alert('Please enter all loan details.');
            return;
        }
        setLoading(true);
        try {
            const newLoanRequest = {
                investorId: user.id,
                amount: loanRequest.amount,
                purpose: loanRequest.purpose,
                term: loanRequest.term,
                collateral: loanRequest.collateral,
                status: 'pending',
                requestDate: new Date().toISOString()
            };
            await addDoc(collection(db, 'loanRequests'), newLoanRequest);
            alert(`Loan request for ${formatCurrency(loanRequest.amount)} submitted successfully!`);
            setShowLoanModal(false);
            setLoanRequest({ amount: 0, purpose: '', term: 12, collateral: '' });
        } catch {
            alert('Failed to submit loan request.');
        } finally {
            setLoading(false);
        }
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
        } catch {
            alert('Failed to update sell request.');
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
        } catch {
            alert('Failed to send message.');
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
        } catch {
            alert('Failed to update notification status.');
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
                default: return true;
            }
        });
    };
    const getFilteredDocuments = () => {
        return documents.filter(doc => {
            if (filters.documentType !== 'all' && doc.type !== filters.documentType) return false;
            return true;
        });
    };

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
                                    <button
                                        onClick={() => setIsRegistering(!isRegistering)}
                                        className="text-red-600 hover:text-red-700 font-medium"
                                    >
                                        {isRegistering
                                            ? 'Already have an account? Sign in'
                                            : "Don't have an account? Register"
                                        }
                                    </button>
                                </div>
                                {!isRegistering && (
                                    <div className="mt-4 text-center">
                                        <button className="text-sm text-gray-600 hover:text-gray-800">
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

// Main Dashboard
return (
<div className="min-h-screen bg-gray-50">
  {/* Header (Minimal change to reflect potential data simplification) */}
  <header className="bg-black border-b border-gray-800 sticky top-0 z-40">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-red-500" />
            <h1 className="text-xl font-bold text-white">VPL InvestorHub</h1>
          </div>
          {/* investorLevel can remain if it's a core user attribute */}
          <Badge variant="success" className="hidden sm:block">
            {user?.investorLevel} Member
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-300 hover:text-white relative">
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
    {/* Welcome Section (UNCHANGED) */}
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

    {/* Navigation Tabs (UNCHANGED) */}
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
        <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="portfolio" onClick={() => setActiveTab('portfolio')}>
          <PieChart className="h-4 w-4 mr-2" />
          Portfolio
        </TabsTrigger>
        <TabsTrigger value="properties" onClick={() => setActiveTab('properties')}>
          <Home className="h-4 w-4 mr-2" />
          Properties
        </TabsTrigger>
        <TabsTrigger value="financials" onClick={() => setActiveTab('financials')}>
          <DollarSign className="h-4 w-4 mr-2" />
          Financials
        </TabsTrigger>
        <TabsTrigger value="documents" onClick={() => setActiveTab('documents')}>
          <FileText className="h-4 w-4 mr-2" />
          Documents
        </TabsTrigger>
        <TabsTrigger value="support" onClick={() => setActiveTab('support')}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Support
        </TabsTrigger>
      </TabsList>

      {/* Dashboard Tab (Keeping your existing dashboard metrics, as you only specified portfolio changes) */}
      <TabsContent value="dashboard" activeValue={activeTab}>
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(portfolio?.totalValue || 0)}
                  </div>
                  <p className="text-xs text-green-600">
                    +{formatPercentage(portfolio?.yearlyAppreciation || 0)} this year
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
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
            </motion.div>
          </div>

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
                  onClick={() => setShowLoanModal(true)}
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

          {/* Notifications (UNCHANGED) */}
          {notifications.filter(n => !n.read).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Important Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.filter(n => !n.read).slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className={`p-1 rounded-full ${
                        notification.type === 'success' ? 'bg-green-100' :
                        notification.type === 'warning' ? 'bg-yellow-100' :
                        notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        <AlertCircle className={`h-4 w-4 ${
                          notification.type === 'success' ? 'text-green-600' :
                          notification.type === 'warning' ? 'text-yellow-600' :
                          notification.type === 'error' ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      {/* Portfolio Tab (REVISED) */}
      <TabsContent value="portfolio" activeValue={activeTab}>
        <div className="space-y-8">
          {/* Simplified Portfolio Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-700">Total Portfolio Value</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(portfolio?.totalValue || 0)}
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-700">Yearly Appreciation</h3>
                  <p className="text-3xl font-bold text-green-600">
                    +{formatPercentage(portfolio?.yearlyAppreciation || 0)}
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-700">Total Properties</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {portfolio?.totalProperties || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Properties Tab (REVISED) */}
      <TabsContent value="properties" activeValue={activeTab}>
        <div className="space-y-6">
          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
                          {property.address} {/* Assuming 'address' serves as 'location' */}
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
                        // This assumes a 'LandPlot' or similar icon is available, adjust if not
                        onClick={() => alert(`Showing land map for ${property.name}`)}
                      >
                        <LandPlot className="h-4 w-4 mr-1" /> {/* Placeholder for land map icon */}
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
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Financials Tab (UNCHANGED, as you only specified removing loan info if loans.length > 0) */}
      <TabsContent value="financials" activeValue={activeTab}>
        <div className="space-y-8">
          {/* Account Balances */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(balances?.availableBalance || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(balances?.pendingBalance || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expected Dividends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(balances?.expectedDividends || 0)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Loan Information (UNCHANGED, since you said "if loans.length > 0", it's already conditional) */}
          {loans.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Loan Information</CardTitle>
              </CardHeader>
              <CardContent>
                {loans.map((loan) => (
                  <div key={loan.id} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Outstanding Balance</p>
                        <p className="text-xl font-bold text-red-600">
                          {formatCurrency(loan.outstandingBalance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Payment</p>
                        <p className="text-xl font-bold">{formatCurrency(loan.monthlyPayment)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Interest Rate</p>
                        <p className="text-xl font-bold">{formatPercentage(loan.interestRate)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Credit Limit</p>
                        <p className="font-semibold">{formatCurrency(loan.creditLimit)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        </TabsContent>



      {/* Loan Request Modal */}
      <Modal
        isOpen={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        title="Request a Loan"
      >
        <form onSubmit={(e) => { e.preventDefault(); requestLoan(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={loanRequest.amount}
              onChange={(e) => setLoanRequest(prev => ({ ...prev, amount: Number(e.target.value) }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <select
              value={loanRequest.purpose}
              onChange={(e) => setLoanRequest(prev => ({ ...prev, purpose: e.target.value }))}
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
              value={loanRequest.term}
              onChange={(e) => setLoanRequest(prev => ({ ...prev, term: Number(e.target.value) }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collateral
            </label>
            <select
              value={loanRequest.collateral}
              onChange={(e) => setLoanRequest(prev => ({ ...prev, collateral: e.target.value }))}
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
          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={loading || !loanRequest.amount || !loanRequest.purpose || !loanRequest.collateral}
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <PiggyBank className="h-4 w-4 mr-2" />}
              Submit Request
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLoanModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Contact Support"
      >
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <Input
              type="text"
              placeholder="Enter subject"
              value={message.subject}
              onChange={(e) => setMessage(prev => ({ ...prev, subject: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={message.priority}
              onChange={(e) => setMessage(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
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
              required
            />
          </div>
          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={loading || !message.subject || !message.content}
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
              Send Message
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMessageModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Documents Tab */}
          <TabsContent value="documents" activeValue={activeTab}>
            <div className="space-y-6">
              {/* Document Filters */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Document Library</CardTitle>
                    <div className="flex items-center space-x-2">
                      <select
                        value={filters.documentType}
                        onChange={(e) => setFilters(prev => ({ ...prev, documentType: e.target.value }))}
                        className="px-3 py-1 border rounded-md text-sm"
                      >
                        <option value="all">All Documents</option>
                        <option value="contract">Contracts</option>
                        <option value="financial_report">Financial Reports</option>
                        <option value="tax_document">Tax Documents</option>
                        <option value="insurance">Insurance</option>
                        <option value="legal">Legal</option>
                      </select>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getFilteredDocuments().map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{document.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Badge variant="secondary">{document.type.replace('_', ' ')}</Badge>
                              <span>{document.category}</span>
                              {document.property && <span>• {document.property}</span>}
                              <span>• {document.size}</span>
                              <span>• {document.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {document.digitallySigned && (
                                <Badge variant="success" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Digitally Signed
                                </Badge>
                              )}
                              <Badge
                                variant={
                                  document.confidentialityLevel === 'confidential' ? 'destructive' :
                                  document.confidentialityLevel === 'private' ? 'warning' : 'secondary'
                                }
                                className="text-xs"
                              >
                                {document.confidentialityLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadDocument(document)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" activeValue={activeTab}>
            <div className="space-y-6">
              {/* Support Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Live Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Get instant help from our support team.</p>
                    <Button
                      className="w-full"
                      onClick={() => setShowMessageModal(true)}
                    >
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">Call us directly for urgent matters.</p>
                    <p className="font-semibold mb-4">+1 (800) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM EST</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">Send us detailed questions via email.</p>
                    <p className="font-semibold mb-4">sales@vineyardproperties.co.ke</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        question: "How do I request a loan against my property?",
                        answer: "You can request a loan by clicking the 'Request Loan' button on your dashboard or navigating to the Financials tab. Fill out the loan application form with the required details."
                      },
                      {
                        question: "How are property values updated?",
                        answer: "Property values are updated quarterly based on market assessments, comparable sales, and professional appraisals. You'll receive notifications when values are updated."
                      },
                      {
                        question: "When are dividend payments made?",
                        answer: "Dividend payments are typically made quarterly, usually within the first week of each quarter. You'll receive notifications before each payment."
                      },
                      {
                        question: "How can I sell my property investment?",
                        answer: "You can submit a sell request through the Properties tab. Our team will review your request and provide market analysis and selling options."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-b pb-4">
                        <h3 className="font-medium mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter subject"
                          value={message.subject}
                          onChange={(e) => setMessage(prev => ({ ...prev, subject: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <select
                          value={message.priority}
                          onChange={(e) => setMessage(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
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
                    <Button
                      type="button"
                      onClick={sendMessage}
                      disabled={loading || !message.subject || !message.content}
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Mail className="h-4 w-4 mr-2" />
                      )}
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>

  );
}
