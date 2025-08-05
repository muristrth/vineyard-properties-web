import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Download, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Property } from '@/app/properties/[id]/page';

interface PropertyQuickActionsProps {
  property: Property;
  onPropertyChange?: (propertyId: string) => void;
}

export const PropertyQuickActions: React.FC<PropertyQuickActionsProps> = ({ 
  property, 
  onPropertyChange 
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');

  const handleDownloadBrochure = async () => {
    if (!property.downloadUrl) {
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
      return;
    }

    setDownloadStatus('downloading');

    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = property.downloadUrl;
      link.download = `${property.title.replace(/[^a-zA-Z0-9]/g, '_')}_Brochure.pdf`;
      link.target = '_blank';
      
      // For external URLs, open in new tab instead of direct download
      if (property.downloadUrl.startsWith('http')) {
        window.open(property.downloadUrl, '_blank');
      } else {
        // For local files, trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }
  };

  const getDownloadButtonContent = () => {
    switch (downloadStatus) {
      case 'downloading':
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2" />
            Downloading...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Downloaded!
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            Download Failed
          </>
        );
      default:
        return (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download Brochure
          </>
        );
    }
  };

  return (
    <>
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 transform hover:scale-[1.02] transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-xl text-gray-900">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start transform hover:scale-105 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => window.location.href = "tel:0729170156"}
            >
              <Calendar className="mr-2 h-4 w-4 text-blue-600" />
              Schedule Viewing
            </Button>
            
            <Button 
              variant="outline" 
              className={`w-full justify-start transform hover:scale-105 transition-all duration-300 ${
                downloadStatus === 'success' 
                  ? 'bg-green-50 border-green-300 text-green-700' 
                  : downloadStatus === 'error' 
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'hover:bg-green-50 hover:border-green-300'
              }`}
              onClick={handleDownloadBrochure}
              disabled={downloadStatus === 'downloading'}
            >
              {getDownloadButtonContent()}
            </Button>
            

          </div>
          
        </CardContent>
      </Card>

     
    </>
  );
};