import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Heart, CheckCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');

  // Mock data - in real app, this would come from your database
  const availableCampaigns = [
    {
      id: '1',
      name: 'Community Cleanup Drive',
      manager: 'Sarah Johnson',
      date: '2024-01-15',
      time: '09:00 AM',
      location: 'Central Park',
      description: 'Help clean up our community park and make it beautiful for everyone.',
      category: 'Community Service',
      startsIn: '2 days',
      volunteersNeeded: 20,
      currentVolunteers: 8
    },
    {
      id: '2',
      name: 'Food Bank Distribution',
      manager: 'Mike Davis',
      date: '2024-01-18',
      time: '02:00 PM',
      location: 'Community Center',
      description: 'Assist in distributing food packages to families in need.',
      category: 'Food Assistance',
      startsIn: '5 days',
      volunteersNeeded: 15,
      currentVolunteers: 12
    },
    {
      id: '3',
      name: 'Youth Education Workshop',
      manager: 'Emily Chen',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Local Library',
      description: 'Help teach basic computer skills to underprivileged youth.',
      category: 'Education',
      startsIn: '1 week',
      volunteersNeeded: 10,
      currentVolunteers: 5
    }
  ];

  const joinedCampaigns = [
    {
      id: '4',
      name: 'Environmental Awareness Campaign',
      manager: 'John Smith',
      date: '2024-01-12',
      time: '11:00 AM',
      location: 'City Mall',
      description: 'Spread awareness about environmental conservation.',
      category: 'Environmental',
      startsIn: 'Tomorrow',
      volunteersNeeded: 25,
      currentVolunteers: 25
    }
  ];

  const handleShowInterest = (campaignId: string) => {
    // Mock API call to show interest
    toast({
      title: "Interest Registered",
      description: `You've shown interest in the campaign.`,
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
    <Card className="mb-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="font-bold text-xl text-gray-900">{campaign.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {campaign.category}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">Manager: {campaign.manager}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{campaign.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{campaign.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{campaign.location}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
            
            {campaign.startsIn && (
              <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Starts in {campaign.startsIn}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="ml-4">
            {!isJoined ? (
              <Button
                onClick={() => handleShowInterest(campaign.id)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Show Interest
              </Button>
            ) : (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Joined</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation title="Volunteer Dashboard">
        <div className="flex items-center space-x-4">
          <Button
            variant={activeTab === 'available' ? 'default' : 'outline'}
            onClick={() => setActiveTab('available')}
            className="flex items-center space-x-2"
          >
            <Heart className="w-4 h-4" />
            <span>Available Campaigns</span>
          </Button>
          <Button
            variant={activeTab === 'joined' ? 'default' : 'outline'}
            onClick={() => setActiveTab('joined')}
            className="flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>My Campaigns</span>
          </Button>
        </div>
      </Navigation>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {activeTab === 'available' ? '🌟 Discover Amazing Campaigns' : '🎯 Your Active Campaigns'}
          </h1>
          <p className="text-xl text-gray-600">
            {activeTab === 'available' 
              ? 'Find meaningful volunteer opportunities and make a difference in your community'
              : 'Track your volunteer journey and upcoming commitments'}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {activeTab === 'available' ? availableCampaigns.length : joinedCampaigns.length}
              </div>
              <div className="text-gray-600">
                {activeTab === 'available' ? 'Available' : 'Joined'} Campaigns
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {joinedCampaigns.length}
              </div>
              <div className="text-gray-600">Total Joined</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {joinedCampaigns.length * 4}
              </div>
              <div className="text-gray-600">Hours Volunteered</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="space-y-6">
          {activeTab === 'available' && availableCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
          {activeTab === 'joined' && joinedCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} isJoined={true} />
          ))}
        </div>

        {((activeTab === 'available' && availableCampaigns.length === 0) || 
          (activeTab === 'joined' && joinedCampaigns.length === 0)) && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <div className="text-6xl mb-4">
                {activeTab === 'available' ? '🔍' : '🎉'}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'available' ? 'No campaigns available' : 'No joined campaigns yet'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'available' 
                  ? 'Check back later for new opportunities!' 
                  : 'Start by showing interest in available campaigns.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
