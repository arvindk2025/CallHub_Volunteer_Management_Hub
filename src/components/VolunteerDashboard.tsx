import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Heart, CheckCircle, Settings, Mail, X, Check, Award, TrendingUp, Star } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import VolunteerProfile from './VolunteerProfile';
import { campaigns, Campaign, Invitation } from '../data/campaigns';
import { invitationService } from '../utils/invitationService';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfile, setShowProfile] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  
  const userEmail = localStorage.getItem('userEmail') || 'volunteer@example.com';
  const volunteerId = localStorage.getItem('volunteerId') || 'vol-001';
  const volunteerName = localStorage.getItem('volunteerName') || 'Volunteer User';

  // Mock invitations data
  const mockInvitations = [
    {
      id: 'inv-1',
      campaignId: 'camp-001',
      volunteerId: volunteerId,
      managerId: 'Sarah Johnson',
      status: 'pending' as const,
      invitedDate: '2024-06-05T10:00:00.000Z',
      message: 'We think you would be perfect for this environmental campaign! Your skills in organization would be invaluable.'
    },
    {
      id: 'inv-2',
      campaignId: 'camp-002',
      volunteerId: volunteerId,
      managerId: 'Michael Brown',
      status: 'pending' as const,
      invitedDate: '2024-06-04T14:30:00.000Z',
      message: 'Your communication skills caught our attention. Join us for this community outreach program!'
    },
    {
      id: 'inv-3',
      campaignId: 'camp-003',
      volunteerId: volunteerId,
      managerId: 'Emily Davis',
      status: 'pending' as const,
      invitedDate: '2024-06-03T09:15:00.000Z',
      message: 'We need volunteers with teaching experience for our education drive. Would you like to help make a difference?'
    },
    {
      id: 'inv-4',
      campaignId: 'camp-004',
      volunteerId: volunteerId,
      managerId: 'David Wilson',
      status: 'accepted' as const,
      invitedDate: '2024-06-02T16:45:00.000Z',
      message: 'Your healthcare background makes you an ideal candidate for our health awareness campaign.'
    },
    {
      id: 'inv-5',
      campaignId: 'camp-005',
      volunteerId: volunteerId,
      managerId: 'Lisa Anderson',
      status: 'pending' as const,
      invitedDate: '2024-06-01T11:20:00.000Z',
      message: 'Join our food drive campaign and help feed families in need during the holiday season.'
    }
  ];

  useEffect(() => {
    // Load invitations for the current volunteer
    const volunteerInvitations = invitationService.getVolunteerInvitations(volunteerId);
    
    // If no real invitations, use mock data for demo
    if (volunteerInvitations.length === 0) {
      setInvitations(mockInvitations);
    } else {
      setInvitations([...volunteerInvitations, ...mockInvitations]);
    }
    
    // Refresh invitations every 5 seconds to catch new ones
    const interval = setInterval(() => {
      const updatedInvitations = invitationService.getVolunteerInvitations(volunteerId);
      if (updatedInvitations.length > 0) {
        setInvitations([...updatedInvitations, ...mockInvitations]);
      }
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
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Create interest request for the specific manager
    const interestRequest = {
      id: `interest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      volunteerId: volunteerId,
      volunteerName: volunteerName,
      volunteerEmail: userEmail,
      campaignId: campaignId,
      campaignName: campaign.name,
      managerId: campaign.manager, // This links to the specific manager
      appliedDate: new Date().toISOString(),
      status: 'pending',
      volunteerPhone: localStorage.getItem('volunteerPhone') || '+1 (555) 000-0000',
      volunteerLocation: localStorage.getItem('volunteerLocation') || 'California, 90210',
      volunteerSkills: localStorage.getItem('volunteerSkills') || 'Communication, Organization',
      availableShifts: JSON.parse(localStorage.getItem('volunteerShifts') || '["Morning"]')
    };

    // Get existing interest requests for this manager
    const managerKey = `interestedVolunteers_${campaign.manager}`;
    const existingRequests = JSON.parse(localStorage.getItem(managerKey) || '[]');
    
    // Check if already applied
    const alreadyApplied = existingRequests.some((req: any) => 
      req.volunteerId === volunteerId && req.campaignId === campaignId
    );

    if (alreadyApplied) {
      toast({
        title: "Already Applied",
        description: "You have already shown interest in this campaign.",
        variant: "destructive",
      });
      return;
    }

    // Add new request
    existingRequests.push(interestRequest);
    localStorage.setItem(managerKey, JSON.stringify(existingRequests));

    toast({
      title: "Interest Registered!",
      description: `Your interest has been sent to ${campaign.manager}. They will contact you soon.`,
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
    <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{campaign.name}</h3>
            <Badge variant="secondary" className="mb-3">{campaign.category}</Badge>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{campaign.description}</p>
          </div>
          <div className="text-right">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              Starts in {campaign.startsIn}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4" />
              <span className="text-sm">Manager: {campaign.manager}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{campaign.startDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{campaign.startTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{campaign.location}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Volunteer Progress</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium dark:text-white">
                  {campaign.volunteersRegistered}/{campaign.volunteersNeeded}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            {isJoined && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 p-3 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
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
            <Badge variant="outline" className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
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

    const hourlyRate = 25;

    return (
      <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{campaign.name}</h3>
                <Badge variant={invitation.status === 'pending' ? 'default' : invitation.status === 'accepted' ? 'secondary' : 'destructive'}>
                  {invitation.status}
                </Badge>
              </div>
              <Badge variant="outline" className="mb-3">{campaign.category}</Badge>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{campaign.description}</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Invited {new Date(invitation.invitedDate).toLocaleDateString()}
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                💰 ${hourlyRate}/hour
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm">Manager: {campaign.manager}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{campaign.startDate} - {campaign.endDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{campaign.startTime} - {campaign.endTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{campaign.location}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Skills Required</div>
                <div className="flex flex-wrap gap-1">
                  {campaign.skillsRequired.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {invitation.message && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Personal Message from Manager</div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{invitation.message}</p>
                </div>
              )}
            </div>
          </div>

          {invitation.status === 'pending' && (
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => handleInvitationResponse(invitation.id, 'declined')}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navigation title="Volunteer Dashboard">
        <Button
          variant="outline"
          onClick={() => setShowProfile(true)}
          className="flex items-center space-x-2 hover:bg-blue-50 dark:hover:bg-gray-700"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </Navigation>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-2">
            <TabsTrigger value="overview" className="flex items-center space-x-2 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center space-x-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span>Available</span>
            </TabsTrigger>
            <TabsTrigger value="invited" className="flex items-center space-x-2 rounded-lg">
              <Mail className="w-4 h-4" />
              <span>Invited</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>Joined</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Hello, {volunteerName}! 🌟
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Ready to make a difference in your community?
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Available</p>
                      <p className="text-3xl font-bold">{availableCampaigns.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Invitations</p>
                      <p className="text-3xl font-bold">{invitations.filter(inv => inv.status === 'pending').length}</p>
                    </div>
                    <Mail className="w-8 h-8 text-yellow-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Joined</p>
                      <p className="text-3xl font-bold">{joinedCampaigns.length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Impact Score</p>
                      <p className="text-3xl font-bold">92</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Your Volunteer Journey</span>
                </CardTitle>
                <CardDescription>Keep track of your volunteer activities and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300">Your volunteer statistics and achievements will appear here as you participate in more campaigns!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">🌟 Available Campaigns</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white dark:bg-gray-800">
                {availableCampaigns.length} Available
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invited" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">📧 Campaign Invitations</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white dark:bg-gray-800">
                {invitations.length} Invitations
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {invitations.map(invitation => (
                <InvitationCard key={invitation.id} invitation={invitation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">✅ Your Campaigns</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white dark:bg-gray-800">
                {joinedCampaigns.length} Joined
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {joinedCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} isJoined={true} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
