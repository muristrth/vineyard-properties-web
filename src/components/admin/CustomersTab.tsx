'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  FileText,
  User,
  CreditCard
} from 'lucide-react';

// Land blocks data structure based on your Excel
const landBlocks = [
  'KAMULU BLOCK 3/2069',
  'UTAWALA BLOCK 7340-160',
  'KITENGELA BLOCK 2-13299',
  'KITENGELA BLOCK 3-4372',
  'KITENGELA BLOCK 5-26510',
  'KITENGELA BLOCK 6-21196',
  'KITENGELA BLOCK 7-33852',
  'KITENGELA BLOCK 8-42337',
  'KITENGELA BLOCK 9-40584',
  'KITENGELA BLOCK 10-2720',
  'KITENGELA BLOCK 11-29117',
  'KITENGELA BLOCK 12-285',
  'NGONG BLOCK 4669-KIBIKO',
  'NGONG BLOCK 4-27850',
  'JOSKA BLOCK 1-5500',
  'JOSKA BLOCK 2-7800',
  'MACHAKOS BLOCK 1-3400',
  'MACHAKOS BLOCK 2-5600',
  'SYOKIMAU BLOCK 1-8900',
  'SYOKIMAU BLOCK 2-12000'
];

// Mock customer data structure
interface Customer {
  id: string;
  plotNo: string;
  date: string;
  name: string;
  idNo: string;
  address: string;
  telNo: string;
  titleNo: string;
  email: string;
  landBlock: string;
  purchaseAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  kraPin: string;
  nextOfKin: string;
  registrationDate: string;
}

export default function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data - in real app, fetch from Firebase
  useEffect(() => {
    // This would be replaced with Firebase data fetching
    const mockCustomers: Customer[] = [
      {
        id: '1',
        plotNo: '12715-111',
        date: '2024-01-15',
        name: 'JOHN KAMAU MWANGI',
        idNo: '12715243',
        address: 'NAIROBI, KASARANI',
        telNo: '+254722123456',
        titleNo: 'KAMULU/12715/688',
        email: 'john.kamau@email.com',
        landBlock: 'KAMULU BLOCK 3/2069',
        purchaseAmount: 1200000,
        paymentStatus: 'Paid',
        kraPin: 'A001234567P',
        nextOfKin: 'MARY KAMAU',
        registrationDate: '2024-01-15'
      },
      // Add more mock customers for different blocks
      ...Array.from({ length: 50 }, (_, i) => ({
        id: (i + 2).toString(),
        plotNo: `${12715 + i}-${111 + i}`,
        date: `2024-0${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        name: `CUSTOMER ${i + 2}`,
        idNo: `${12715000 + i}`,
        address: `ADDRESS ${i + 2}`,
        telNo: `+25472${Math.floor(Math.random() * 10000000)}`,
        titleNo: `TITLE/${12715 + i}/${688 + i}`,
        email: `customer${i + 2}@email.com`,
        landBlock: landBlocks[Math.floor(Math.random() * landBlocks.length)],
        purchaseAmount: Math.floor(Math.random() * 3000000) + 500000,
        paymentStatus: ['Paid', 'Pending', 'Partial'][Math.floor(Math.random() * 3)] as any,
        kraPin: `A${String(i).padStart(9, '0')}P`,
        nextOfKin: `NEXT OF KIN ${i + 2}`,
        registrationDate: `2024-0${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
      }))
    ];
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  // Filter customers based on search and filters
  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.plotNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.idNo.includes(searchTerm)
      );
    }

    if (selectedBlock !== 'all') {
      filtered = filtered.filter(customer => customer.landBlock === selectedBlock);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(customer => customer.paymentStatus === selectedStatus);
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedBlock, selectedStatus, customers]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Partial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Plot No', 'Name', 'ID No', 'Email', 'Phone', 'Land Block', 'Amount', 'Status'],
      ...filteredCustomers.map(customer => [
        customer.plotNo,
        customer.name,
        customer.idNo,
        customer.email,
        customer.telNo,
        customer.landBlock,
        customer.purchaseAmount.toString(),
        customer.paymentStatus
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Manage all customer information and land purchases</p>
        </div>
        <Button onClick={exportToCSV} className="bg-red-600 hover:bg-red-700">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Customers</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter(c => c.paymentStatus === 'Paid').length}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {customers.filter(c => c.paymentStatus === 'Pending').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Land Blocks</p>
                <p className="text-2xl font-bold text-purple-600">{landBlocks.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Land Blocks</option>
              {landBlocks.map(block => (
                <option key={block} value={block}>{block}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
            </select>

            <div className="flex items-center text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Plot No</th>
                  <th className="text-left p-3 font-medium text-gray-600">Customer Name</th>
                  <th className="text-left p-3 font-medium text-gray-600">Contact</th>
                  <th className="text-left p-3 font-medium text-gray-600">Land Block</th>
                  <th className="text-left p-3 font-medium text-gray-600">Amount</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{customer.plotNo}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">ID: {customer.idNo}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.telNo}
                        </div>
                        <div className="flex items-center text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs">
                        <p className="font-medium">{customer.landBlock}</p>
                        <p className="text-gray-500">Title: {customer.titleNo}</p>
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      KES {customer.purchaseAmount.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(customer.paymentStatus)}>
                        {customer.paymentStatus}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}