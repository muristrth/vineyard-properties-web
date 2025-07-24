'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  DollarSign, 
  Target, 
  UserCheck, 
  FileText,
  Menu,
  X
} from 'lucide-react';

// Import all tab components
import DashboardOverview from './DashboardOverview';
import CustomersTab from './CustomersTab';
import LandAssetsTab from './LandAssetsTab';
import AccountingTab from './AccountingTab';
import MarketingTab from './MarketingTab';
import BrokersTab from './BrokersTab';
import ReportsTab from './ReportsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, component: DashboardOverview },
    { id: 'customers', label: 'Customers', icon: Users, component: CustomersTab },
    { id: 'land-assets', label: 'Land Assets', icon: MapPin, component: LandAssetsTab },
    { id: 'accounting', label: 'Accounting', icon: DollarSign, component: AccountingTab },
    { id: 'marketing', label: 'Marketing', icon: Target, component: MarketingTab },
    { id: 'brokers', label: 'Brokers', icon: UserCheck, component: BrokersTab },
    { id: 'reports', label: 'Reports', icon: FileText, component: ReportsTab },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DashboardOverview;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${activeTab === tab.id
                      ? 'bg-red-100 text-red-700 border-r-2 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
}