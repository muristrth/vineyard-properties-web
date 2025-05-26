"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Home,
  FileText,
  MapPin,
  DollarSign,
  Eye,
  Download,
  Navigation,
  BarChart3,
  PieChart,
  Calendar,
  Shield
} from "lucide-react";

// Mock investor data
const investorData = {
  name: "John Investor",
  email: "john@example.com",
  portfolioValue: 2850000,
  totalProperties: 5,
  monthlyReturn: 12500,
  yearlyReturn: 150000,
  properties: [
    {
      id: "prop-001",
      name: "Serenity Height Villa A",
      location: "Miami, FL",
      purchasePrice: 570000,
      currentValue: 620000,
      monthlyRent: 4200,
      yearlyReturn: 50400,
      image: "https://ext.same-assets.com/2009473017/3139036848.svg",
      status: "Rented",
      titleDeed: "deed-001.pdf"
    },
    {
      id: "prop-002",
      name: "Mountain Retreat Villa",
      location: "Los Angeles, CA",
      purchasePrice: 750000,
      currentValue: 825000,
      monthlyRent: 5200,
      yearlyReturn: 62400,
      image: "https://ext.same-assets.com/2009473017/1292219655.jpeg",
      status: "Rented",
      titleDeed: "deed-002.pdf"
    },
    {
      id: "prop-003",
      name: "Vista Grand Penthouse",
      location: "San Diego, CA",
      purchasePrice: 580000,
      currentValue: 650000,
      monthlyRent: 3900,
      yearlyReturn: 46800,
      image: "https://ext.same-assets.com/2009473017/742755443.jpeg",
      status: "Available",
      titleDeed: "deed-003.pdf"
    }
  ]
};

export default function InvestorPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register with a backend
    setIsLoggedIn(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
                Investor Portal
              </Badge>
              <h1 className="text-4xl md:text-6xl font-radio-canada font-bold mb-6">
                Manage Your
                <br />
                <span className="text-primary">Property Investments</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Access your investment portfolio, track returns, view property documents,
                and manage your real estate investments all in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Login/Register Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-radio-canada font-bold text-gray-900">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <p className="text-gray-600">
                  {isLogin
                    ? "Sign in to access your investment dashboard"
                    : "Join our exclusive investor community"
                  }
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-6">
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"
                    }
                  </button>
                </div>

                {isLogin && (
                  <div className="mt-4 text-center">
                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                      Forgot your password?
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Dashboard view when logged in
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <section className="pt-20 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-radio-canada font-bold text-gray-900">
                Welcome back, {investorData.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Here's an overview of your investment portfolio
              </p>
            </div>
            <Button onClick={() => setIsLoggedIn(false)} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Portfolio Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(investorData.portfolioValue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Properties Owned</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {investorData.totalProperties}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Monthly Return</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(investorData.monthlyReturn)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Yearly Return</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(investorData.yearlyReturn)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Properties Portfolio */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-radio-canada font-bold text-gray-900">
              Your Properties
            </h2>
            <div className="flex space-x-4">
              <Button variant="outline">
                <PieChart className="w-4 h-4 mr-2" />
                Performance Analytics
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {investorData.properties.map((property, index) => (
              <Card key={property.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className={`absolute top-4 left-4 ${
                      property.status === 'Rented'
                        ? 'bg-green-600'
                        : 'bg-orange-600'
                    } text-white`}
                  >
                    {property.status}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-radio-canada font-bold text-gray-900 mb-2">
                    {property.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Purchase Price</span>
                      <span className="font-semibold">{formatCurrency(property.purchasePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Value</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(property.currentValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Rent</span>
                      <span className="font-semibold">{formatCurrency(property.monthlyRent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Yearly Return</span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(property.yearlyReturn)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Title Deed
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-radio-canada font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Investment Analysis</h3>
                <p className="text-sm text-gray-600">View detailed ROI reports and market analysis</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Schedule Inspection</h3>
                <p className="text-sm text-gray-600">Book property inspections and maintenance</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Download Documents</h3>
                <p className="text-sm text-gray-600">Access contracts, deeds, and financial reports</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Insurance & Legal</h3>
                <p className="text-sm text-gray-600">Manage insurance policies and legal documents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
