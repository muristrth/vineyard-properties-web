"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  DollarSign,
  Home,
  TrendingUp,
  BarChart3,
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
  PiggyBank
} from "lucide-react";

const auth = getAuth();

export default function InvestorPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [investorData, setInvestorData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loanData, setLoanData] = useState<any>(null);
  const [balances, setBalances] = useState<any>(null);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES"
    }).format(amount);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const investorQuery = query(
        collection(db, "investors"),
        where("email", "==", formData.email)
      );
      const querySnapshot = await getDocs(investorQuery);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        if (data.password === formData.password) {
          // Fetch properties
          const propsQuery = query(
            collection(db, "properties"),
            where("investorId", "==", formData.email)
          );
          const propsSnapshot = await getDocs(propsQuery);
          const properties = propsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Fetch documents
          const docsQuery = query(
            collection(db, "documents"),
            where("investorEmail", "==", formData.email)
          );
          const docsSnapshot = await getDocs(docsQuery);
          const docs = docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Fetch transactions
          const transQuery = query(
            collection(db, "transactions"),
            where("investorEmail", "==", formData.email)
          );
          const transSnapshot = await getDocs(transQuery);
          const trans = transSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Fetch loan data
          const loanQuery = query(
            collection(db, "loans"),
            where("investorEmail", "==", formData.email)
          );
          const loanSnapshot = await getDocs(loanQuery);
          const loan = loanSnapshot.docs.length > 0 ? loanSnapshot.docs[0].data() : null;

          // Fetch balances
          const balanceQuery = query(
            collection(db, "balances"),
            where("investorEmail", "==", formData.email)
          );
          const balanceSnapshot = await getDocs(balanceQuery);
          const balance = balanceSnapshot.docs.length > 0 ? balanceSnapshot.docs[0].data() : null;

          setInvestorData({
            ...data,
            properties
          });
          setDocuments(docs);
          setTransactions(trans);
          setLoanData(loan);
          setBalances(balance);
          setIsLoggedIn(true);
        } else {
          alert("Incorrect password. Please try again.");
        }
      } else {
        alert("Investor not found. Please check your email.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "investors", formData.email), {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        portfolioValue: 0,
        totalProperties: 0,
        yearlyAppreciation: 0
      });

      alert("Account created successfully! You can now log in.");
      setIsRegistering(false);
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const saveToFavorites = async (propertyId: string) => {
    try {
      await addDoc(collection(db, "favorites"), {
        investorEmail: investorData.email,
        propertyId
      });
      alert("Property saved to your favorites!");
    } catch (error) {
      console.error("Error saving favorite:", error);
      alert("Failed to save property.");
    }
  };

  const toggleSellRequest = async (propertyId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "properties", propertyId), {
        sellRequest: !currentStatus
      });

      // Update local state
      setInvestorData(prev => ({
        ...prev,
        properties: prev.properties.map(prop =>
          prop.id === propertyId
            ? { ...prop, sellRequest: !currentStatus }
            : prop
        )
      }));

      alert(currentStatus ? "Sell request cancelled" : "Sell request submitted!");
    } catch (error) {
      console.error("Error updating sell request:", error);
      alert("Failed to update sell request.");
    }
  };

  const openDirections = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  };

  const requestLoan = async (amount: number) => {
    try {
      await addDoc(collection(db, "loan_requests"), {
        investorEmail: investorData.email,
        amount,
        status: "pending",
        requestDate: new Date().toISOString(),
        type: "property_loan"
      });
      alert("Loan request submitted successfully!");
    } catch (error) {
      console.error("Error requesting loan:", error);
      alert("Failed to submit loan request.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center">
          <Badge className="mb-4 bg-primary/20 text-primary">Investor Portal</Badge>
          <h1 className="text-5xl font-bold">Access Your Investments</h1>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            {isRegistering ? "Create an account to manage your real estate investments." : "Log in to view your real estate portfolio, returns, and documents."}
          </p>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {isRegistering ? "Sign Up" : "Sign In"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                  {isRegistering && (
                    <Input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  )}
                  <Input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                  <Input
                    type="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                  <Button type="submit" className="w-full">
                    {isRegistering ? "Sign Up" : "Login"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-sm text-primary hover:underline"
                  >
                    {isRegistering
                      ? "Already have an account? Log in"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-20 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Welcome, {investorData?.name || "Investor"}
            </h1>
            <Button onClick={() => setIsLoggedIn(false)} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="balances">Balances</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="text-primary w-6 h-6 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Portfolio Value</p>
                      <p className="text-xl font-bold">{formatCurrency(investorData.portfolioValue || 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Home className="text-blue-600 w-6 h-6 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Properties Owned</p>
                      <p className="text-xl font-bold">{investorData.totalProperties || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="text-green-600 w-6 h-6 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Yearly Appreciation</p>
                      <p className="text-xl font-bold">{formatCurrency(investorData.yearlyAppreciation || 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.isArray(investorData.properties) && investorData.properties.map((property: any) => (
                <Card key={property.id} className="relative">
                  <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{property.name}</h3>
                      {property.sellRequest && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-xs">Sell Request</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" /> {property.location}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <div>Purchase: {formatCurrency(property.purchasePrice || 0)}</div>
                      <div>Current: {formatCurrency(property.currentValue || 0)}</div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </Button>
                      <Button onClick={() => saveToFavorites(property.id)} variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openDirections(property.location)}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <Navigation className="w-4 h-4 mr-2" /> Directions
                      </Button>
                      <Button
                        onClick={() => toggleSellRequest(property.id, property.sellRequest || false)}
                        variant={property.sellRequest ? "default" : "outline"}
                        className="flex-1"
                        size="sm"
                      >
                        {property.sellRequest ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" /> Requested
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" /> Sell Request
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Property Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.property}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{doc.date}</span>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No documents available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No transactions found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balances" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Account Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Available Balance:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(balances?.availableBalance || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Balance:</span>
                      <span className="font-bold text-yellow-600">
                        {formatCurrency(balances?.pendingBalance || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Total Balance:</span>
                      <span className="font-bold">
                        {formatCurrency((balances?.availableBalance || 0) + (balances?.pendingBalance || 0))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Outstanding Dues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Transfer Fees:</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency(balances?.propertyTaxes || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Administration Fees:</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency(balances?.maintenanceFees || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Total Dues:</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency((balances?.propertyTaxes || 0) + (balances?.maintenanceFees || 0))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PiggyBank className="w-5 h-5 mr-2" />
                    Loan Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Credit Limit:</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(loanData?.creditLimit || 50000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outstanding Balance:</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency(loanData?.outstandingBalance || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Credit:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency((loanData?.creditLimit || 50000) - (loanData?.outstandingBalance || 0))}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Interest Rate:</span>
                      <span className="font-bold">{loanData?.interestRate || 5.5}% APR</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Quick Loan Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Loan Amount"
                      id="loanAmount"
                    />
                    <Button
                      className="w-full"
                      onClick={() => {
                        const amount = (document.getElementById('loanAmount') as HTMLInputElement)?.value;
                        if (amount) requestLoan(Number(amount));
                      }}
                    >
                      Request Loan
                    </Button>
                    <p className="text-sm text-gray-500 text-center">
                      Loans are subject to approval and terms & conditions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Loan Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loanData?.transactions?.map((transaction: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'payment' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'payment' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.status}</p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-center text-gray-500 py-8">No loan transactions found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
