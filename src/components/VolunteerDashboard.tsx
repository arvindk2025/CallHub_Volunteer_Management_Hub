import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Heart, CheckCircle, Settings, Mail, X, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import VolunteerProfile from './VolunteerProfile';
import { campaigns, Campaign, Invitation } from '../data/campaigns';
import { invitationService } from '../utils/invitationService';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [showProfile, setShowProfile] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  
  const userEmail = localStorage.getItem('userEmail') || 'volunteer@example.com';
  const volunteerId = localStorage.getItem('volunteerId') || 'vol-001';

  useEffect(() => {
    // Load invitations for the current volunteer
    const volunteerInvitations = invitationService.getVolunteerInvitations(volunteerId);
    setInvitations(volunteerInvitations);
    
    // Refresh invitations every 5 seconds to catch new ones
    const interval = setInterval(() => {
      const updatedInvitations = invitationService.getVolunteerInvitations(volunteerId);
      setInvitations(updatedInvitations);
    }, 5000);

    return () => clearInterval(interval);
  }, [volunteerId]);

  // Mock data - using real campaign data
  const availableCampaigns = campaigns.slice(0, 6).map(campaign => ({
    ...campaign,
    startsIn: calculateDaysUntil(campaign.startDate)
  }));

  const joinedCampaigns = campaigns.slice(6, 8).map(campaign => ({
    ...campaign,
    joinedDate: '2024-06-10',
    startsIn: calculateDaysUntil(campaign.startDate)
  }));

  function calculateDaysUntil(dateString: string): string {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Completed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  }

  const handleShowInterest = (campaignId: string) => {
    toast({
      title: "Interest Registered!",
      description: "Your interest has been sent to the campaign manager. They will contact you soon.",
    });
  };

  const handleInvitationResponse = (invitationId: string, status: 'accepted' | 'declined') => {
    invitationService.updateInvitationStatus(invitationId, status);
    setInvitations(prev => prev.map(inv => 
      inv.id === invitationId ? { ...inv, status } : inv
    ));
    
    toast({
      title: status === 'accepted' ? "Invitation Accepted!" : "Invitation Declined",
      description: status === 'accepted' 
        ? "You've successfully joined the campaign!" 
        : "The invitation has been declined.",
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
    <Card className="mb-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.name}</h3>
            <Badge variant="secondary" className="mb-3">{campaign.category}</Badge>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
          </div>
          <div className="text-right">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Starts in {campaign.startsIn}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm">Manager: {campaign.manager}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{campaign.startDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{campaign.startTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{campaign.location}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border">
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            {isJoined && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
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

  const InvitationCard = ({ invitation }: { invitation: Invitation }) => {
    const campaign = campaigns.find(c => c.id === invitation.campaignId);
    if (!campaign) return null;

    // Calculate hourly rate (default $25/hour since hourlyRate property doesn't exist in campaign data)
    const hourlyRate = 25; // Default $25/hour

    return (
      <Card className="mb-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                <Badge variant={invitation.status === 'pending' ? 'default' : invitation.status === 'accepted' ? 'secondary' : 'destructive'}>
                  {invitation.status}
                </Badge>
              </div>
              <Badge variant="outline" className="mb-3">{campaign.category}</Badge>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Invited {new Date(invitation.invitedDate).toLocaleDateString()}
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                💰 ${hourlyRate}/hour
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">Manager: {campaign.manager}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{campaign.startDate} - {campaign.endDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{campaign.startTime} - {campaign.endTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{campaign.location}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Skills Required</div>
                <div className="flex flex-wrap gap-1">
                  {campaign.skillsRequired.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {invitation.message && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Personal Message from Manager</div>
                  <p className="text-sm text-gray-800">{invitation.message}</p>
                </div>
              )}
            </div>
          </div>

          {invitation.status === 'pending' && (
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => handleInvitationResponse(invitation.id, 'declined')}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button 
                onClick={() => handleInvitationResponse(invitation.id, 'accepted')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept Invitation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation title="Volunteer Dashboard">
        <Button
          variant="outline"
          onClick={() => setShowProfile(true)}
          className="flex items-center space-x-2 hover:bg-blue-50"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </Navigation>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="available" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Available Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="invited" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Invited for Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Joined Campaigns</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">🌟 Available Campaigns</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/80 backdrop-blur-sm">
                {availableCampaigns.length} Available
              </Badge>
            </div>
            
            <div className="space-y-6">
              {availableCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invited" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">📧 Campaign Invitations</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/80 backdrop-blur-sm">
                {invitations.length} Invitations
              </Badge>
            </div>
            
            <div className="space-y-6">
              {invitations.map(invitation => (
                <InvitationCard key={invitation.id} invitation={invitation} />
              ))}
            </div>

            {invitations.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">📬</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No invitations yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Campaign managers will send you invitations for campaigns that match your skills!
                  </p>
                  <Button 
                    onClick={() => setActiveTab('available')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Available Campaigns
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">✅ Your Campaigns</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/80 backdrop-blur-sm">
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
