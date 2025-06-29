// src/app/calculators/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Calculator, DollarSign, TrendingUp, Home, Scale, Percent,
  Building, Wallet, LineChart, TrendingDown, Landmark, PiggyBank,
  Lightbulb, AlertCircle, Coffee, Zap, Trophy, Star, XCircle // Added XCircle for modal close
} from 'lucide-react';

// Easter Egg State
const useEasterEggs = () => {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [showSecretCalculator, setShowSecretCalculator] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  const quotes = [
    "Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world. - Franklin D. Roosevelt",
    "Don't wait to buy real estate. Buy real estate and wait. - T. Harv Eker",
    "The best investment on earth is earth. - Louis Glickman",
    "Real estate investing, even on a very small scale, remains a tried and true means of building an individual's cash flow and wealth. - Robert Kiyosaki",
    "Location, location, location! The three most important factors in real estate."
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiCode, e.key];
      const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

      // Keep the sequence length manageable
      if (newSequence.length > konamiSequence.length) {
        newSequence.shift();
      }
      setKonamiCode(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiSequence)) {
        setShowSecretCalculator(true);
        setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)] ?? "");
        setKonamiCode([]); // Reset code after activation
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode, quotes]); // Added quotes to dependency array

  return { showSecretCalculator, coffeeCount, setCoffeeCount, motivationalQuote };
};

