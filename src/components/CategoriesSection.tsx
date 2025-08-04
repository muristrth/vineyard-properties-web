import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  PieChart, 
  Building, 
  DollarSign,
  Users,
  Award,
  Eye,
  Lock,
  CheckCircle,
  BarChart3,
  Wallet,
  Calendar,
  MapPin,
  Star,
  Play,
  MousePointer
} from 'lucide-react';
import Link from 'next/link';
const portalFeatures = [
  {
    id: 'portfolio',
    icon: PieChart,
    title: 'Portfolio Overview',
    description: 'Real-time tracking of your property investments with detailed analytics',
    color: 'blue',
    stats: 'Track 100+ metrics'
  },
  {
    id: 'documents',
    icon: FileText,
    title: 'Land Documents',
    description: 'Secure digital storage of all property documents and certificates',
    color: 'green',
    stats: 'Bank-level security'
  },
  {
    id: 'loans',
    icon: CreditCard,
    title: 'Loan Management',
    description: 'Apply for property loans and track repayment schedules',
    color: 'purple',
    stats: 'Up to 90% financing'
  },
  {
    id: 'properties',
    icon: Building,
    title: 'Property Management',
    description: 'Manage all your purchased properties in one centralized dashboard',
    color: 'red',
    stats: 'Unlimited properties'
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Value Analytics',
    description: 'Track property value increases and market performance',
    color: 'yellow',
    stats: 'Real-time updates'
  },
  {
    id: 'payments',
    icon: Wallet,
    title: 'Payment Tracking',
    description: 'Monitor payment schedules, receipts, and financial history',
    color: 'indigo',
    stats: 'Automated alerts'
  }
];

const investorBenefits = [
  { icon: Shield, title: 'Secure Investment', description: 'Bank-grade security for all transactions' },
  { icon: TrendingUp, title: 'Growth Tracking', description: 'Monitor your portfolio performance' },
  { icon: Users, title: 'Expert Support', description: '24/7 dedicated investor support' },
  { icon: Award, title: 'Premium Access', description: 'Exclusive deals and early access' }
];

const loginSteps = [
  {
    step: 1,
    title: 'Create Account',
    description: 'Sign up with your email and verify your identity',
    icon: Users,
    color: 'blue'
  },
  {
    step: 2,
    title: 'Complete KYC',
    description: 'Upload required documents for verification',
    icon: FileText,
    color: 'green'
  },
  {
    step: 3,
    title: 'Fund Wallet',
    description: 'Add funds to start your investment journey',
    icon: Wallet,
    color: 'purple'
  },
  {
    step: 4,
    title: 'Start Investing',
    description: 'Browse and invest in premium properties',
    icon: Building,
    color: 'red'
  }
];

export default function InvestorPortalSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [isPortalDemo, setIsPortalDemo] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startPortalDemo = () => {
    setIsPortalDemo(true);
    setTimeout(() => setIsPortalDemo(false), 8000);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200',
      green: 'from-green-500 to-green-600 bg-green-50 text-green-600 border-green-200',
      purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200',
      red: 'from-red-500 to-red-600 bg-red-50 text-red-600 border-red-200',
      yellow: 'from-yellow-500 to-yellow-600 bg-yellow-50 text-yellow-600 border-yellow-200',
      indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-600 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl animate-bounce" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center animate-slideInUp">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg mb-6">
            <Shield className="mr-2 h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Investor Portal</span>
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              Investment
            </span>
            <br />
            Command Center
          </h2>
          
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 mb-8">
            Access your personalized investor dashboard with comprehensive portfolio management, 
            secure document storage, and real-time analytics to maximize your property investments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/investor" passHref legacyBehavior>
              <button
                className="group relative px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium overflow-hidden"
                type="button"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Access Investor Portal</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </Link>
            
            <button
              onClick={startPortalDemo}
              className="group border-2 border-gray-300 px-8 py-4 text-lg rounded-xl hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
                <MousePointer className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Portal Features Grid */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative transform transition-all duration-500 hover:scale-105 animate-slideInUp"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: hoveredFeature === feature.id 
                  ? `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * 2}deg) scale(1.05)` 
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
              }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-3xl transition-all duration-500 border border-white/20 p-8">
                {/* Portal Demo Overlay */}
                {isPortalDemo && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center z-10">
                    <div className="text-blue-600 text-center animate-pulse">
                      <Eye className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                      <p className="text-sm font-semibold">Portal Preview</p>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getColorClasses(feature.color).split(' ')[0]} ${getColorClasses(feature.color).split(' ')[1]} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getColorClasses(feature.color).split(' ')[2]} ${getColorClasses(feature.color).split(' ')[3]} ${getColorClasses(feature.color).split(' ')[4]}`}>
                      {feature.stats}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* 3D Floating Elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-float blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-float-delayed blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Getting Started Steps */}
        <div className="mb-16 animate-slideInUp delay-400">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                4 Simple Steps
              </span>
            </h3>
            <p className="text-xl text-gray-600">Join thousands of successful property investors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loginSteps.map((step, index) => (
              <div
                key={step.step}
                className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                  selectedStep === step.step 
                    ? 'bg-white shadow-xl scale-105' 
                    : 'bg-white/50 hover:bg-white/80 hover:shadow-lg'
                }`}
                onClick={() => setSelectedStep(step.step)}
              >
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r ${getColorClasses(step.color).split(' ')[0]} ${getColorClasses(step.color).split(' ')[1]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(step.color).split(' ')[0]} ${getColorClasses(step.color).split(' ')[1]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>

                {/* Progress Line */}
                {index < loginSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200">
                    <div className={`h-full bg-gradient-to-r ${getColorClasses(step.color).split(' ')[0]} ${getColorClasses(step.color).split(' ')[1]} transition-all duration-500 ${selectedStep > step.step ? 'w-full' : 'w-0'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16 animate-slideInUp delay-600">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our{' '}
              <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                Investor Portal
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investorBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slideInUp delay-800">
          {[
            { icon: Building, label: 'Properties Managed', value: '5,000+', color: 'blue' },
            { icon: Users, label: 'Active Investors', value: '2,500+', color: 'green' },
            { icon: TrendingUp, label: 'Average ROI', value: '15.2%', color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getColorClasses(stat.color).split(' ')[0]} ${getColorClasses(stat.color).split(' ')[1]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

            <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 1s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 2s ease-in-out infinite 1s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </section>
  );
}