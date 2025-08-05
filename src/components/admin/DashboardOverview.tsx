'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  DollarSign, 
  FileText, 
  UserCheck,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Plus
} from 'lucide-react';

// Mock data - replace with real Firebase data
const mockData = {
  totalRevenue: 2450000000, // 2.45B KES
  totalProfit: 850000000,   // 850M KES
  totalCosts: 1600000000,   // 1.6B KES
  totalCustomers: 2847,
  totalLandAssets: 156,
  activeBrokers: 23,
  monthlyGrowth: 12.5,
  recentSales: [
    { id: 1, customer: 'John Kamau', property: 'Kamulu Block 3 Plot 15', amount: 1200000, date: '2025-01-15' },
    { id: 2, customer: 'Mary Wanjiku', property: 'Utawala Block 7340 Plot 8', amount: 2800000, date: '2025-01-14' },
    { id: 3, customer: 'Peter Mwangi', property: 'Kitengela Block 2 Plot 22', amount: 950000, date: '2025-01-13' },
  ]
};

export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('30d');

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `KES ${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `KES ${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `KES ${amount.toLocaleString()}`;
    }
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(mockData.totalRevenue),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Profit',
      value: formatCurrency(mockData.totalProfit),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Customers',
      value: mockData.totalCustomers.toLocaleString(),
      change: '+156',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Land Assets',
      value: mockData.totalLandAssets.toString(),
      change: '+3',
      changeType: 'positive' as const,
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Active Brokers',
      value: mockData.activeBrokers.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total Costs',
      value: formatCurrency(mockData.totalCosts),
      change: '+5.1%',
      changeType: 'neutral' as const,
      icon: FileText,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const quickActions = [
    { label: 'Add New Customer', icon: Plus, action: () => console.log('Add customer') },
    { label: 'Generate Report', icon: FileText, action: () => console.log('Generate report') },
    { label: 'Export Data', icon: Download, action: () => console.log('Export data') },
    { label: 'View Analytics', icon: BarChart3, action: () => console.log('View analytics') }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <p className={`text-sm mt-1 ${
                    kpi.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {kpi.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart will be displayed here</p>
                <p className="text-sm text-gray-400">Integration with Chart.js or similar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Sales by Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sales distribution chart</p>
                <p className="text-sm text-gray-400">Kamulu, Utawala, Kitengela breakdown</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.customer}</p>
                    <p className="text-sm text-gray-600">{sale.property}</p>
                    <p className="text-xs text-gray-500">{sale.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(sale.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={action.action}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}