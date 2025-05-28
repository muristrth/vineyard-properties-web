// src/app/investor/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  DollarSign,
  Home,
  TrendingUp,
  BarChart3, // Not used but imported
  MapPin,
  Eye,
  Heart,
  FileText,
  CreditCard,
  Wallet,
  Navigation,
  CheckCircle,
  XCircle,
  Download,
  Calendar,
  AlertCircle,
  PiggyBank,
} from 'lucide-react';

const auth = getAuth();

// --- Type Definitions ---

// Define a type for a geographical location [latitude, longitude]
type GeoPoint = [number, number];

// Interface for a single property
interface Property {
  id: string;
  name: string;
  location: GeoPoint; // Assuming location is [lat, lng]
  image: string;
  purchasePrice: number;
  currentValue: number;
  sellRequest?: boolean; // Optional property
}

// Interface for investor data
interface Investor {
  email: string;
  password?: string; // Should ideally not be stored or fetched client-side after initial auth
  name: string;
  portfolioValue: number;
  totalProperties: number;
  yearlyAppreciation: number;
  properties: Property[];
}

// Interface for a document
interface Document {
  id: string;
  name: string;
  type: string;
  property: string;
  date: string; // Or Date object if you parse it
  url: string; // Assuming documents have a download URL
}

// Interface for a transaction
interface Transaction {
  id: string;
  description: string;
  date: string; // Or Date object
  type: 'credit' | 'debit';
  amount: number;
  status: string;
}

// Interface for loan data
interface Loan {
  creditLimit: number;
  outstandingBalance: number;
  interestRate: number;
  transactions?: LoanTransaction[]; // Optional array of loan-specific transactions
}

// Interface for a loan transaction (if different from general transactions)
interface LoanTransaction {
  description: string;
  date: string;
  type: 'payment' | 'disbursement'; // Example types for loans
  amount: number;
  status: string;
}

// Interface for balance data
interface Balances {
  availableBalance: number;
  pendingBalance: number;
  propertyTaxes: number;
  maintenanceFees: number;
}

// --- Component Start ---