// Re-usable UI Components
const Card = ({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
    onClick={onClick}
    style={onClick ? { cursor: 'pointer' } : undefined}
    tabIndex={onClick ? 0 : undefined}
    role={onClick ? 'button' : undefined}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({
  children, onClick, variant = 'primary', disabled = false, className = '', type = 'button'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'secret';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
    secret: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 animate-pulse',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} h-10 px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({
  type = 'text', placeholder, value, onChange, required = false, className = '', id, name, step, min, max
}: {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  step?: string;
  min?: string;
  max?: string;
}) => (
  <input
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    step={step}
    min={min}
    max={max}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

const Separator = ({ className = '' }: { className?: string }) => (
  <div className={`border-t border-gray-200 ${className}`} />
);

// Modal Component
const Modal = ({ children, isOpen, onClose, title }: { children: React.ReactNode; isOpen: boolean; onClose: () => void; title: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <XCircle className="h-6 w-6" /> {/* Changed icon to XCircle */}
        </button>
        {children}
      </div>
    </div>
  );
};

// Easter Egg: Secret Calculator
const SecretCalculator = ({ coffeeCount, setCoffeeCount }: { coffeeCount: number; setCoffeeCount: (count: number) => void }) => {
  const [propertyValue, setPropertyValue] = useState(0);
  const [coffeeMultiplier, setCoffeeMultiplier] = useState(1);

  useEffect(() => {
    setCoffeeMultiplier(1 + (coffeeCount * 0.1));
  }, [coffeeCount]);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ☕ The Coffee-Powered Property Calculator ☕
        </h3>
        <p className="text-sm text-purple-700 mt-2">
          Legend says each coffee cup increases your negotiation power by 10%!
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          variant="secret"
          onClick={() => setCoffeeCount(coffeeCount + 1)}
          className="flex items-center space-x-2"
        >
          <Coffee className="h-5 w-5" />
          <span>Drink Coffee ({coffeeCount} cups)</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">Property Value (KES)</label>
          <Input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            className="border-purple-300 focus:ring-purple-500"
          />
        </div>

        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600">Coffee Multiplier: {coffeeMultiplier.toFixed(1)}x</p>
          <p className="text-sm text-purple-600">Your Caffeinated Negotiation Power:</p>
          <p className="text-2xl font-bold text-purple-700">{formatCurrency(propertyValue * coffeeMultiplier)}</p>
          <p className="text-xs text-purple-500 mt-2">
            *Results may vary. Side effects include increased energy and better deals.
          </p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Mortgage Calculator with Easter Eggs
const MortgageCalculator = ({ propertyPrice = 0 }: { propertyPrice?: number }) => {
  const [loanAmount, setLoanAmount] = useState<number>(propertyPrice);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Easter Egg: Detect funny numbers
  useEffect(() => {
    if (loanAmount === 69420 || interestRate === 4.20 || loanTerm === 42) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  }, [loanAmount, interestRate, loanTerm]);

  const calculatePayment = useCallback(() => {
    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyInterestRate === 0) {
      const payment = loanAmount / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalInterest(0);
    } else {
      const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
      const payment = numerator / denominator;
      setMonthlyPayment(payment);
      setTotalInterest((payment * numberOfPayments) - loanAmount);
    }
  }, [loanAmount, interestRate, loanTerm]);

  useEffect(() => {
    calculatePayment();
  }, [calculatePayment, loanAmount, interestRate, loanTerm]);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-4">
      {showEasterEgg && (
        <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-md animate-bounce">
          <p className="text-yellow-800 text-center">🎉 Nice numbers! You've discovered a secret! 🎉</p>
        </div>
      )}

      <div>
        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (KES)</label>
        <Input type="number" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
      </div>
      <div>
        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
        <Input type="number" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} step="0.1" />
      </div>
      <div>
        <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
        <Input type="number" id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} min="1" />
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Monthly Payment:</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Interest:</p>
            <p className="text-xl font-semibold text-gray-800">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Total Amount Paid:</p>
          <p className="text-xl font-semibold text-gray-800">{formatCurrency(monthlyPayment * loanTerm * 12)}</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Investment Property Calculator (Simple Rental Analysis) - Renamed to avoid conflict
const SimpleRentalPropertyCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [annualExpenses, setAnnualExpenses] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [mortgagePayment, setMortgagePayment] = useState(0);
  const [vacancyRate, setVacancyRate] = useState(5);

  // Calculated values
  const [cashFlow, setCashFlow] = useState(0);
  const [capRate, setCapRate] = useState(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState(0);
  const [rentToValueRatio, setRentToValueRatio] = useState(0);

  useEffect(() => {
    const grossAnnualRent = monthlyRent * 12;
    const effectiveAnnualRent = grossAnnualRent * (1 - vacancyRate / 100);
    const annualMortgagePayment = mortgagePayment * 12;
    const netOperatingIncome = effectiveAnnualRent - annualExpenses;
    const annualCashFlow = netOperatingIncome - annualMortgagePayment;

    setCashFlow(annualCashFlow / 12);

    if (purchasePrice > 0) {
      setCapRate((netOperatingIncome / purchasePrice) * 100);
      setRentToValueRatio((monthlyRent / purchasePrice) * 100);
    } else {
      setCapRate(0);
      setRentToValueRatio(0);
    }

    if (downPayment > 0) {
      setCashOnCashReturn((annualCashFlow / downPayment) * 100);
    } else {
      setCashOnCashReturn(0);
    }
  }, [purchasePrice, monthlyRent, annualExpenses, downPayment, mortgagePayment, vacancyRate]);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  const getInvestmentGrade = () => {
    if (capRate >= 10 && cashOnCashReturn >= 12) return { grade: 'A+', color: 'text-green-600', emoji: '🏆' };
    if (capRate >= 8 && cashOnCashReturn >= 10) return { grade: 'A', color: 'text-green-500', emoji: '⭐' };
    if (capRate >= 6 && cashOnCashReturn >= 8) return { grade: 'B', color: 'text-yellow-500', emoji: '👍' };
    if (capRate >= 4 && cashOnCashReturn >= 6) return { grade: 'C', color: 'text-orange-500', emoji: '🤔' };
    return { grade: 'D', color: 'text-red-500', emoji: '❌' };
  };

  const investmentGrade = getInvestmentGrade();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <h4 className="font-bold mb-2 flex items-center">
          <Building className="h-5 w-5 mr-2" /> Simple Rental Property Analysis
        </h4>
        <p className="text-sm text-blue-800">
          A quick tool to estimate basic rental property viability, including cash flow, cap rate, and investment grade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">Purchase Price (KES)</label>
          <Input type="number" id="purchasePrice" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">Down Payment (KES)</label>
          <Input type="number" id="downPayment" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700 mb-1">Monthly Rental Income (KES)</label>
          <Input type="number" id="monthlyRent" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="mortgagePayment" className="block text-sm font-medium text-gray-700 mb-1">Monthly Mortgage Payment (KES)</label>
          <Input type="number" id="mortgagePayment" value={mortgagePayment} onChange={(e) => setMortgagePayment(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="annualExpenses" className="block text-sm font-medium text-gray-700 mb-1">Annual Operating Expenses (KES)</label>
          <Input type="number" id="annualExpenses" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="vacancyRate" className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
          <Input type="number" id="vacancyRate" value={vacancyRate} onChange={(e) => setVacancyRate(Number(e.target.value))} min="0" max="100" />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-bold text-lg mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2" /> Investment Analysis
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Monthly Cash Flow</p>
            <p className={`text-xl font-bold ${cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(cashFlow)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Cap Rate</p>
            <p className="text-xl font-bold text-blue-600">{capRate.toFixed(2)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Cash-on-Cash Return</p>
            <p className="text-xl font-bold text-purple-600">{cashOnCashReturn.toFixed(2)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Rent-to-Value Ratio</p>
            <p className="text-xl font-bold text-orange-600">{rentToValueRatio.toFixed(3)}%</p>
          </div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Investment Grade</p>
          <p className={`text-4xl font-bold ${investmentGrade.color}`}>
            {investmentGrade.emoji} {investmentGrade.grade}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Based on Cap Rate and Cash-on-Cash Return analysis
          </p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Property Valuation Calculator
const PropertyValuationCalculator = () => {
  const [comparableSales, setComparableSales] = useState<string>('');
  const [propertySize, setPropertySize] = useState<number>(0);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [pricePerSqft, setPricePerSqft] = useState<number | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState<string>('');

  const calculateValuation = () => {
    const salesArray = comparableSales.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (salesArray.length > 0) {
      const average = salesArray.reduce((sum, val) => sum + val, 0) / salesArray.length;
      const variance = Math.random() * 0.1 - 0.05; // +/- 5%
      const finalValue = Math.round(average * (1 + variance));

      setEstimatedValue(finalValue);

      if (propertySize > 0) {
        setPricePerSqft(Math.round(finalValue / propertySize));
      } else {
        setPricePerSqft(null);
      }

      // Determine confidence level based on number of comparables
      if (salesArray.length >= 5) {
        setConfidenceLevel('High');
      } else if (salesArray.length >= 3) {
        setConfidenceLevel('Medium');
      } else {
        setConfidenceLevel('Low');
      }
    } else {
      setEstimatedValue(null);
      setPricePerSqft(null);
      setConfidenceLevel('');
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded-md">
        <h4 className="font-bold mb-2 flex items-center">
          <Scale className="h-5 w-5 mr-2" /> Advanced Property Valuation
        </h4>
        <p className="text-sm text-green-800">
          Get detailed valuation analysis including price per square foot and confidence levels.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="comparableSales" className="block text-sm font-medium text-gray-700 mb-1">
            Comparable Property Sales (Comma-separated KES values)
          </label>
          <Input
            type="text"
            id="comparableSales"
            value={comparableSales}
            onChange={(e) => setComparableSales(e.target.value)}
            placeholder="e.g., 25000000, 26500000, 24800000, 27000000, 25500000"
          />
        </div>

        <div>
          <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-1">
            Property Size (Square Feet)
          </label>
          <Input
            type="number"
            id="propertySize"
            value={propertySize}
            onChange={(e) => setPropertySize(Number(e.target.value))}
            placeholder="e.g., 2500"
          />
        </div>

        <Button onClick={calculateValuation} className="w-full">
          <Zap className="h-4 w-4 mr-2" />
          Calculate Enhanced Valuation
        </Button>
      </div>

      {estimatedValue !== null && (
        <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
          <h4 className="font-bold text-lg mb-4 text-blue-800">Valuation Results</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Estimated Market Value</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(estimatedValue)}</p>
            </div>

            {pricePerSqft && (
              <div className="text-center">
                <p className="text-sm text-gray-600">Price per Sq Ft</p>
                <p className="text-xl font-semibold text-green-600">{formatCurrency(pricePerSqft)}</p>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">Confidence Level</p>
              <p className={`text-xl font-semibold ${
                confidenceLevel === 'High' ? 'text-green-600' :
                confidenceLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {confidenceLevel}
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>*This is an automated estimate based on comparable sales data.</p>
            <p>For official property valuations, consult a certified appraiser.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Comprehensive Real Estate Investment Feasibility Calculator
const InvestmentFeasibilityCalculator = () => {
  // Inputs
  const [acquisitionCost, setAcquisitionCost] = useState(0);
  const [developmentCost, setDevelopmentCost] = useState(0);
  const [otherInitialCosts, setOtherInitialCosts] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanInterestRate, setLoanInterestRate] = useState(6.5); // Annual %
  const [loanTermYears, setLoanTermYears] = useState(20);

  const [monthlyRentalIncomePerUnit, setMonthlyRentalIncomePerUnit] = useState(0);
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [vacancyRate, setVacancyRate] = useState(5); // in %
  const [annualOperatingExpenses, setAnnualOperatingExpenses] = useState(0); // Excludes debt service

  const [expectedSalePrice, setExpectedSalePrice] = useState(0);
  const [holdingPeriodYears, setHoldingPeriodYears] = useState(5);
  const [discountRate, setDiscountRate] = useState(8); // for NPV, in %

  // Calculated Metrics
  const [totalInitialInvestment, setTotalInitialInvestment] = useState(0);
  const [monthlyDebtService, setMonthlyDebtService] = useState(0);
  const [netOperatingIncomeAnnual, setNetOperatingIncomeAnnual] = useState(0);
  const [annualCashFlowBeforeTax, setAnnualCashFlowBeforeTax] = useState(0);
  const [capRate, setCapRate] = useState<number | null>(null);
  const [cashOnCashReturn, setCashOnCashReturn] = useState<number | null>(null);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);
  const [totalROI, setTotalROI] = useState<number | null>(null);
  const [npv, setNpv] = useState<number | null>(null);
  const [irr, setIrr] = useState<number | null>(null); // Placeholder for complex calculation

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  useEffect(() => {
    // 1. Total Initial Investment
    const initialInv = acquisitionCost + developmentCost + otherInitialCosts;
    setTotalInitialInvestment(initialInv);

    // 2. Monthly Debt Service (using standard mortgage formula)
    let mds = 0;
    if (loanAmount > 0 && loanInterestRate > 0 && loanTermYears > 0) {
      const monthlyRate = loanInterestRate / 100 / 12;
      const numPayments = loanTermYears * 12;
      mds = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    } else if (loanAmount > 0 && loanInterestRate === 0 && loanTermYears > 0) {
      mds = loanAmount / (loanTermYears * 12); // Simple division for 0 interest
    }
    setMonthlyDebtService(mds);

    // 3. Gross Rental Income (Annual)
    const grossRentalAnnual = monthlyRentalIncomePerUnit * numberOfUnits * 12;

    // 4. Effective Gross Income (Annual)
    const effectiveGross = grossRentalAnnual * (1 - vacancyRate / 100);

    // 5. Net Operating Income (NOI)
    const noi = effectiveGross - annualOperatingExpenses;
    setNetOperatingIncomeAnnual(noi);

    // 6. Annual Cash Flow Before Tax
    const annualCFBT = noi - (mds * 12);
    setAnnualCashFlowBeforeTax(annualCFBT);

    // 7. Cap Rate
    if (initialInv > 0) {
      setCapRate((noi / initialInv) * 100);
    } else {
      setCapRate(null);
    }

    // 8. Cash-on-Cash Return (assuming equity is totalInitialInvestment - loanAmount)
    const equityInvested = initialInv - loanAmount;
    if (annualCFBT > 0 && equityInvested > 0) {
      setCashOnCashReturn((annualCFBT / equityInvested) * 100);
    } else {
      setCashOnCashReturn(null);
    }

    // 9. Payback Period (simplified: assumes constant annual cash flow)
    if (annualCFBT > 0 && initialInv > 0) {
      setPaybackPeriod(initialInv / annualCFBT);
    } else {
      setPaybackPeriod(null);
    }

    // 10. Total Return on Investment (ROI)
    if (initialInv > 0) {
      const totalProfit = (expectedSalePrice - initialInv) + (annualCFBT * holdingPeriodYears);
      setTotalROI((totalProfit / initialInv) * 100);
    } else {
      setTotalROI(null);
    }

    // 11. NPV (Simplified: assumes annual cash flows are constant + sale at end)
    if (initialInv > 0 && holdingPeriodYears > 0 && discountRate >= 0) {
      let currentNpv = -initialInv; // Initial outflow
      const rate = discountRate / 100;
      for (let i = 1; i <= holdingPeriodYears; i++) {
        currentNpv += annualCFBT / Math.pow(1 + rate, i);
      }
      currentNpv += expectedSalePrice / Math.pow(1 + rate, holdingPeriodYears);
      setNpv(currentNpv);
    } else {
      setNpv(null);
    }

    // 12. IRR (Complex, placeholder)
    setIrr(null); // Requires iterative calculation, often a library
  }, [
    acquisitionCost, developmentCost, otherInitialCosts, loanAmount, loanInterestRate, loanTermYears,
    monthlyRentalIncomePerUnit, numberOfUnits, vacancyRate, annualOperatingExpenses,
    expectedSalePrice, holdingPeriodYears, discountRate
  ]);

  // Project Viability Assessment
  const getViabilityAssessment = () => {
    let assessment = [];
    const redFlags = [];

    if (totalInitialInvestment <= 0) {
      redFlags.push("Initial investment not specified. Cannot perform full analysis.");
      return { assessment: ["Please enter valid initial investment costs."], redFlags: [] };
    }
    const equityInvested = totalInitialInvestment - loanAmount;

    if (annualCashFlowBeforeTax < 0) {
      redFlags.push("Consistently negative annual cash flow before tax, indicating potential financial instability if sustained.");
    } else if (annualCashFlowBeforeTax === 0) {
      redFlags.push("Zero annual cash flow before tax, which may not meet investment objectives.");
    }

    if (capRate !== null && capRate < 4) { // Example threshold
      redFlags.push("Low Capitalization Rate (Cap Rate) suggests a lower return relative to the property's value.");
    }
    if (cashOnCashReturn !== null && cashOnCashReturn < 8 && equityInvested > 0) { // Example threshold
      redFlags.push("Low Cash-on-Cash Return indicates a modest return on your actual cash investment.");
    }
    if (paybackPeriod !== null && paybackPeriod > 10 && annualCashFlowBeforeTax > 0) { // Example threshold for long payback
      redFlags.push(`Long payback period (${paybackPeriod.toFixed(1)} years), meaning it will take a significant time to recoup your initial investment.`);
    }
    if (totalROI !== null && totalROI < 10) { // Example threshold
      redFlags.push("Low Total Return on Investment (ROI) over the holding period compared to typical investment goals.");
    }
    if (npv !== null && npv < 0) {
      redFlags.push(`Negative Net Present Value (NPV) suggests the project's expected returns, when discounted, are less than the initial investment, making it potentially unattractive.`);
    }
    if (loanAmount > totalInitialInvestment * 0.8) { // Example: High leverage
      redFlags.push("High loan amount relative to total investment, increasing financial risk.");
    }
    if (vacancyRate > 10) { // Example: High vacancy
      redFlags.push("High vacancy rate, which can significantly reduce net operating income.");
    }

    if (redFlags.length > 0) {
      assessment.push("Based on the provided inputs, the project shows some **potential red flags** that require closer scrutiny:");
      assessment = assessment.concat(redFlags.map(flag => `- ${flag}`));
      assessment.push("Consider reviewing your assumptions, exploring alternative financing, or seeking professional advice.");
    } else {
      assessment.push("Based on the provided inputs, the project appears to be **financially viable**.");
      if (annualCashFlowBeforeTax > 0) {
        assessment.push(`It is projected to generate a positive annual cash flow of ${formatCurrency(annualCashFlowBeforeTax)}.`);
      }
      if (totalROI !== null) {
        assessment.push(`The estimated total ROI over ${holdingPeriodYears} years is ${totalROI.toFixed(2)}%.`);
      }
      if (paybackPeriod !== null && paybackPeriod > 0) {
        assessment.push(`Your initial investment could be recouped in approximately ${paybackPeriod.toFixed(1)} years.`);
      }
      if (npv !== null && npv > 0) {
        assessment.push(`The Net Present Value (NPV) of ${formatCurrency(npv)} suggests a positive return when considering the time value of money.`);
      }
      assessment.push("This analysis provides a strong foundation for informed decision-making.");
    }

    return { assessment, redFlags };
  };

  const { assessment, redFlags } = getViabilityAssessment();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm text-blue-800">
        <h4 className="font-bold mb-2 flex items-center"><Lightbulb className="h-5 w-5 mr-2" /> Understanding Financial Feasibility</h4>
        <p className="mb-2">A thorough financial feasibility analysis is crucial for determining the economic viability and potential profitability of a real estate investment. It helps you understand the total capital outlay, projected returns, and inherent risks.</p>
        <p className="mb-2">This analysis goes beyond surface-level financial projections and delves into the underlying assumptions and risks that may impact the investment's performance. A comprehensive understanding enables informed decisions and successful real estate ventures.</p>
      </div>

      {/* Section: Evaluating Investment Costs */}
      <h3 className="text-xl font-bold text-gray-800 flex items-center"><DollarSign className="h-6 w-6 mr-2 text-primary" /> 1. Evaluate Investment Costs</h3>
      <p className="text-sm text-gray-600">Understanding the total capital outlay required for acquisition, development, and ongoing operations is essential for determining the project's financial viability.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="acquisitionCost" className="block text-sm font-medium text-gray-700 mb-1">Acquisition Cost (Purchase Price, KES)</label>
          <Input type="number" id="acquisitionCost" value={acquisitionCost} onChange={(e) => setAcquisitionCost(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="developmentCost" className="block text-sm font-medium text-gray-700 mb-1">Development/Renovation Cost (KES)</label>
          <Input type="number" id="developmentCost" value={developmentCost} onChange={(e) => setDevelopmentCost(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="otherInitialCosts" className="block text-sm font-medium text-gray-700 mb-1">Other Initial Costs (Legal, Closing, KES)</label>
          <Input type="number" id="otherInitialCosts" value={otherInitialCosts} onChange={(e) => setOtherInitialCosts(Number(e.target.value))} />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600">Total Initial Investment:</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(totalInitialInvestment)}</p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Section: Financing Details */}
      <h3 className="text-xl font-bold text-gray-800 flex items-center"><Landmark className="h-6 w-6 mr-2 text-primary" /> 2. Financing Details</h3>
      <p className="text-sm text-gray-600">Input your loan specifics to calculate debt service.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (KES)</label>
          <Input type="number" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="loanInterestRate" className="block text-sm font-medium text-gray-700 mb-1">Loan Annual Interest Rate (%)</label>
          <Input type="number" id="loanInterestRate" value={loanInterestRate} onChange={(e) => setLoanInterestRate(Number(e.target.value))} step="0.1" />
        </div>
        <div>
          <label htmlFor="loanTermYears" className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
          <Input type="number" id="loanTermYears" value={loanTermYears} onChange={(e) => setLoanTermYears(Number(e.target.value))} min="1" />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600">Estimated Monthly Debt Service:</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(monthlyDebtService)}</p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Section: Projecting Cash Flows */}
      <h3 className="text-xl font-bold text-gray-800 flex items-center"><PiggyBank className="h-6 w-6 mr-2 text-primary" /> 3. Project Cash Flows</h3>
      <p className="text-sm text-gray-600">Analyzing projected cash flows is central to understanding the investment's income potential and ability to generate positive returns over time.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="monthlyRentalIncomePerUnit" className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent Per Unit (KES)</label>
          <Input type="number" id="monthlyRentalIncomePerUnit" value={monthlyRentalIncomePerUnit} onChange={(e) => setMonthlyRentalIncomePerUnit(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="numberOfUnits" className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
          <Input type="number" id="numberOfUnits" value={numberOfUnits} onChange={(e) => setNumberOfUnits(Number(e.target.value))} min="1" />
        </div>
        <div>
          <label htmlFor="vacancyRate" className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
          <Input type="number" id="vacancyRate" value={vacancyRate} onChange={(e) => setVacancyRate(Number(e.target.value))} min="0" max="100" />
        </div>
        <div>
          <label htmlFor="annualOperatingExpenses" className="block text-sm font-medium text-gray-700 mb-1">Annual Operating Expenses (KES, excl. Debt)</label>
          <Input type="number" id="annualOperatingExpenses" value={annualOperatingExpenses} onChange={(e) => setAnnualOperatingExpenses(Number(e.target.value))} />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600">Annual Net Operating Income (NOI):</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(netOperatingIncomeAnnual)}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600">Annual Cash Flow (Before Tax):</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(annualCashFlowBeforeTax)}</p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Section: Assessing Return Metrics & Exit Strategy */}
      <h3 className="text-xl font-bold text-gray-800 flex items-center"><TrendingUp className="h-6 w-6 mr-2 text-primary" /> 4. Assess Returns & Exit Strategy</h3>
      <p className="text-sm text-gray-600">Return metrics are vital for evaluating the investment's potential profitability and comparing different investment opportunities. Developing a well-defined exit strategy is essential for planning how and when investors can realize their returns.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="holdingPeriodYears" className="block text-sm font-medium text-gray-700 mb-1">Holding Period (Years)</label>
          <Input type="number" id="holdingPeriodYears" value={holdingPeriodYears} onChange={(e) => setHoldingPeriodYears(Number(e.target.value))} min="1" />
        </div>
        <div>
          <label htmlFor="expectedSalePrice" className="block text-sm font-medium text-gray-700 mb-1">Expected Sale Price (at end of holding period, KES)</label>
          <Input type="number" id="expectedSalePrice" value={expectedSalePrice} onChange={(e) => setExpectedSalePrice(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-1">Discount Rate for NPV (%)</label>
          <Input type="number" id="discountRate" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} step="0.1" />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-semibold text-lg text-gray-900 mb-3">Key Metrics:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Capitalization Rate (Cap Rate):</p>
            <p className="text-xl font-bold text-red-600">{capRate !== null ? `${capRate.toFixed(2)}%` : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cash-on-Cash Return:</p>
            <p className="text-xl font-bold text-red-600">{cashOnCashReturn !== null ? `${cashOnCashReturn.toFixed(2)}%` : 'N/A'}</p>
            {(totalInitialInvestment - loanAmount) <= 0 && <p className="text-xs text-gray-500">Equity investment is zero or negative, Cash-on-Cash not applicable.</p>}
          </div>
          <div>
            <p className="text-sm text-gray-600">Payback Period:</p>
            <p className="text-xl font-bold text-red-600">{paybackPeriod !== null && paybackPeriod > 0 ? `${paybackPeriod.toFixed(1)} Years` : 'N/A (or no positive cash flow)'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Return on Investment (ROI):</p>
            <p className="text-xl font-bold text-red-600">{totalROI !== null ? `${totalROI.toFixed(2)}%` : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Present Value (NPV):</p>
            <p className="text-xl font-bold text-red-600">{npv !== null ? formatCurrency(npv) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Internal Rate of Return (IRR):</p>
            <p className="text-xl font-bold text-gray-500">{irr !== null ? `${irr.toFixed(2)}%` : 'N/A (Advanced)'}</p>
            <p className="text-xs text-gray-500">For precise IRR, consider professional tools.</p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Section: Project Viability Assessment */}
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Lightbulb className="h-6 w-6 mr-2 text-primary" /> Project Viability Assessment
      </h3>
      <div className={`p-4 rounded-md ${redFlags.length > 0 ? 'bg-red-100 border border-red-400 text-red-800' : 'bg-green-100 border border-green-400 text-green-800'}`}>
        <ul className="list-disc list-inside space-y-1">
          {assessment.map((line, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: line }}></li>
          ))}
        </ul>
      </div>

      {/* Section: Specific Risks to Monitor */}
      <h3 className="text-xl font-bold text-gray-800 flex items-center"><AlertCircle className="h-6 w-6 mr-2 text-primary" /> Specific Risks to Monitor</h3>
      <p className="text-sm text-gray-600">Investors should pay close attention to specific risks that could impact the financial feasibility of their real estate investment, including:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm bg-gray-50 p-4 rounded-md border border-gray-200">
        <li>**Revenue Projections:** Review the projected revenues from various income streams (e.g., rental income, sales of units).</li>
        <li>**Operating Expenses:** Analyze projected operating expenses (e.g., property management, maintenance, utilities, insurance, marketing).</li>
        <li>**Cash Flow Analysis:** Evaluate cash flow projections for the entire holding period. Ensure sufficient positive cash flow to cover expenses and debt service.</li>
        <li>**Profitability Metrics:** Calculate and compare key profitability metrics (NOI, Cash-on-Cash Return, IRR, Equity Multiple) to your return thresholds.</li>
        <li>**Capital Structure:** Examine the project's financing structure (equity/debt mix) and assess the impact of interest rates and loan terms.</li>
        <li>**Sensitivity Analysis:** Conduct a sensitivity analysis to understand how changes in key assumptions (e.g., rental rates, occupancy, construction costs) affect financial outcomes.</li>
        <li>**Investment Timeline:** Determine the expected timeline from development to stabilization and calculate holding period returns.</li>
        <li>**Return on Investment:** Evaluate the ROI over the holding period, considering both income generated and potential capital appreciation.</li>
        <li>**Market Comparables:** Compare the project's financial performance with similar developments in the area to assess its competitive position.</li>
        <li>**Break-Even Analysis:** Determine the level of occupancy or sales needed to cover all costs and achieve a breakeven point.</li>
        <li className="font-bold text-red-700 mt-4">Red Flags to Watch For:</li>
        <ul className="list-disc list-inside ml-4 space-y-1">
            <li>**Negative Cash Flow:** Consistently negative cash flow projections.</li>
            <li>**Unrealistic Revenue Projections:** Overly optimistic revenue projections not supported by market data.</li>
            <li>**Insufficient Profitability Metrics:** Return metrics below required thresholds.</li>
            <li>**Excessive Debt:** High leverage and substantial debt service obligations.</li>
            <li>**Weak Market Demand:** Projections showing weak demand for the project's components.</li>
            <li>**Significant Cost Overruns:** Inadequate budgeting or frequent cost overruns.</li>
            <li>**Long Stabilization Period:** A prolonged timeline to achieve stabilized occupancy or sales.</li>
            <li>**Unfavorable Market Comparables:** Below-average financial performance compared to similar projects.</li>
            <li>**Limited Exit Options:** Difficulties in identifying viable exit strategies.</li>
        </ul>
      </ul>
    </div>
  );
};


// --- Main Calculators Page Component ---
type CalculatorType =
  | 'mortgage'
  | 'simple-rental-property' // Renamed from investment-property
  | 'property-valuation'
  | 'investment-feasibility'
  | 'secret';

interface CalculatorInfo {
  title: string;
  description: string;
  component: React.FC;
  icon: React.ElementType;
}

const calculators: Record<CalculatorType, CalculatorInfo> = {
  'mortgage': {
    title: 'Enhanced Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and get payment breakdowns with fun easter eggs.',
    component: MortgageCalculator,
    icon: Home,
  },
  'simple-rental-property': { // Updated key and title
    title: 'Simple Rental Property Analyzer',
    description: 'Quickly analyze basic rental property viability, including cash flow, capitalization rate, and investment grade.',
    component: SimpleRentalPropertyCalculator, // Updated component
    icon: Building,
  },
  'property-valuation': {
    title: 'Advanced Property Valuation',
    description: 'Sophisticated valuation with confidence levels and price-per-square-foot analysis.',
    component: PropertyValuationCalculator,
    icon: Scale,
  },
  'investment-feasibility': {
    title: 'Comprehensive Investment Feasibility',
    description: 'Conduct a thorough financial feasibility analysis for real estate investments, including ROI, payback period, NPV, and viability assessment.',
    component: InvestmentFeasibilityCalculator,
    icon: LineChart,
  },
  'secret': {
    title: '☕ Secret Coffee Calculator',
    description: 'The legendary coffee-powered property calculator. Use the Konami Code to unlock!',
    // Do not assign SecretCalculator here, will render directly with props
    component: (() => null) as React.FC, // placeholder, never rendered
    icon: Coffee,
  },
};

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showSecretCalculator, coffeeCount, setCoffeeCount, motivationalQuote } = useEasterEggs();

  // Effect to handle URL parameters for direct linking to tabs
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as CalculatorType;
    if (tabParam && calculators[tabParam]) {
      setActiveTab(tabParam);
      setIsModalOpen(true); // Open modal if tab param is present
    }
  }, []);

  // Effect to update meta tags based on activeTab
  useEffect(() => {
    if (activeTab && calculators[activeTab]) {
      const info = calculators[activeTab];
      document.title = `${info.title} | Vineyard Properties Calculators`;
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', info.description);

      // Update URL without reloading the page
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('tab', activeTab);
      window.history.replaceState({}, '', newUrl.toString());
    } else {
      // Default meta tags when no specific calculator is active
      document.title = 'Real Estate Calculators | Vineyard Properties';
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', 'Utilize our comprehensive suite of real estate calculators for mortgage, investment, valuation, and more. Make informed property decisions with ease.');

      // Clear tab parameter if no tab is active
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('tab');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [activeTab]);

  const handleTabClick = (tab: CalculatorType) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveTab(null); // Reset active tab when modal closes
    // Also clear tab param from URL when modal closes
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('tab');
    window.history.replaceState({}, '', newUrl.toString());
  }, []);

  const ActiveCalculatorComponent = activeTab ? calculators[activeTab].component : null;
  const modalTitle = activeTab ? calculators[activeTab].title : '';

  return (
    <div className="min-h-screen bg-black text-black flex flex-col">
                            <Header />
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 p-10">
          Smart Real Estate Decisions, Made Easy.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock the power of data with our comprehensive suite of real estate calculators.
          Whether you're buying, selling, or investing, get the insights you need instantly.
        </p>
      </header>

      <section className="max-w-6xl mx-auto">
        <Card className="p-8">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-red-700">Choose Your Calculator</CardTitle>
            <p className="text-gray-600 mt-2">Click on any calculator below to get started.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(calculators).map(([key, info]) => {
                // Do not render the secret calculator button unless unlocked
                if (key === 'secret' && !showSecretCalculator) return null;

                const Icon = info.icon;
                return (
                  <Button
                    key={key}
                    onClick={() => handleTabClick(key as CalculatorType)}
                    variant="outline"
                    className="flex flex-col items-center justify-center p-6 h-auto text-center hover:bg-red-50 hover:border-red-300 transition-all duration-200 group"
                  >
                    <Icon className="h-10 w-10 text-red-600 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-semibold text-gray-800 group-hover:text-red-700">{info.title}</span>
                    <p className="text-sm text-gray-500 mt-1">{info.description.split('.')[0]}.</p> {/* Shorten description for button */}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
      {(activeTab && isModalOpen) && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
        >
          {activeTab === 'secret' ? (
            <>
              <SecretCalculator coffeeCount={coffeeCount} setCoffeeCount={setCoffeeCount} />
              {motivationalQuote && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg text-center">
                  <Lightbulb className="inline-block h-6 w-6 text-purple-600 mr-2" />
                  <span className="font-semibold text-purple-800">{motivationalQuote}</span>
                </div>
              )}
            </>
          ) : (
            ActiveCalculatorComponent && React.createElement(ActiveCalculatorComponent)
          )}
        </Modal>
      )}

      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vineyard Properties. All rights reserved.</p>
      </footer>
    </div>
    <Footer/>
    </div>
  );
}