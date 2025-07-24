'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  MapPin,
  Clock,
  Filter,
  Eye,
  RefreshCw
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'Financial' | 'Sales' | 'Customer' | 'Marketing' | 'Broker' | 'Land Assets';
  description: string;
  lastGenerated: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly' | 'On-Demand';
  status: 'Ready' | 'Generating' | 'Scheduled' | 'Failed';
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
}

interface ScheduledReport {
  id: string;
  reportName: string;
  schedule: string;
  nextRun: string;
  recipients: string[];
  status: 'Active' | 'Paused';
}

export default function ReportsTab() {
  const [reports, setReports] = useState<Report[]>([]);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  // Mock data
  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Monthly Financial Statement',
        type: 'Financial',
        description: 'Comprehensive financial overview including revenue, expenses, and profit margins',
        lastGenerated: '2024-01-15 09:30',
        frequency: 'Monthly',
        status: 'Ready',
        size: '2.4 MB',
        format: 'PDF'
      },
      {
        id: '2',
        name: 'Sales Performance Report',
        type: 'Sales',
        description: 'Detailed analysis of sales performance by region, broker, and property type',
        lastGenerated: '2024-01-16 14:20',
        frequency: 'Weekly',
        status: 'Ready',
        size: '1.8 MB',
        format: 'Excel'
      },
      {
        id: '3',
        name: 'Customer Analytics Dashboard',
        type: 'Customer',
        description: 'Customer demographics, purchase patterns, and satisfaction metrics',
        lastGenerated: '2024-01-14 11:45',
        frequency: 'Monthly',
        status: 'Ready',
        size: '3.2 MB',
        format: 'PDF'
      },
      {
        id: '4',
        name: 'Marketing Campaign ROI',
        type: 'Marketing',
        description: 'Return on investment analysis for all marketing campaigns',
        lastGenerated: '2024-01-13 16:15',
        frequency: 'Monthly',
        status: 'Ready',
        size: '1.5 MB',
        format: 'PDF'
      },
      {
        id: '5',
        name: 'Broker Performance Summary',
        type: 'Broker',
        description: 'Individual broker performance metrics and commission tracking',
        lastGenerated: '2024-01-12 10:30',
        frequency: 'Monthly',
        status: 'Ready',
        size: '2.1 MB',
        format: 'Excel'
      },
      {
        id: '6',
        name: 'Land Assets Inventory',
        type: 'Land Assets',
        description: 'Complete inventory of all land assets with availability and valuation',
        lastGenerated: '2024-01-11 13:20',
        frequency: 'Quarterly',
        status: 'Ready',
        size: '4.7 MB',
        format: 'Excel'
      },
      {
        id: '7',
        name: 'Tax Compliance Report',
        type: 'Financial',
        description: 'Tax-related financial data for compliance and filing purposes',
        lastGenerated: '2024-01-10 08:45',
        frequency: 'Quarterly',
        status: 'Generating',
        size: '1.9 MB',
        format: 'PDF'
      },
      {
        id: '8',
        name: 'Daily Sales Summary',
        type: 'Sales',
        description: 'Daily breakdown of sales activities and transactions',
        lastGenerated: '2024-01-16 18:00',
        frequency: 'Daily',
        status: 'Ready',
        size: '0.8 MB',
        format: 'CSV'
      }
    ];

    const mockScheduledReports: ScheduledReport[] = [
      {
        id: '1',
        reportName: 'Monthly Financial Statement',
        schedule: 'First Monday of every month at 9:00 AM',
        nextRun: '2024-02-05 09:00',
        recipients: ['julia@vineyardproperties.co.ke', 'james@vineyardproperties.co.ke'],
        status: 'Active'
      },
      {
        id: '2',
        reportName: 'Weekly Sales Report',
        schedule: 'Every Monday at 8:00 AM',
        nextRun: '2024-01-22 08:00',
        recipients: ['mark.muriithi@vineyardproperties.co.ke'],
        status: 'Active'
      },
      {
        id: '3',
        reportName: 'Quarterly Tax Report',
        schedule: 'Last day of quarter at 5:00 PM',
        nextRun: '2024-03-31 17:00',
        recipients: ['julia@vineyardproperties.co.ke'],
        status: 'Active'
      }
    ];

    setReports(mockReports);
    setScheduledReports(mockScheduledReports);
  }, []);

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesFormat = selectedFormat === 'all' || report.format === selectedFormat;
    return matchesType && matchesFormat;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Generating': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Financial': return DollarSign;
      case 'Sales': return TrendingUp;
      case 'Customer': return Users;
      case 'Marketing': return BarChart3;
      case 'Broker': return Users;
      case 'Land Assets': return MapPin;
      default: return FileText;
    }
  };

  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading report ${reportId}`);
    // Simulate download
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`Downloading ${report.name} (${report.format})`);
    }
  };

  const handleGenerateReport = (reportId: string) => {
    // In a real app, this would trigger report generation
    console.log(`Generating report ${reportId}`);
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: 'Generating' as const }
        : report
    ));
    
    // Simulate generation completion after 3 seconds
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              status: 'Ready' as const, 
              lastGenerated: new Date().toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }).replace(',', '')
            }
          : report
      ));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Generate and download comprehensive business reports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready Reports</p>
                <p className="text-2xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'Ready').length}
                </p>
              </div>
              <Download className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{scheduledReports.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generating</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reports.filter(r => r.status === 'Generating').length}
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Types</option>
                  <option value="Financial">Financial</option>
                  <option value="Sales">Sales</option>
                  <option value="Customer">Customer</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Broker">Broker</option>
                  <option value="Land Assets">Land Assets</option>
                </select>

                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Formats</option>
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="CSV">CSV</option>
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>

                <div className="text-sm text-gray-600 flex items-center">
                  {filteredReports.length} reports available
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => {
              const IconComponent = getTypeIcon(report.type);
              return (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{report.name}</CardTitle>
                          <p className="text-sm text-gray-600">{report.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{report.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Generated:</span>
                          <span className="font-medium">{report.lastGenerated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Frequency:</span>
                          <span className="font-medium">{report.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span className="font-medium">{report.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">{report.size}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {report.status === 'Ready' ? (
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        ) : report.status === 'Generating' ? (
                          <Button size="sm" className="flex-1" disabled>
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                            Generating...
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleGenerateReport(report.id)}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Report Name</th>
                      <th className="text-left p-3 font-medium text-gray-600">Schedule</th>
                      <th className="text-left p-3 font-medium text-gray-600">Next Run</th>
                      <th className="text-left p-3 font-medium text-gray-600">Recipients</th>
                      <th className="text-left p-3 font-medium text-gray-600">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledReports.map((scheduled) => (
                      <tr key={scheduled.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{scheduled.reportName}</td>
                        <td className="p-3">{scheduled.schedule}</td>
                        <td className="p-3">{scheduled.nextRun}</td>
                        <td className="p-3">
                          <div className="space-y-1">
                            {scheduled.recipients.map((recipient, index) => (
                              <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {recipient}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(scheduled.status)}>
                            {scheduled.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue trends and forecasting</p>
                    <p className="text-sm text-gray-400">Monthly and quarterly analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Sales Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Sales by region and property type</p>
                    <p className="text-sm text-gray-400">Interactive breakdown charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">KPI tracking and benchmarks</p>
                    <p className="text-sm text-gray-400">Real-time performance indicators</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Customer Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Customer behavior and preferences</p>
                    <p className="text-sm text-gray-400">Segmentation and lifetime value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}