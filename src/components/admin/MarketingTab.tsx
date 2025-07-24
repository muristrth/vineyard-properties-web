'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Users, 
  TrendingUp,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  BarChart3,
  Eye,
  Edit,
  Plus,
  Download,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'Digital' | 'Print' | 'Radio' | 'TV' | 'Social Media' | 'Email';
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  leads: number;
  conversions: number;
  roi: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  interest: string;
  score: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
  assignedTo: string;
  createdDate: string;
  lastContact: string;
}

interface Content {
  id: string;
  title: string;
  type: 'Blog Post' | 'Social Media' | 'Email Template' | 'Brochure' | 'Video';
  status: 'Published' | 'Draft' | 'Review';
  views: number;
  engagement: number;
  createdDate: string;
  author: string;
}

export default function MarketingTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock data
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Kamulu Land Sales Q1',
        type: 'Digital',
        status: 'Active',
        budget: 500000,
        spent: 320000,
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        leads: 145,
        conversions: 23,
        roi: 340
      },
      {
        id: '2',
        name: 'Heritage Villas Launch',
        type: 'Social Media',
        status: 'Active',
        budget: 800000,
        spent: 650000,
        startDate: '2024-01-15',
        endDate: '2024-02-28',
        leads: 89,
        conversions: 12,
        roi: 280
      },
      {
        id: '3',
        name: 'Radio Campaign - Kitengela',
        type: 'Radio',
        status: 'Completed',
        budget: 300000,
        spent: 300000,
        startDate: '2023-12-01',
        endDate: '2023-12-31',
        leads: 67,
        conversions: 8,
        roi: 150
      }
    ];

    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'James Mwangi',
        email: 'james.mwangi@email.com',
        phone: '+254722123456',
        source: 'Facebook Ads',
        interest: 'Kamulu Plots',
        score: 85,
        status: 'Qualified',
        assignedTo: 'Mark Muriithi',
        createdDate: '2024-01-15',
        lastContact: '2024-01-16'
      },
      {
        id: '2',
        name: 'Grace Njeri',
        email: 'grace.njeri@email.com',
        phone: '+254733987654',
        source: 'Website',
        interest: 'Heritage Villas',
        score: 92,
        status: 'New',
        assignedTo: 'John Makau',
        createdDate: '2024-01-16',
        lastContact: '2024-01-16'
      },
      {
        id: '3',
        name: 'Peter Kiprotich',
        email: 'peter.k@email.com',
        phone: '+254744567890',
        source: 'Google Ads',
        interest: 'Utawala Plots',
        score: 78,
        status: 'Contacted',
        assignedTo: 'Mark Muriithi',
        createdDate: '2024-01-14',
        lastContact: '2024-01-15'
      }
    ];

    const mockContent: Content[] = [
      {
        id: '1',
        title: 'Why Invest in Kamulu Land',
        type: 'Blog Post',
        status: 'Published',
        views: 2450,
        engagement: 18.5,
        createdDate: '2024-01-10',
        author: 'Marketing Team'
      },
      {
        id: '2',
        title: 'Heritage Villas Showcase',
        type: 'Video',
        status: 'Published',
        views: 5670,
        engagement: 24.3,
        createdDate: '2024-01-12',
        author: 'Marketing Team'
      },
      {
        id: '3',
        title: 'New Year Land Offers',
        type: 'Email Template',
        status: 'Draft',
        views: 0,
        engagement: 0,
        createdDate: '2024-01-16',
        author: 'Marketing Team'
      }
    ];

    setCampaigns(mockCampaigns);
    setLeads(mockLeads);
    setContent(mockContent);
  }, []);

  // Calculate marketing metrics
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const averageROI = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Published':
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Paused':
      case 'Draft':
      case 'New': return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
      case 'Converted': return 'bg-blue-100 text-blue-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Contacted': return 'bg-purple-100 text-purple-800';
      case 'Review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketing Management</h2>
          <p className="text-gray-600">Manage campaigns, leads, and marketing content</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Marketing Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalBudget)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-green-600">{totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-purple-600">{totalConversions}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg ROI</p>
                <p className="text-2xl font-bold text-orange-600">{averageROI.toFixed(0)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Campaign Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>

                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option value="all">All Types</option>
                  <option value="Digital">Digital</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Radio">Radio</option>
                  <option value="Print">Print</option>
                </select>

                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Completed">Completed</option>
                </select>

                <Input placeholder="Search campaigns..." />
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <p className="text-sm text-gray-600">{campaign.type}</p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Budget Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Budget Used</span>
                        <span>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{campaign.leads}</p>
                        <p className="text-xs text-gray-600">Leads</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{campaign.conversions}</p>
                        <p className="text-xs text-gray-600">Conversions</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{campaign.roi}%</p>
                        <p className="text-xs text-gray-600">ROI</p>
                      </div>
                    </div>

                    {/* Campaign Duration */}
                    <div className="text-sm text-gray-600">
                      <p>{campaign.startDate} - {campaign.endDate}</p>
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
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Lead Management</CardTitle>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Name</th>
                      <th className="text-left p-3 font-medium text-gray-600">Contact</th>
                      <th className="text-left p-3 font-medium text-gray-600">Source</th>
                      <th className="text-left p-3 font-medium text-gray-600">Interest</th>
                      <th className="text-left p-3 font-medium text-gray-600">Score</th>
                      <th className="text-left p-3 font-medium text-gray-600">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600">Assigned To</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{lead.name}</td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center text-xs">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.email}
                            </div>
                            <div className="flex items-center text-xs">
                              <Phone className="h-3 w-3 mr-1" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{lead.source}</td>
                        <td className="p-3">{lead.interest}</td>
                        <td className="p-3">
                          <span className={`font-bold ${getLeadScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="p-3">{lead.assignedTo}</td>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Content Management</CardTitle>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Views:</span>
                          <span className="font-medium">{item.views.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Engagement:</span>
                          <span className="font-medium">{item.engagement}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium">{item.createdDate}</span>
                        </div>
                      </div>

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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Campaign performance chart</p>
                    <p className="text-sm text-gray-400">ROI, Leads, Conversions over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Lead source distribution</p>
                    <p className="text-sm text-gray-400">Facebook, Google, Website, etc.</p>
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