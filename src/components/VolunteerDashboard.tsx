import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Heart, CheckCircle, Settings, Mail, X, Check, Trophy, Star, Timer, Zap } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import VolunteerProfile from './VolunteerProfile';
import { campaigns, Campaign, Invitation } from '../data/campaigns';
import { invitationService } from '../utils/invitationService';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [showProfile, setShowProfile] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [joinedCampaigns, setJoinedCampaigns] = useState<any[]>([]);
  
  const userEmail = localStorage.getItem('userEmail') || 'volunteer@example.com';
  const volunteerId = localStorage.getItem('volunteerId') || 'vol-001';
  const volunteerName = localStorage.getItem('volunteerName') || 'Volunteer User';

  // Enhanced mock data with proper dates and times
  const extendedCampaigns = [
    ...campaigns.slice(0, 6),
    {
      id: 'camp-ext-001',
      name: 'Digital Literacy Workshop',
      description: 'Teaching seniors how to use smartphones and computers for daily tasks.',
      category: 'Education',
      manager: 'Sarah Wilson',
      startDate: '2024-06-10',
      endDate: '2024-06-12',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Community Center, Downtown',
      skillsRequired: ['Teaching', 'Patience', 'Tech Skills'],
      volunteersNeeded: 8,
      volunteersRegistered: 3
    },
    {
      id: 'camp-ext-002',
      name: 'Pet Adoption Fair',
      description: 'Help organize and manage a pet adoption event to find homes for rescued animals.',
      category: 'Animal Welfare',
      manager: 'Mike Chen',
      startDate: '2024-06-08',
      endDate: '2024-06-08',
      startTime: '10:00',
      endTime: '16:00',
      location: 'City Park, North Plaza',
      skillsRequired: ['Animal Care', 'Event Management', 'Customer Service'],
      volunteersNeeded: 15,
      volunteersRegistered: 11
    },
    {
      id: 'camp-ext-003',
      name: 'River Cleanup Initiative',
      description: 'Join us in cleaning up the riverbank and removing plastic waste from the water.',
      category: 'Environment',
      manager: 'Elena Rodriguez',
      startDate: '2024-06-15',
      endDate: '2024-06-15',
      startTime: '07:00',
      endTime: '12:00',
      location: 'Riverside Park, East Side',
      skillsRequired: ['Physical Labor', 'Environmental Awareness'],
      volunteersNeeded: 25,
      volunteersRegistered: 18
    }
  ];

  // Enhanced mock invitations
  const enhancedMockInvitations: Invitation[] = [
    {
      id: 'inv-001',
      campaignId: 'camp-001',
      volunteerId: volunteerId,
      invitedDate: '2024-05-15T10:00:00.000Z',
      status: 'pending',
      message: 'Hi! We think you would be perfect for this community food drive campaign based on your skills and availability. Your experience in customer service would be very valuable!'
    },
    {
      id: 'inv-002',
      campaignId: 'camp-003',
      volunteerId: volunteerId,
      invitedDate: '2024-05-14T14:30:00.000Z',
      status: 'pending',
      message: 'Hello! We have an exciting environmental cleanup campaign that matches your interests in physical labor and organization. Would love to have you join us!'
    },
    {
      id: 'inv-003',
      campaignId: 'camp-005',
      volunteerId: volunteerId,
      invitedDate: '2024-05-13T09:15:00.000Z',
      status: 'accepted',
      message: 'We noticed your teaching and mentoring skills and think you would be an amazing addition to our youth mentorship program. Hope you can join us!'
    },
    {
      id: 'inv-004',
      campaignId: 'camp-ext-001',
      volunteerId: volunteerId,
      invitedDate: '2024-05-16T11:00:00.000Z',
      status: 'pending',
      message: 'Your tech skills would be incredibly valuable for our digital literacy workshop. Help us bridge the digital divide!'
    },
    {
      id: 'inv-005',
      campaignId: 'camp-ext-002',
      volunteerId: volunteerId,
      invitedDate: '2024-05-12T16:00:00.000Z',
      status: 'pending',
      message: 'We need volunteers with great people skills for our pet adoption fair. Your communication abilities would be perfect!'
    }
  ];

  // Load joined campaigns from localStorage
  useEffect(() => {
    const storedJoinedCampaigns = JSON.parse(localStorage.getItem(`joinedCampaigns_${volunteerId}`) || '[]');
    
    // If no stored campaigns, use enhanced mock data
    if (storedJoinedCampaigns.length === 0) {
      const defaultJoined = [...campaigns.slice(6, 8), extendedCampaigns[0], extendedCampaigns[2]].map(campaign => ({
        ...campaign,
        joinedDate: '2024-06-10',
        startsIn: calculateDaysUntil(campaign.startDate)
      }));
      setJoinedCampaigns(defaultJoined);
      localStorage.setItem(`joinedCampaigns_${volunteerId}`, JSON.stringify(defaultJoined));
    } else {
      setJoinedCampaigns(storedJoinedCampaigns);
    }
  }, [volunteerId]);

  useEffect(() => {
    // Load invitations for the current volunteer or use enhanced mock data for demo
    const volunteerInvitations = invitationService.getVolunteerInvitations(volunteerId);
    
    // If no stored invitations, use enhanced mock data for demo
    if (volunteerInvitations.length === 0) {
      setInvitations(enhancedMockInvitations);
    } else {
      setInvitations(volunteerInvitations);
    }
    
    // Refresh invitations every 5 seconds to catch new ones
    const interval = setInterval(() => {
      const updatedInvitations = invitationService.getVolunteerInvitations(volunteerId);
      if (updatedInvitations.length > 0) {
        setInvitations(updatedInvitations);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [volunteerId]);

  // Show achievement toast randomly
  useEffect(() => {
    const showRandomAchievement = () => {
      const achievements = [
        { title: "🥉 Bronze Achievement!", description: "You're making a difference in your community!" },
        { title: "🥈 Silver Badge Unlocked!", description: "Amazing dedication! Keep up the great work!" },
        { title: "🥇 Gold Status Achieved!", description: "You're a volunteering champion! Congratulations!" },
        { title: "⭐ Star Volunteer!", description: "Your impact is truly inspiring!" }
      ];
      
      const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
      
      setTimeout(() => {
        toast({
          title: randomAchievement.title,
          description: randomAchievement.description,
        });
      }, Math.random() * 10000 + 5000); // Random delay between 5-15 seconds
    };

    showRandomAchievement();
  }, [activeTab]);

  // Enhanced available campaigns with better dates
  const availableCampaigns = extendedCampaigns.map(campaign => ({
    ...campaign,
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

  // Enhanced real-time countdown component
  const CountdownTimer = ({ targetDate, targetTime }: { targetDate: string, targetTime: string }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const calculateTimeLeft = () => {
        // Combine date and time for accurate countdown
        const [hours, minutes] = targetTime.split(':');
        const target = new Date(targetDate);
        target.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          if (days > 0) {
            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
          } else if (hours > 0) {
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
          } else if (minutes > 0) {
            setTimeLeft(`${minutes}m ${seconds}s`);
          } else {
            setTimeLeft(`${seconds}s`);
          }
        } else {
          setTimeLeft('Campaign Started');
        }
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 1000); // Update every second

      return () => clearInterval(interval);
    }, [targetDate, targetTime]);

    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
        <Timer className="w-4 h-4" />
        <span>{timeLeft}</span>
      </div>
    );
  };

  // Enhanced badge system logic with dynamic updates
  const getBadgeInfo = () => {
    const joinedCount = joinedCampaigns.length;
    
    if (joinedCount >= 10) {
      return {
        badge: 'Gold',
        color: 'from-yellow-400 to-yellow-600',
        icon: Trophy,
        message: 'Congratulations! You are a Gold volunteer!',
        progress: 100,
        nextTarget: null
      };
    } else if (joinedCount >= 5) {
      return {
        badge: 'Silver',
        color: 'from-gray-400 to-gray-600',
        icon: Star,
        message: `You are on Silver badge stage! To become Gold you need to join ${10 - joinedCount} more campaigns.`,
        progress: (joinedCount / 10) * 100,
        nextTarget: 10 - joinedCount
      };
    } else {
      return {
        badge: 'Bronze',
        color: 'from-orange-400 to-orange-600',
        icon: Zap,
        message: `You are on Bronze badge stage! To become Silver you need to join ${5 - joinedCount} more campaigns.`,
        progress: (joinedCount / 5) * 100,
        nextTarget: 5 - joinedCount
      };
    }
  };

  const badgeInfo = getBadgeInfo();

  // ... keep existing code (handleShowInterest function)
  const handleShowInterest = (campaignId: string) => {
    const campaign = [...campaigns, ...extendedCampaigns].find(c => c.id === campaignId);
    if (!campaign) return;

    // Create interest request for the specific manager
    const interestRequest = {
      id: `interest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      volunteerId: volunteerId,
      volunteerName: volunteerName,
      volunteerEmail: userEmail,
      campaignId: campaignId,
      campaignName: campaign.name,
      managerId: campaign.manager,
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
      title: "Interest Registered! 🎉",
      description: `Your interest has been sent to ${campaign.manager}. They will contact you soon.`,
    });
  };

  const handleInvitationResponse = (invitationId: string, status: 'accepted' | 'declined') => {
    const invitation = invitations.find(inv => inv.id === invitationId);
    
    if (status === 'accepted' && invitation) {
      // Find the campaign details from both campaigns arrays
      const campaign = [...campaigns, ...extendedCampaigns].find(c => c.id === invitation.campaignId);
      if (campaign) {
        // Add to joined campaigns
        const newJoinedCampaign = {
          ...campaign,
          joinedDate: new Date().toISOString().split('T')[0],
          startsIn: calculateDaysUntil(campaign.startDate),
          invitationId: invitationId
        };
        
        const updatedJoinedCampaigns = [...joinedCampaigns, newJoinedCampaign];
        setJoinedCampaigns(updatedJoinedCampaigns);
        localStorage.setItem(`joinedCampaigns_${volunteerId}`, JSON.stringify(updatedJoinedCampaigns));

        // Check if badge should be upgraded
        const newBadgeInfo = getBadgeInfo();
        if (newBadgeInfo.badge !== badgeInfo.badge) {
          setTimeout(() => {
            toast({
              title: `🎉 ${newBadgeInfo.badge} Badge Achieved!`,
              description: `Congratulations! You've been promoted to ${newBadgeInfo.badge} volunteer status!`,
            });
          }, 1000);
        }
      }
    }
    
    // Update invitation status
    invitationService.updateInvitationStatus(invitationId, status);
    setInvitations(prev => prev.map(inv => 
      inv.id === invitationId ? { ...inv, status } : inv
    ));
    
    toast({
      title: status === 'accepted' ? "Invitation Accepted! 🎉" : "Invitation Declined",
      description: status === 'accepted' 
        ? "You've successfully joined the campaign! Check your Joined Campaigns tab." 
        : "The invitation has been declined.",
    });
  };

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <Navigation title="Volunteer Dashboard">
          <Button
            variant="outline"
            onClick={() => setShowProfile(false)}
            className="flex items-center space-x-2 hover:bg-blue-50 border-blue-200 bg-white/20 backdrop-blur-sm"
          >
            <User className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Navigation>
        <div className="py-8 relative z-10">
          <VolunteerProfile />
        </div>
      </div>
    );
  }

  const CampaignCard = ({ campaign, isJoined = false }: { campaign: any, isJoined?: boolean }) => (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-l-4 border-l-blue-500 bg-white/95 backdrop-blur-sm hover:-translate-y-2 hover:border-l-purple-500 hover:bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{campaign.name}</h3>
            <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">{campaign.category}</Badge>
            <p className="text-gray-600 mb-4 leading-relaxed">{campaign.description}</p>
          </div>
          <div className="text-right space-y-2">
            <CountdownTimer targetDate={campaign.startDate} targetTime={campaign.startTime} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Manager: {campaign.manager}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{campaign.startDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{campaign.startTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{campaign.location}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="text-sm text-gray-600 mb-2 font-medium">Volunteer Progress</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-800">
                  {campaign.volunteersRegistered}/{campaign.volunteersNeeded}
                </span>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  {Math.round((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 animate-pulse" 
                  style={{ width: `${Math.min((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            {isJoined && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-4 h-4 mr-2" />
              Show Interest
            </Button>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 px-4 py-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Joined
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // ... keep existing code (InvitationCard component)
  const InvitationCard = ({ invitation }: { invitation: Invitation }) => {
    const campaign = [...campaigns, ...extendedCampaigns].find(c => c.id === invitation.campaignId);
    if (!campaign) return null;

    const hourlyRate = 25;

    return (
      <Card className="group hover:shadow-2xl transition-all duration-500 border-l-4 border-l-yellow-500 bg-white/95 backdrop-blur-sm hover:-translate-y-2">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">{campaign.name}</h3>
                <Badge variant={invitation.status === 'pending' ? 'default' : invitation.status === 'accepted' ? 'secondary' : 'destructive'}>
                  {invitation.status}
                </Badge>
              </div>
              <Badge variant="outline" className="mb-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-0">{campaign.category}</Badge>
              <p className="text-gray-600 mb-4 leading-relaxed">{campaign.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Invited {new Date(invitation.invitedDate).toLocaleDateString()}
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                💰 ${hourlyRate}/hour
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Manager: {campaign.manager}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{campaign.startDate} - {campaign.endDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{campaign.startTime} - {campaign.endTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{campaign.location}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="text-sm text-gray-600 mb-2 font-medium">Skills Required</div>
                <div className="flex flex-wrap gap-1">
                  {campaign.skillsRequired.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs bg-white">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {invitation.message && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-sm text-gray-600 mb-2 font-medium">Personal Message from Manager</div>
                  <p className="text-sm text-gray-800 leading-relaxed">{invitation.message}</p>
                </div>
              )}
            </div>
          </div>

          {invitation.status === 'pending' && (
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => handleInvitationResponse(invitation.id, 'declined')}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button 
                onClick={() => handleInvitationResponse(invitation.id, 'accepted')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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

  // ... keep existing code (BadgeCard component)
  const BadgeCard = () => {
    const IconComponent = badgeInfo.icon;
    
    return (
      <Card className="mb-6 bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${badgeInfo.color} flex items-center justify-center shadow-lg`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{badgeInfo.badge} Volunteer</h3>
                <p className="text-gray-600">{badgeInfo.message}</p>
                {badgeInfo.nextTarget && (
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    You joined {joinedCampaigns.length}/{badgeInfo.badge === 'Silver' ? 10 : 5} campaigns • {badgeInfo.nextTarget} more to go!
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-200" />
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3"
                    className={`text-gradient-to-r ${badgeInfo.color.replace('from-', 'text-').replace('to-', '').split(' ')[0]}`}
                    strokeDasharray={`${badgeInfo.progress}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{Math.round(badgeInfo.progress)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>

      <Navigation title="Volunteer Dashboard">
        <Button
          variant="outline"
          onClick={() => setShowProfile(true)}
          className="flex items-center space-x-2 hover:bg-blue-50 border-blue-200 hover:border-blue-300 transition-all duration-300 bg-white/20 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </Navigation>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Badge System */}
        <BadgeCard />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-2">
            <TabsTrigger value="available" className="flex items-center space-x-2 rounded-lg transition-all duration-300">
              <Calendar className="w-4 h-4" />
              <span>Available Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="invited" className="flex items-center space-x-2 rounded-lg transition-all duration-300">
              <Mail className="w-4 h-4" />
              <span>Invited for Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2 rounded-lg transition-all duration-300">
              <CheckCircle className="w-4 h-4" />
              <span>Joined Campaigns</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌟 Available Campaigns
              </h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/90 backdrop-blur-sm shadow-lg">
                {availableCampaigns.length} Available
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invited" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                📧 Campaign Invitations
              </h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/90 backdrop-blur-sm shadow-lg">
                {invitations.filter(inv => inv.status === 'pending').length} Pending
              </Badge>
            </div>
            
            <div className="space-y-6">
              {invitations.map(invitation => (
                <InvitationCard key={invitation.id} invitation={invitation} />
              ))}
            </div>

            {invitations.length === 0 && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4 animate-bounce">📬</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No invitations yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Campaign managers will send you invitations for campaigns that match your skills!
                  </p>
                  <Button 
                    onClick={() => setActiveTab('available')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
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
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ✅ Your Campaigns
              </h2>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/90 backdrop-blur-sm shadow-lg">
                {joinedCampaigns.length} Joined
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} isJoined={true} />
              ))}
            </div>

            {joinedCampaigns.length === 0 && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4 animate-pulse">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No joined campaigns yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore available campaigns and start making a difference!
                  </p>
                  <Button 
                    onClick={() => setActiveTab('available')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
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
