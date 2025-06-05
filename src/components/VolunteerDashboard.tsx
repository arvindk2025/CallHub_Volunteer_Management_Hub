
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Heart, CheckCircle, Bell } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');

  // Mock data - in real app, this would come from your database
  const availableCampaigns = [
    {
      id: '1',
      name: 'Community Cleanup Drive',
      managerName: 'Sarah Johnson',
      scheduledDate: '2024-01-15',
      scheduledTime: '09:00 AM',
      location: 'Central Park',
      description: 'Help clean up our community park and make it beautiful for everyone.',
      startsIn: '2 days',
      volunteersNeeded: 20,
      currentVolunteers: 8
    },
    {
      id: '2',
      name: 'Food Bank Distribution',
      managerName: 'Mike Davis',
      scheduledDate: '2024-01-18',
      scheduledTime: '02:00 PM',
      location: 'Community Center',
      description: 'Assist in distributing food packages to families in need.',
      startsIn: '5 days',
      volunteersNeeded: 15,
      currentVolunteers: 12
    },
    {
      id: '3',
      name: 'Youth Education Workshop',
      managerName: 'Emily Chen',
      scheduledDate: '2024-01-20',
      scheduledTime: '10:00 AM',
      location: 'Local Library',
      description: 'Help teach basic computer skills to underprivileged youth.',
      startsIn: '1 week',
      volunteersNeeded: 10,
      currentVolunteers: 5
    }
  ];

  const joinedCampaigns = [
    {
      id: '4',
      name: 'Environmental Awareness Campaign',
      managerName: 'John Smith',
      scheduledDate: '2024-01-12',
      scheduledTime: '11:00 AM',
      location: 'City Mall',
      description: 'Spread awareness about environmental conservation.',
      startsIn: 'Tomorrow',
      volunteersNeeded: 25,
      currentVolunteers: 25
    }
  ];

  const handleShowInterest = (campaignId: string, campaignName: string) => {
    // Mock API call to show interest
    toast({
      title: "Interest Registered",
      description: `You've shown interest in "${campaignName}". The campaign manager will review your application.`,
    });
  };

  const getTimeUntilStart = (scheduledDate: string, scheduledTime: string) => {
    const campaignDateTime = new Date(`${scheduledDate} ${scheduledTime}`);
    const now = new Date();
    const diffTime = campaignDateTime.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
  };

  const CampaignCard = ({ campaign, isJoined = false }: { campaign: any, isJoined?: boolean }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{campaign.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <User className="w-4 h-4 mr-1" />
              Manager: {campaign.managerName}
            </CardDescription>
          </div>
          <div className="text-right">
            <Badge variant={isJoined ? "default" : "secondary"} className="mb-2">
              {isJoined ? 'Joined' : 'Available'}
            </Badge>
            <div className="flex items-center text-sm text-orange-600 font-semibold">
              <Bell className="w-4 h-4 mr-1" />
              Starts in {campaign.startsIn}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span>{new Date(campaign.scheduledDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-green-500" />
            <span>{campaign.scheduledTime}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span>{campaign.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-purple-500" />
            <span>{campaign.currentVolunteers}/{campaign.volunteersNeeded} volunteers</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${(campaign.currentVolunteers / campaign.volunteersNeeded) * 100}%` }}
            ></div>
          </div>
          
          {!isJoined && (
            <Button
              onClick={() => handleShowInterest(campaign.id, campaign.name)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Heart className="w-4 h-4 mr-2" />
              Show Interest
            </Button>
          )}
          
          {isJoined && (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Joined
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Volunteer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={activeTab === 'available' ? 'default' : 'outline'}
                onClick={() => setActiveTab('available')}
              >
                Available Campaigns
              </Button>
              <Button
                variant={activeTab === 'joined' ? 'default' : 'outline'}
                onClick={() => setActiveTab('joined')}
              >
                Already Joined
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === 'available' ? 'Available Campaigns' : 'Your Joined Campaigns'}
          </h2>
          <Badge variant="outline" className="text-sm">
            {activeTab === 'available' 
              ? `${availableCampaigns.length} campaigns available` 
              : `${joinedCampaigns.length} campaigns joined`
            }
          </Badge>
        </div>

        {/* Automated Email Reminder Notice for Joined Campaigns */}
        {activeTab === 'joined' && joinedCampaigns.length > 0 && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-blue-700 font-medium">
                  You'll receive automatic email reminders 2 hours before each campaign starts.
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Campaigns List */}
        <div className="space-y-4">
          {activeTab === 'available' && availableCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
          {activeTab === 'joined' && joinedCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} isJoined={true} />
          ))}
        </div>

        {((activeTab === 'available' && availableCampaigns.length === 0) || 
          (activeTab === 'joined' && joinedCampaigns.length === 0)) && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">
                {activeTab === 'available' 
                  ? 'No campaigns available at the moment. Check back soon!' 
                  : 'You haven\'t joined any campaigns yet. Browse available campaigns to get started!'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