export default function InvestorPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  // Use the defined types for state variables
  const [investorData, setInvestorData] = useState<Investor | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loanData, setLoanData] = useState<Loan | null>(null);
  const [balances, setBalances] = useState<Balances | null>(null);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const investorQuery = query(
        collection(db, 'investors'),
        where('email', '==', formData.email),
      );
      const querySnapshot = await getDocs(investorQuery);

      if (!querySnapshot.empty) {
        // Cast data to Investor type after fetching
        const data = querySnapshot.docs[0].data() as Investor;

        if (data.password === formData.password) {
          // Fetch properties and cast to Property[]
          const propsQuery = query(
            collection(db, 'properties'),
            where('investorId', '==', formData.email),
          );
          const propsSnapshot = await getDocs(propsQuery);
          const properties: Property[] = propsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Property[];

          // Fetch documents and cast to Document[]
          const docsQuery = query(
            collection(db, 'documents'),
            where('investorEmail', '==', formData.email),
          );
          const docsSnapshot = await getDocs(docsQuery);
          const docs: Document[] = docsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Document[];

          // Fetch transactions and cast to Transaction[]
          const transQuery = query(
            collection(db, 'transactions'),
            where('investorEmail', '==', formData.email),
          );
          const transSnapshot = await getDocs(transQuery);
          const trans: Transaction[] = transSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[];

          // Fetch loan data and cast to Loan or null
          const loanQuery = query(
            collection(db, 'loans'),
            where('investorEmail', '==', formData.email),
          );
          const loanSnapshot = await getDocs(loanQuery);
          const loan: Loan | null =
            loanSnapshot.docs.length > 0
              ? (loanSnapshot.docs[0].data() as Loan)
              : null;

          // Fetch balances and cast to Balances or null
          const balanceQuery = query(
            collection(db, 'balances'),
            where('investorEmail', '==', formData.email),
          );
          const balanceSnapshot = await getDocs(balanceQuery);
          const balance: Balances | null =
            balanceSnapshot.docs.length > 0
              ? (balanceSnapshot.docs[0].data() as Balances)
              : null;

          setInvestorData({
            ...data,
            properties, // Assign the fetched properties
          });
          setDocuments(docs);
          setTransactions(trans);
          setLoanData(loan);
          setBalances(balance);
          setIsLoggedIn(true);
        } else {
          alert('Incorrect password. Please try again.');
        }
      } else {
        alert('Investor not found. Please check your email.');
      }
    } catch (error: string) {
      // Keep `any` here for general error handling from external libs
      console.error('Login error:', error);
      alert(`Something went wrong during login: ${error.message}`);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      await setDoc(doc(db, 'investors', formData.email), {
        email: formData.email,
        password: formData.password, // Be cautious storing passwords directly in Firestore. Hash them!
        name: formData.name,
        portfolioValue: 0,
        totalProperties: 0,
        yearlyAppreciation: 0,
      });

      alert('Account created successfully! You can now log in.');
      setIsRegistering(false);
    } catch (error: string) {
      // Keep `any` here for general error handling from external libs
      console.error('Registration error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const saveToFavorites = async (propertyId: string) => {
    try {
      // Ensure investorData is not null before accessing email
      if (!investorData?.email) {
        alert('Investor not logged in.');
        return;
      }
      await addDoc(collection(db, 'favorites'), {
        investorEmail: investorData.email,
        propertyId,
      });
      alert('Property saved to your favorites!');
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Failed to save property.');
    }
  };

  const toggleSellRequest = async (
    propertyId: string,
    currentStatus: boolean,
  ) => {
    try {
      await updateDoc(doc(db, 'properties', propertyId), {
        sellRequest: !currentStatus,
      });

      // Update local state
      setInvestorData((prev) => {
        if (!prev) return null; // Return null if prev is null
        return {
          ...prev,
          properties: prev.properties.map((prop) =>
            prop.id === propertyId
              ? { ...prop, sellRequest: !currentStatus }
              : prop,
          ),
        };
      });

      alert(
        currentStatus ? 'Sell request cancelled!' : 'Sell request submitted!',
      );
    } catch (error) {
      console.error('Error updating sell request:', error);
      alert('Failed to update sell request.');
    }
  };

  const openDirections = (location: GeoPoint) => {
    // Type 'location' as GeoPoint
    if (!location || location.length < 2) return;

    const [lat, lng] = location;
    // Corrected Google Maps URL for directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=<span class="math-inline">\{lat\},</span>{lng}`;

    window.open(mapsUrl, '_blank');
  };

  const requestLoan = async (amount: number) => {
    try {
      // Ensure investorData is not null before accessing email
      if (!investorData?.email) {
        alert('Investor not logged in.');
        return;
      }
      await addDoc(collection(db, 'loan_requests'), {
        investorEmail: investorData.email,
        amount,
        status: 'pending',
        requestDate: new Date().toISOString(),
        type: 'property_loan',
      });
      alert('Loan request submitted successfully!');
    } catch (error) {
      console.error('Error requesting loan:', error);
      alert('Failed to submit loan request.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 pb-16 pt-20 text-center text-white">
          <Badge className="mb-4 bg-primary/20 text-primary">
            Investor Portal
          </Badge>
          <h1 className="text-5xl font-bold">Access Your Investments</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            {isRegistering
              ? 'Create an account to manage your real estate investments.'
              : 'Log in to view your real estate portfolio, returns, and documents.'}
          </p>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {isRegistering ? 'Sign Up' : 'Sign In'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={isRegistering ? handleRegister : handleLogin}
                  className="space-y-4"
                >
                  {isRegistering && (
                    <Input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  )}
                  <Input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <Input
                    type="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <Button type="submit" className="w-full">
                    {isRegistering ? 'Sign Up' : 'Login'}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-sm text-primary hover:underline"
                  >
                    {isRegistering
                      ? 'Already have an account? Log in'
                      : "Don't have an account? Sign up"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
