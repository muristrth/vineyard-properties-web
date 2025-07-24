'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Map,
  Shuffle,
  Building,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

interface LandAsset {
  id: string;
  blockName: string;
  location: string;
  totalPlots: number;
  soldPlots: number;
  availablePlots: number;
  pricePerPlot: number;
  totalValue: number;
  documents: {
    titleDeed: string;
    surveyMap: string;
    mutation: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'Active' | 'Sold Out' | 'Development';
}

interface ResaleProperty {
  id: string;
  originalOwner: string;
  plotNo: string;
  landBlock: string;
  originalPrice: number;
  resalePrice: number;
  profit: number;
  status: 'Listed' | 'Sold' | 'Negotiating';
  listingDate: string;
}

export default function LandAssetsTab() {
  const [landAssets, setLandAssets] = useState<LandAsset[]>([]);
  const [resaleProperties, setResaleProperties] = useState<ResaleProperty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  useEffect(() => {
    const mockLandAssets: LandAsset[] = [
      {
        id: '1',
        blockName: 'KAMULU BLOCK 3/2069',
        location: 'Kamulu, Machakos County',
        totalPlots: 50,
        soldPlots: 35,
        availablePlots: 15,
        pricePerPlot: 1200000,
        totalValue: 60000000,
        documents: {
          titleDeed: 'KAMULU_TITLE_2069.pdf',
          surveyMap: 'KAMULU_SURVEY_2069.pdf',
          mutation: 'KAMULU_MUTATION_2069.pdf'
        },
        coordinates: { lat: -1.2921, lng: 36.8219 },
        status: 'Active'
      },
      {
        id: '2',
        blockName: 'UTAWALA BLOCK 7340-160',
        location: 'Utawala, Nairobi County',
        totalPlots: 40,
        soldPlots: 40,
        availablePlots: 0,
        pricePerPlot: 2800000,
        totalValue: 112000000,
        documents: {
          titleDeed: 'UTAWALA_TITLE_7340.pdf',
          surveyMap: 'UTAWALA_SURVEY_7340.pdf',
          mutation: 'UTAWALA_MUTATION_7340.pdf'
        },
        coordinates: { lat: -1.2921, lng: 36.9219 },
        status: 'Sold Out'
      },
      {
        id: '3',
        blockName: 'KITENGELA BLOCK 2-13299',
        location: 'Kitengela, Kajiado County',
        totalPlots: 60,
        soldPlots: 25,
        availablePlots: 35,
        pricePerPlot: 950000,
        totalValue: 57000000,
        documents: {
          titleDeed: 'KITENGELA_TITLE_13299.pdf',
          surveyMap: 'KITENGELA_SURVEY_13299.pdf',
          mutation: 'KITENGELA_MUTATION_13299.pdf'
        },
        coordinates: { lat: -1.4167, lng: 36.9500 },
        status: 'Active'
      },
      // Add more blocks...
      ...Array.from({ length: 17 }, (_, i) => ({
        id: (i + 4).toString(),
        blockName: `LAND BLOCK ${i + 4}`,
        location: `Location ${i + 4}`,
        totalPlots: Math.floor(Math.random() * 50) + 20,
        soldPlots: Math.floor(Math.random() * 30) + 5,
        availablePlots: Math.floor(Math.random() * 20) + 5,
        pricePerPlot: Math.floor(Math.random() * 2000000) + 800000,
        totalValue: Math.floor(Math.random() * 100000000) + 20000000,
        documents: {
          titleDeed: `TITLE_${i + 4}.pdf`,
          surveyMap: `SURVEY_${i + 4}.pdf`,
          mutation: `MUTATION_${i + 4}.pdf`
        },
        coordinates: { 
          lat: -1.2921 + (Math.random() - 0.5) * 0.5, 
          lng: 36.8219 + (Math.random() - 0.5) * 0.5 
        },
        status: ['Active', 'Sold Out', 'Development'][Math.floor(Math.random() * 3)] as any
      }))
    ];

    const mockResaleProperties: ResaleProperty[] = [
      {
        id: '1',
        originalOwner: 'JOHN KAMAU MWANGI',
        plotNo: '12715-111',
        landBlock: 'KAMULU BLOCK 3/2069',
        originalPrice: 1200000,
        resalePrice: 1800000,
        profit: 600000,
        status: 'Listed',
        listingDate: '2024-01-15'
      },
      {
        id: '2',
        originalOwner: 'MARY WANJIKU',
        plotNo: '7340-201',
        landBlock: 'UTAWALA BLOCK 7340-160',
        originalPrice: 2800000,
        resalePrice: 4200000,
        profit: 1400000,
        status: 'Sold',
        listingDate: '2024-01-10'
      }
    ];

    setLandAssets(mockLandAssets);
    setResaleProperties(mockResaleProperties);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Sold Out': return 'bg-red-100 text-red-800';
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Listed': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-green-100 text-green-800';
      case 'Negotiating': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAssetValue = landAssets.reduce((sum, asset) => sum + asset.totalValue, 0);
  const totalPlotsAvailable = landAssets.reduce((sum, asset) => sum + asset.availablePlots, 0);
  const totalPlotsSold = landAssets.reduce((sum, asset) => sum + asset.soldPlots, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Land Assets Management</h2>
          <p className="text-gray-600">Manage land blocks, documents, and resale properties</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Asset Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  KES {(totalAssetValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Plots</p>
                <p className="text-2xl font-bold text-blue-600">{totalPlotsAvailable}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plots Sold</p>
                <p className="text-2xl font-bold text-green-600">{totalPlotsSold}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Land Blocks</p>
                <p className="text-2xl font-bold text-purple-600">{landAssets.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assets">Land Assets</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="resales">Resales</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Search land blocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Development">Development</option>
                </select>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Land Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landAssets.map((asset) => (
              <Card key={asset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{asset.blockName}</CardTitle>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {asset.location}
                      </p>
                    </div>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Plot Statistics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{asset.totalPlots}</p>
                        <p className="text-xs text-gray-600">Total Plots</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{asset.soldPlots}</p>
                        <p className="text-xs text-gray-600">Sold</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{asset.availablePlots}</p>
                        <p className="text-xs text-gray-600">Available</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(asset.soldPlots / asset.totalPlots) * 100}%` }}
                      ></div>
                    </div>

                    {/* Financial Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price per plot:</span>
                        <span className="text-sm font-medium">KES {asset.pricePerPlot.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total value:</span>
                        <span className="text-sm font-bold">KES {(asset.totalValue / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Map className="h-4 w-4 mr-1" />
                        Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Land Documents Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {landAssets.slice(0, 5).map((asset) => (
                  <div key={asset.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{asset.blockName}</h3>
                        <p className="text-sm text-gray-600">{asset.location}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="text-sm">Title Deed</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <Map className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm">Survey Map</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <Shuffle className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="text-sm">Mutation</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Property Resales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Original Owner</th>
                      <th className="text-left p-3 font-medium text-gray-600">Plot No</th>
                      <th className="text-left p-3 font-medium text-gray-600">Land Block</th>
                      <th className="text-left p-3 font-medium text-gray-600">Original Price</th>
                      <th className="text-left p-3 font-medium text-gray-600">Resale Price</th>
                      <th className="text-left p-3 font-medium text-gray-600">Profit</th>
                      <th className="text-left p-3 font-medium text-gray-600">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resaleProperties.map((property) => (
                      <tr key={property.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{property.originalOwner}</td>
                        <td className="p-3">{property.plotNo}</td>
                        <td className="p-3">{property.landBlock}</td>
                        <td className="p-3">KES {property.originalPrice.toLocaleString()}</td>
                        <td className="p-3 font-medium text-green-600">
                          KES {property.resalePrice.toLocaleString()}
                        </td>
                        <td className="p-3 font-bold text-green-600">
                          KES {property.profit.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(property.status)}>
                            {property.status}
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
      </Tabs>
    </div>
  );
}