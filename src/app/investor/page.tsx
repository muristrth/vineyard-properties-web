// src/app/investor/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Added signInWithEmailAndPassword
import {
  DollarSign,
  Home,
  TrendingUp,
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
  name: string;
  portfolioValue: number;
  totalProperties: number;
  yearlyAppreciation: number;
  properties?: Property[]; // Made optional, as it might be fetched separately
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
      // Use Firebase Auth for sign-in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;

      // Fetch investor data from Firestore based on email
      const investorQuery = query(
        collection(db, 'investors'),
        where('email', '==', user.email),
      );
      const querySnapshot = await getDocs(investorQuery);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data() as Investor;

        // Fetch properties and cast to Property[]
        const propsQuery = query(
          collection(db, 'properties'),
          where('investorEmail', '==', user.email), // Assuming investorEmail field in properties
        );
        const propsSnapshot = await getDocs(propsQuery);
        const properties: Property[] = propsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[];

        // Fetch documents and cast to Document[]
        const docsQuery = query(
          collection(db, 'documents'),
          where('investorEmail', '==', user.email),
        );
        const docsSnapshot = await getDocs(docsQuery);
        const docs: Document[] = docsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Document[];

        // Fetch transactions and cast to Transaction[]
        const transQuery = query(
          collection(db, 'transactions'),
          where('investorEmail', '==', user.email),
        );
        const transSnapshot = await getDocs(transQuery);
        const trans: Transaction[] = transSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        // Fetch loan data and cast to Loan or null
        const loanQuery = query(
          collection(db, 'loans'),
          where('investorEmail', '==', user.email),
        );
        const loanSnapshot = await getDocs(loanQuery);
        const loan: Loan | null =
          loanSnapshot.docs.length > 0
            ? (loanSnapshot.docs[0].data() as Loan)
            : null;

        // Fetch balances and cast to Balances or null
        const balanceQuery = query(
          collection(db, 'balances'),
          where('investorEmail', '==', user.email),
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
        // If auth successful but no corresponding investor document, create a basic one
        await setDoc(doc(db, 'investors', user.email!), {
          email: user.email,
          name: formData.name || user.email?.split('@')[0] || 'New Investor', // Use provided name or default
          portfolioValue: 0,
          totalProperties: 0,
          yearlyAppreciation: 0,
        });
        setInvestorData({
          email: user.email!,
          name: formData.name || user.email?.split('@')[0] || 'New Investor',
          portfolioValue: 0,
          totalProperties: 0,
          yearlyAppreciation: 0,
          properties: [],
        });
        setDocuments([]);
        setTransactions([]);
        setLoanData(null);
        setBalances(null);
        setIsLoggedIn(true);
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
      } else {
        alert(`Login failed: ${String(error)}`);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;

      // Store basic investor profile in Firestore
      // IMPORTANT: DO NOT store passwords directly in Firestore! Firebase Auth handles password hashing.
      await setDoc(doc(db, 'investors', user.email!), {
        email: user.email,
        name: formData.name,
        portfolioValue: 0,
        totalProperties: 0,
        yearlyAppreciation: 0,
      });

      alert('Account created successfully! You can now log in.');
      setIsRegistering(false);
      // Optionally log them in directly after registration
      // setIsLoggedIn(true);
      // setInvestorData({ email: user.email!, name: formData.name, portfolioValue: 0, totalProperties: 0, yearlyAppreciation: 0, properties: [] });
    } catch (error: unknown) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert(`Registration failed: ${String(error)}`);
      }
    }
  };

  const saveToFavorites = async (propertyId: string) => {
    try {
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

      setInvestorData((prev) => {
        if (!prev) return null;
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
    if (!location || location.length < 2) {
      alert('Invalid location data.');
      return;
    }
    const [lat, lng] = location;
    // Corrected Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  const requestLoan = async (amount: number) => {
    try {
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

  // --- Render Login/Register Form if not logged in ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <section className="bg-gradient-to-br from-gray-900 to-gray-800 pb-16 pt-20 text-center text-white">
          <Badge className="mb-4 bg-primary/20 text-primary">Investor Portal</Badge>
          <h1 className="text-5xl font-bold">Access Your Investments</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            {isRegistering
              ? 'Create an account to manage your real estate investments.'
              : 'Log in to view your real estate portfolio, returns, and documents.'}
          </p>
        </section>

        <section className="bg-black-50 py-20 flex-grow flex items-center justify-center">
          <div className="mx-auto max-w-md w-full">
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
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
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
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
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
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Input
                      id="password"
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
                  </div>

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

  // --- Render Investor Dashboard if logged in ---
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-gradient-to-br from-gray-900 to-gray-800 pb-16 pt-20 text-center text-white">
        <Badge className="mb-4 bg-primary/20 text-primary">Investor Dashboard</Badge>
        <h1 className="text-5xl font-bold">
          Welcome, {investorData?.name || 'Investor'}!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Manage your real estate portfolio and track your investments.
        </p>
      </section>

      <section className="bg-gray-50 py-12 flex-grow">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Portfolio Value
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(investorData?.portfolioValue || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{(investorData?.yearlyAppreciation || 0).toFixed(2)}% yearly appreciation
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Number of Properties
                    </CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {investorData?.totalProperties || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across various locations
                    </p>
                  </CardContent>
                </Card>

                {balances && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Available Balance
                      </CardTitle>
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency(balances.availableBalance)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pending: {formatCurrency(balances.pendingBalance)}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="h-auto py-3" onClick={() => setActiveTab('properties')}>
                    <Home className="mr-2 h-5 w-5" /> View Properties
                  </Button>
                  <Button className="h-auto py-3" onClick={() => setActiveTab('financials')}>
                    <CreditCard className="mr-2 h-5 w-5" /> Manage Finances
                  </Button>
                  <Button className="h-auto py-3" onClick={() => setActiveTab('documents')}>
                    <FileText className="mr-2 h-5 w-5" /> Access Documents
                  </Button>
                  {/* Example loan request button - you'd likely have a form for amount */}
                  <Button className="h-auto py-3" onClick={() => requestLoan(500000)}>
                    <PiggyBank className="mr-2 h-5 w-5" /> Request Loan (Example)
                  </Button>
                </div>
              </div>

              {/* Recent Transactions (Placeholder) */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((t) => (
                      <Card key={t.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-500">{t.description}</p>
                          <p className="text-sm text-green-500">{t.date}</p>
                        </div>
                        <Badge variant={t.type === 'credit' ? 'default' : 'destructive'}>
                          {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                        </Badge>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No recent transactions.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="properties" className="mt-4">
              <h2 className="text-2xl font-bold mb-4">My Properties</h2>
              {investorData?.properties && investorData.properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {investorData.properties.map((property) => (
                    <Card key={property.id}>
                      <CardHeader>
                        <CardTitle>{property.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <p className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          Location: {property.location[0]}, {property.location[1]}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          Purchase Price: {formatCurrency(property.purchasePrice)}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          Current Value: {formatCurrency(property.currentValue)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={() => openDirections(property.location)}>
                            <Navigation className="h-4 w-4 mr-1" /> Directions
                          </Button>
                          <Button
                            size="sm"
                            variant={property.sellRequest ? 'destructive' : 'outline'}
                            onClick={() => toggleSellRequest(property.id, property.sellRequest || false)}
                          >
                            {property.sellRequest ? (
                              <XCircle className="h-4 w-4 mr-1" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-1" />
                            )}
                            {property.sellRequest ? 'Cancel Sell Request' : 'Request to Sell'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => saveToFavorites(property.id)}>
                            <Heart className="h-4 w-4 mr-1" /> Favorite
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You currently have no properties listed.</p>
              )}
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <h2 className="text-2xl font-bold mb-4">My Documents</h2>
              {documents.length > 0 ? (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {doc.type} - {doc.property} - {doc.date}
                        </p>
                      </div>
                      <Button asChild variant="outline">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </a>
                      </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No documents available.</p>
              )}
            </TabsContent>

            <TabsContent value="financials" className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Financial Overview</h2>

              {/* Balances Section */}
              {balances && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Current Balances
                      </CardTitle>
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-bold">
                        Available: {formatCurrency(balances.availableBalance)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pending: {formatCurrency(balances.pendingBalance)}
                      </p>
                      <p className="text-sm text-red-500">
                        Property Taxes Due: {formatCurrency(balances.propertyTaxes)}
                      </p>
                      <p className="text-sm text-orange-500">
                        Maintenance Fees Due: {formatCurrency(balances.maintenanceFees)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Loan Section */}
              <h3 className="text-xl font-semibold mb-4">Loan Information</h3>
              {loanData ? (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Your Loan Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold">
                      Credit Limit: {formatCurrency(loanData.creditLimit)}
                    </p>
                    <p className="text-lg text-red-600">
                      Outstanding Balance: {formatCurrency(loanData.outstandingBalance)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Interest Rate: {loanData.interestRate}%
                    </p>
                    {loanData.transactions && loanData.transactions.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Loan Transactions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {loanData.transactions.map((t, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              {t.date}: {t.description} -{' '}
                              <span className={t.type === 'payment' ? 'text-green-600' : 'text-red-600'}>
                                {t.type === 'payment' ? '-' : '+'} {formatCurrency(t.amount)}
                              </span>{' '}
                              ({t.status})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Button className="mt-4" onClick={() => requestLoan(100000)}>
                      Request Additional Loan
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="p-4 border rounded-md text-center">
                  <p className="text-gray-600 mb-4">No active loan found.</p>
                  <Button onClick={() => requestLoan(100000)}>Apply for a Loan</Button>
                </div>
              )}

              {/* All Transactions Section */}
              <h3 className="text-xl font-semibold mb-4 mt-8">All Transactions</h3>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((t) => (
                    <Card key={t.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t.description}</p>
                        <p className="text-sm text-gray-500">{t.date}</p>
                      </div>
                      <Badge variant={t.type === 'credit' ? 'default' : 'destructive'}>
                        {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                      </Badge>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No transactions recorded.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}