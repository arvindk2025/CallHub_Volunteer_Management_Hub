import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Heart, CheckCircle, Settings } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import VolunteerProfile from './VolunteerProfile';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [showProfile, setShowProfile] = useState(false);

  // Mock data - in real app, this would come from your database
  const availableCampaigns = [
    {
      id: '1',
      name: 'Community Garden Project',
      managerName: 'Sarah Wilson',
      date: '2024-07-15',
      time: '09:00 AM',
      location: 'Central Park',
      description: 'Help create a beautiful community garden for local families',
      volunteersNeeded: 25,
      volunteersRegistered: 18,
      startsIn: '5 days',
      category: 'Environment'
    },
    {
      id: '2',
      name: 'Food Bank Distribution',
      managerName: 'Mike Johnson',
      date: '2024-07-18',
      time: '08:00 AM',
      location: 'Community Center',
      description: 'Distribute food packages to families in need',
      volunteersNeeded: 30,
      volunteersRegistered: 22,
      startsIn: '8 days',
      category: 'Social Service'
    },
    {
      id: '3',
      name: 'Blood Donation Drive',
      managerName: 'Dr. Emily Carter',
      date: '2024-07-20',
      time: '10:00 AM',
      location: 'City Hospital',
      description: 'Support the blood donation drive to save lives',
      volunteersNeeded: 15,
      volunteersRegistered: 12,
      startsIn: '10 days',
      category: 'Healthcare'
    }
  ];

  const joinedCampaigns = [
    {
      id: '4',
      name: 'Children Education Program',
      managerName: 'Lisa Brown',
      date: '2024-07-25',
      time: '02:00 PM',
      location: 'Elementary School',
      description: 'Teach and mentor children in reading and basic math',
      volunteersNeeded: 20,
      volunteersRegistered: 20,
      startsIn: '15 days',
      category: 'Education',
      joinedDate: '2024-06-10'
    }
  ];

  const handleShowInterest = (campaignId: string) => {
    toast({
      title: "Interest Registered!",
      description: "Your interest has been sent to the campaign manager. They will contact you soon.",
    });
  };

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Navigation title="Volunteer Dashboard">
          <Button
            variant="outline"
            onClick={() => setShowProfile(false)}
            className="flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Navigation>
        <div className="py-8">
          <VolunteerProfile />
        </div>
      </div>
    );
  }

  const CampaignCard = ({ campaign, isJoined = false }: { campaign: any, isJoined?: boolean }) => (
    <Card className="mb-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.name}</h3>
            <Badge variant="secondary" className="mb-3">{campaign.category}</Badge>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
          </div>
          <div className="text-right">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Starts in {campaign.startsIn}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm">Manager: {campaign.managerName}</span>
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
          
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Volunteer Progress</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {campaign.volunteersRegistered}/{campaign.volunteersNeeded}
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            {isJoined && (
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Joined on {campaign.joinedDate}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          {!isJoined ? (
            <Button 
              onClick={() => handleShowInterest(campaign.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Show Interest
            </Button>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Joined
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation title="Volunteer Dashboard">
        <Button
          variant="outline"
          onClick={() => setShowProfile(true)}
          className="flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </Navigation>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Available Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Joined Campaigns</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">🌟 Available Campaigns</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {availableCampaigns.length} Available
              </Badge>
            </div>
            
            <div className="space-y-6">
              {availableCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">✅ Your Campaigns</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {joinedCampaigns.length} Joined
              </Badge>
            </div>
            
            <div className="space-y-6">
              {joinedCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} isJoined={true} />
              ))}
            </div>

            {joinedCampaigns.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No joined campaigns yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore available campaigns and start making a difference!
                  </p>
                  <Button 
                    onClick={() => setActiveTab('available')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Campaigns
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
