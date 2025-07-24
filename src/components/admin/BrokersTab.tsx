'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Phone,
  Mail,
  Star,
  Award,
  Eye,
  Edit,
  Plus,
  Download
} from 'lucide-react';

interface Broker {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  region: string;
  totalSales: number;
  totalPayout: number;
  commissionRate: number;
  landsSold: number;
  rating: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  lastSale: string;
  specialization: string[];
}

interface BrokerSale {
  id: string;
  brokerId: string;
  brokerName: string;
  customerName: string;
  plotNo: string;
  landBlock: string;
  saleAmount: number;
  commission: number;
  saleDate: string;
  status: 'Completed' | 'Pending' | 'Processing';
}

export default function BrokersTab() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [brokerSales, setBrokerSales] = useState<BrokerSale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  useEffect(() => {
    const mockBrokers: Broker[] = [
      {
        id: '1',
        name: 'Samuel Kiprotich',
        email: 'samuel.k@email.com',
        phone: '+254722123456',
        location: 'Nakuru',
        region: 'Rift Valley',
        totalSales: 45000000,
        totalPayout: 2250000,
        commissionRate: 5,
        landsSold: 18,
        rating: 4.8,
        status: 'Active',
        joinDate: '2023-03-15',
        lastSale: '2024-01-14',
        specialization: ['Residential Land', 'Agricultural Land']
      },
      {
        id: '2',
        name: 'Grace Wanjiku',
        email: 'grace.w@email.com',
        phone: '+254733987654',
        location: 'Kiambu',
        region: 'Central Kenya',
        totalSales: 67000000,
        totalPayout: 3350000,
        commissionRate: 5,
        landsSold: 25,
        rating: 4.9,
        status: 'Active',
        joinDate: '2022-11-20',
        lastSale: '2024-01-16',
        specialization: ['Luxury Properties', 'Commercial Land']
      },
      {
        id: '3',
        name: 'David Mwangi',
        email: 'david.m@email.com',
        phone: '+254744567890',
        location: 'Mombasa',
        region: 'Coast',
        totalSales: 32000000,
        totalPayout: 1600000,
        commissionRate: 5,
        landsSold: 12,
        rating: 4.6,
        status: 'Active',
        joinDate: '2023-07-10',
        lastSale: '2024-01-12',
        specialization: ['Coastal Properties', 'Tourism Land']
      },
      {
        id: '4',
        name: 'Mary Nyambura',
        email: 'mary.n@email.com',
        phone: '+254755123789',
        location: 'Eldoret',
        region: 'Rift Valley',
        totalSales: 28000000,
        totalPayout: 1400000,
        commissionRate: 5,
        landsSold: 11,
        rating: 4.4,
        status: 'Active',
        joinDate: '2023-05-22',
        lastSale: '2024-01-10',
        specialization: ['Agricultural Land', 'Residential Plots']
      },
      {
        id: '5',
        name: 'Joseph Mutua',
        email: 'joseph.m@email.com',
        phone: '+254766456123',
        location: 'Machakos',
        region: 'Eastern Kenya',
        totalSales: 15000000,
        totalPayout: 750000,
        commissionRate: 5,
        landsSold: 6,
        rating: 4.2,
        status: 'Inactive',
        joinDate: '2023-09-05',
        lastSale: '2023-12-20',
        specialization: ['Residential Land']
      }
    ];

    const mockBrokerSales: BrokerSale[] = [
      {
        id: '1',
        brokerId: '1',
        brokerName: 'Samuel Kiprotich',
        customerName: 'James Mwangi',
        plotNo: 'NAKURU-15-45',
        landBlock: 'NAKURU BLOCK 15',
        saleAmount: 2500000,
        commission: 125000,
        saleDate: '2024-01-14',
        status: 'Completed'
      },
      {
        id: '2',
        brokerId: '2',
        brokerName: 'Grace Wanjiku',
        customerName: 'Peter Kamau',
        plotNo: 'KIAMBU-22-78',
        landBlock: 'KIAMBU BLOCK 22',
        saleAmount: 4200000,
        commission: 210000,
        saleDate: '2024-01-16',
        status: 'Completed'
      },
      {
        id: '3',
        brokerId: '3',
        brokerName: 'David Mwangi',
        customerName: 'Sarah Njoki',
        plotNo: 'MOMBASA-8-33',
        landBlock: 'MOMBASA COASTAL BLOCK 8',
        saleAmount: 3800000,
        commission: 190000,
        saleDate: '2024-01-12',
        status: 'Processing'
      }
    ];

    setBrokers(mockBrokers);
    setBrokerSales(mockBrokerSales);
  }, []);

  // Filter brokers
  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || broker.region === selectedRegion;
    const matchesStatus = selectedStatus === 'all' || broker.status === selectedStatus;
    
    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Calculate totals
  const totalBrokers = brokers.length;
  const activeBrokers = brokers.filter(b => b.status === 'Active').length;
  const totalSalesValue = brokers.reduce((sum, b) => sum + b.totalSales, 0);
  const totalPayouts = brokers.reduce((sum, b) => sum + b.totalPayout, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Broker Management</h2>
          <p className="text-gray-600">Manage external land agents and track their performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Broker
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Brokers</p>
                <p className="text-2xl font-bold text-gray-900">{totalBrokers}</p>
                <p className="text-xs text-green-600 mt-1">{activeBrokers} active</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalSalesValue)}
                </p>
                <p className="text-xs text-green-600 mt-1">Through brokers</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payouts</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalPayouts)}
                </p>
                <p className="text-xs text-red-600 mt-1">Commission paid</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Commission</p>
                <p className="text-2xl font-bold text-purple-600">5.0%</p>
                <p className="text-xs text-purple-600 mt-1">Standard rate</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search brokers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Regions</option>
              <option value="Central Kenya">Central Kenya</option>
              <option value="Rift Valley">Rift Valley</option>
              <option value="Coast">Coast</option>
              <option value="Eastern Kenya">Eastern Kenya</option>
              <option value="Western Kenya">Western Kenya</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredBrokers.length} of {totalBrokers} brokers
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brokers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrokers.map((broker) => (
          <Card key={broker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{broker.name}</CardTitle>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {broker.location}, {broker.region}
                  </p>
                </div>
                <Badge className={getStatusColor(broker.status)}>
                  {broker.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {broker.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {broker.email}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(broker.rating)}
                  </div>
                  <span className="text-sm font-medium">{broker.rating}</span>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{broker.landsSold}</p>
                    <p className="text-xs text-gray-600">Lands Sold</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {(broker.totalSales / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-gray-600">Total Sales</p>
                  </div>
                </div>

                {/* Financial Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Payout:</span>
                    <span className="font-medium">{formatCurrency(broker.totalPayout)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commission Rate:</span>
                    <span className="font-medium">{broker.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Sale:</span>
                    <span className="font-medium">{broker.lastSale}</span>
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Specialization:</p>
                  <div className="flex flex-wrap gap-1">
                    {broker.specialization.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Broker Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Broker Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Broker</th>
                  <th className="text-left p-3 font-medium text-gray-600">Customer</th>
                  <th className="text-left p-3 font-medium text-gray-600">Plot</th>
                  <th className="text-left p-3 font-medium text-gray-600">Sale Amount</th>
                  <th className="text-left p-3 font-medium text-gray-600">Commission</th>
                  <th className="text-left p-3 font-medium text-gray-600">Date</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {brokerSales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{sale.brokerName}</td>
                    <td className="p-3">{sale.customerName}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{sale.plotNo}</p>
                        <p className="text-xs text-gray-500">{sale.landBlock}</p>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{formatCurrency(sale.saleAmount)}</td>
                    <td className="p-3 font-medium text-green-600">{formatCurrency(sale.commission)}</td>
                    <td className="p-3">{sale.saleDate}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(sale.status)}>
                        {sale.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}