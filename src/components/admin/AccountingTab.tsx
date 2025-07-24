'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Receipt,
  CreditCard,
  FileText,
  Download,
  Calendar,
  Filter,
  Plus,
  Eye
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  amount: number;
  customer?: string;
  plotNo?: string;
  status: 'Completed' | 'Pending' | 'Failed';
  paymentMethod: string;
}

interface Invoice {
  id: string;
  invoiceNo: string;
  customer: string;
  plotNo: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  createdDate: string;
}

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
}

export default function AccountingTab() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [dateRange, setDateRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        date: '2024-01-15',
        type: 'Income',
        category: 'Land Sales',
        description: 'Plot sale - Kamulu Block 3',
        amount: 1200000,
        customer: 'John Kamau',
        plotNo: '12715-111',
        status: 'Completed',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: '2',
        date: '2024-01-14',
        type: 'Income',
        category: 'Land Sales',
        description: 'Plot sale - Utawala Block 7340',
        amount: 2800000,
        customer: 'Mary Wanjiku',
        plotNo: '7340-201',
        status: 'Completed',
        paymentMethod: 'Cash'
      },
      {
        id: '3',
        date: '2024-01-13',
        type: 'Expense',
        category: 'Marketing',
        description: 'Digital advertising campaign',
        amount: 150000,
        status: 'Completed',
        paymentMethod: 'Credit Card'
      },
      {
        id: '4',
        date: '2024-01-12',
        type: 'Expense',
        category: 'Operations',
        description: 'Office rent payment',
        amount: 200000,
        status: 'Completed',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: '5',
        date: '2024-01-11',
        type: 'Expense',
        category: 'Legal',
        description: 'Title processing fees',
        amount: 75000,
        status: 'Pending',
        paymentMethod: 'Cheque'
      }
    ];

    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoiceNo: 'INV-2024-001',
        customer: 'Peter Mwangi',
        plotNo: 'KITE-2-22',
        amount: 950000,
        dueDate: '2024-02-15',
        status: 'Pending',
        createdDate: '2024-01-15'
      },
      {
        id: '2',
        invoiceNo: 'INV-2024-002',
        customer: 'Sarah Njeri',
        plotNo: 'NGONG-4669-15',
        amount: 1800000,
        dueDate: '2024-01-20',
        status: 'Overdue',
        createdDate: '2024-01-10'
      },
      {
        id: '3',
        invoiceNo: 'INV-2024-003',
        customer: 'David Kiprotich',
        plotNo: 'KAMULU-3-25',
        amount: 1200000,
        dueDate: '2024-01-25',
        status: 'Paid',
        createdDate: '2024-01-12'
      }
    ];

    const mockBudgets: Budget[] = [
      {
        id: '1',
        category: 'Marketing',
        allocated: 2000000,
        spent: 1200000,
        remaining: 800000,
        period: 'Q1 2024'
      },
      {
        id: '2',
        category: 'Operations',
        allocated: 5000000,
        spent: 3200000,
        remaining: 1800000,
        period: 'Q1 2024'
      },
      {
        id: '3',
        category: 'Legal & Compliance',
        allocated: 1500000,
        spent: 900000,
        remaining: 600000,
        period: 'Q1 2024'
      },
      {
        id: '4',
        category: 'Technology',
        allocated: 1000000,
        spent: 450000,
        remaining: 550000,
        period: 'Q1 2024'
      }
    ];

    setTransactions(mockTransactions);
    setInvoices(mockInvoices);
    setBudgets(mockBudgets);
  }, []);

  // Calculate financial metrics
  const totalIncome = transactions
    .filter(t => t.type === 'Income' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const pendingInvoices = invoices.filter(i => i.status === 'Pending').length;
  const overdueInvoices = invoices.filter(i => i.status === 'Overdue').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Accounting & Finance</h2>
          <p className="text-gray-600">Manage transactions, invoices, and budgets</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </p>
                <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpenses)}
                </p>
                <p className="text-xs text-red-600 mt-1">+5.2% from last month</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(netProfit)}
                </p>
                <p className="text-xs text-blue-600 mt-1">+18.3% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingInvoices}</p>
                <p className="text-xs text-red-600 mt-1">{overdueInvoices} overdue</p>
              </div>
              <Receipt className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Land Sales">Land Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Legal">Legal</option>
                </select>

                <Input placeholder="Search transactions..." />

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Date</th>
                      <th className="text-left p-3 font-medium text-gray-600">Type</th>
                      <th className="text-left p-3 font-medium text-gray-600">Description</th>
                      <th className="text-left p-3 font-medium text-gray-600">Category</th>
                      <th className="text-left p-3 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-3 font-medium text-gray-600">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{transaction.date}</td>
                        <td className="p-3">
                          <Badge className={transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {transaction.type}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            {transaction.customer && (
                              <p className="text-xs text-gray-500">{transaction.customer} - {transaction.plotNo}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">{transaction.category}</td>
                        <td className="p-3 font-medium">
                          <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Invoice Management</CardTitle>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Invoice No</th>
                      <th className="text-left p-3 font-medium text-gray-600">Customer</th>
                      <th className="text-left p-3 font-medium text-gray-600">Plot No</th>
                      <th className="text-left p-3 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-3 font-medium text-gray-600">Due Date</th>
                      <th className="text-left p-3 font-medium text-gray-600">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{invoice.invoiceNo}</td>
                        <td className="p-3">{invoice.customer}</td>
                        <td className="p-3">{invoice.plotNo}</td>
                        <td className="p-3 font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="p-3">{invoice.dueDate}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
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

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgets.map((budget) => (
                  <div key={budget.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{budget.category}</h3>
                        <p className="text-sm text-gray-600">{budget.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {((budget.spent / budget.allocated) * 100).toFixed(1)}% used
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (budget.spent / budget.allocated) > 0.9 ? 'bg-red-600' :
                          (budget.spent / budget.allocated) > 0.7 ? 'bg-yellow-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min((budget.spent / budget.allocated) * 100, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Remaining: {formatCurrency(budget.remaining)}</span>
                      <span className={`font-medium ${
                        budget.remaining < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {budget.remaining < 0 ? 'Over budget' : 'Within budget'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Financial Statement</h3>
                <p className="text-sm text-gray-600 mb-4">Comprehensive financial overview</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Profit & Loss</h3>
                <p className="text-sm text-gray-600 mb-4">Revenue and expense analysis</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Receipt className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Tax Report</h3>
                <p className="text-sm text-gray-600 mb-4">Tax compliance documentation</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}