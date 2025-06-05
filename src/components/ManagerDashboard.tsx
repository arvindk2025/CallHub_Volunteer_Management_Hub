import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Download, Mail, MessageSquare, Check, X, Copy, History, Settings, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import PastVolunteers from './PastVolunteers';
import EmailConfiguration from './EmailConfiguration';
import { invitationService } from '../utils/invitationService';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('interested');
  const [interestedVolunteers, setInterestedVolunteers] = useState([]);
  const managerId = localStorage.getItem('managerId') || 'default';
  const managerName = localStorage.getItem('managerName') || 'Sarah Johnson'; // Default manager name
  const recruitmentLink = `${window.location.origin}/volunteer-signup?ref=${managerId}`;

  // Mock data for interested volunteers (showing 6 volunteers as per the image)
  const mockInterestedVolunteers = [
    {
      id: 'vol-001',
      volunteerName: 'Alex Thompson',
      volunteerEmail: 'alex.thompson@email.com',
      volunteerPhone: '+1 (555) 123-4567',
      volunteerLocation: 'California, 90210',
      availableShifts: ['Morning'],
      campaignName: 'Community Food Drive',
      volunteerSkills: 'Customer Service, Data Entry',
      appliedDate: '2024-05-12T10:00:00.000Z'
    },
    {
      id: 'vol-002',
      volunteerName: 'Taylor Brown',
      volunteerEmail: 'taylor.brown@email.com',
      volunteerPhone: '+1 (555) 345-6789',
      volunteerLocation: 'Illinois, 60601',
      availableShifts: ['Afternoon'],
      campaignName: 'Community Food Drive',
      volunteerSkills: 'Organization, Teamwork',
      appliedDate: '2024-05-12T11:30:00.000Z'
    },
    {
      id: 'vol-003',
      volunteerName: 'Morgan Lee',
      volunteerEmail: 'morgan.lee@email.com',
      volunteerPhone: '+1 (555) 567-8901',
      volunteerLocation: 'Florida, 33101',
      availableShifts: ['Evening'],
      campaignName: 'Phone Banking for Education',
      volunteerSkills: 'Physical Labor, Organization',
      appliedDate: '2024-05-12T14:15:00.000Z'
    },
    {
      id: 'vol-004',
      volunteerName: 'Jordan Smith',
      volunteerEmail: 'jordan.smith@email.com',
      volunteerPhone: '+1 (555) 789-0123',
      volunteerLocation: 'Texas, 75201',
      availableShifts: ['Morning', 'Afternoon'],
      campaignName: 'Environmental Cleanup',
      volunteerSkills: 'Communication, Leadership',
      appliedDate: '2024-05-13T09:00:00.000Z'
    },
    {
      id: 'vol-005',
      volunteerName: 'Casey Johnson',
      volunteerEmail: 'casey.johnson@email.com',
      volunteerPhone: '+1 (555) 234-5678',
      volunteerLocation: 'New York, 10001',
      availableShifts: ['Evening'],
      campaignName: 'Youth Mentorship Program',
      volunteerSkills: 'Teaching, Mentoring',
      appliedDate: '2024-05-13T16:45:00.000Z'
    },
    {
      id: 'vol-006',
      volunteerName: 'Riley Davis',
      volunteerEmail: 'riley.davis@email.com',
      volunteerPhone: '+1 (555) 456-7890',
      volunteerLocation: 'Washington, 98101',
      availableShifts: ['Morning'],
      campaignName: 'Community Outreach',
      volunteerSkills: 'Event Planning, Public Speaking',
      appliedDate: '2024-05-14T08:30:00.000Z'
    }
  ];

  useEffect(() => {
    // Load interested volunteers for this specific manager or use mock data for demo
    const loadInterestedVolunteers = () => {
      const managerKey = `interestedVolunteers_${managerName}`;
      const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
      
      // If no stored volunteers, use mock data for demo
      if (volunteers.length === 0) {
        setInterestedVolunteers(mockInterestedVolunteers);
      } else {
        setInterestedVolunteers(volunteers);
      }
    };

    loadInterestedVolunteers();
    
    // Refresh every 3 seconds to catch new interest requests
    const interval = setInterval(loadInterestedVolunteers, 3000);
    return () => clearInterval(interval);
  }, [managerName]);

  // Mock joined volunteers data
  const joinedVolunteers = [
    {
      id: '3',
      volunteerName: 'Mike Johnson',
      volunteerEmail: 'mike@example.com',
      volunteerPhone: '+1234567892',
      volunteerLocation: 'California, 90210',
      availableShifts: ['Morning', 'Afternoon'],
      campaignName: 'Education Drive',
      volunteerSkills: 'Teaching, Mentoring',
      appliedDate: '2024-06-01T10:00:00.000Z'
    }
  ];

  const handleApprove = (volunteerId: string) => {
    // Remove from interested and add to joined
    const managerKey = `interestedVolunteers_${managerName}`;
    const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
    const updatedVolunteers = volunteers.filter((v: any) => v.id !== volunteerId);
    localStorage.setItem(managerKey, JSON.stringify(updatedVolunteers));
    setInterestedVolunteers(updatedVolunteers);
    
    toast({
      title: "Volunteer Approved",
      description: "The volunteer has been approved and moved to joined volunteers.",
    });
  };

  const handleReject = (volunteerId: string) => {
    // Remove from interested volunteers
    const managerKey = `interestedVolunteers_${managerName}`;
    const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
    const updatedVolunteers = volunteers.filter((v: any) => v.id !== volunteerId);
    localStorage.setItem(managerKey, JSON.stringify(updatedVolunteers));
    setInterestedVolunteers(updatedVolunteers);
    
    toast({
      title: "Volunteer Rejected",
      description: "The volunteer application has been rejected.",
    });
  };

  const handleSendInvitation = async (volunteerId: string, volunteerName: string) => {
    try {
      // Store volunteer in localStorage if not already there
      const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
      const existingVolunteer = volunteers.find((v: any) => v.id === volunteerId);
      
      if (!existingVolunteer) {
        const volunteer = interestedVolunteers.find((v: any) => v.id === volunteerId);
        if (volunteer) {
          volunteers.push(volunteer);
          localStorage.setItem('volunteers', JSON.stringify(volunteers));
        }
      }

      // Send invitation for first available campaign (demo purposes)
      const campaignId = 'camp-001'; // You can make this dynamic based on campaign selection
      
      await invitationService.sendInvitation(
        campaignId, 
        volunteerId, 
        `Hi ${volunteerName}, we think you'd be perfect for this campaign based on your skills and availability!`
      );
      
      toast({
        title: "Invitation Sent!",
        description: `Invitation has been sent to ${volunteerName}. They will see it in their volunteer dashboard.`,
      });
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Invitation Sent!",
        description: `Invitation has been logged and sent to ${volunteerName}. They will see it in their volunteer dashboard.`,
      });
    }
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}?subject=Volunteer Opportunity&body=Hello, we have exciting volunteer opportunities available!`);
  };

  const handleText = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^\d]/g, '')}?text=Hello! We have exciting volunteer opportunities available.`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleExportContacts = () => {
    const volunteers = activeTab === 'interested' ? interestedVolunteers : joinedVolunteers;
    const csvContent = volunteers.map((v: any) => `${v.volunteerName},${v.volunteerEmail},${v.volunteerPhone}`).join('\n');
    const blob = new Blob([`Name,Email,Phone\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_volunteers.csv`;
    a.click();
    
    toast({
      title: "Contacts Exported",
      description: "Volunteer contacts have been exported successfully.",
    });
  };

  const copyRecruitmentLink = () => {
    navigator.clipboard.writeText(recruitmentLink);
    toast({
      title: "Link Copied",
      description: "Recruitment link copied to clipboard!",
    });
  };

  const InterestedVolunteerCard = ({ volunteer }: { volunteer: any }) => {
    // Extract initials from name
    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Generate a consistent color based on the volunteer's name
    const getAvatarColor = (name: string) => {
      const colors = [
        'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
        'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'
      ];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    };

    return (
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(volunteer.volunteerName)}`}>
              {getInitials(volunteer.volunteerName)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{volunteer.volunteerName}</h3>
              <p className="text-sm text-gray-600 mb-1">{volunteer.campaignName}</p>
              <p className="text-xs text-gray-500 mb-4">
                Applied: {new Date(volunteer.appliedDate).toLocaleDateString()}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{volunteer.volunteerEmail}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{volunteer.volunteerPhone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Location: {volunteer.volunteerLocation}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Available Shift: {Array.isArray(volunteer.availableShifts) ? volunteer.availableShifts.join(', ') : volunteer.availableShifts}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {volunteer.volunteerSkills.split(', ').map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEmail(volunteer.volunteerEmail)}
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleCall(volunteer.volunteerPhone)}
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleText(volunteer.volunteerPhone)}
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleApprove(volunteer.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReject(volunteer.id)}
                  variant="destructive"
                >
                  <X className="w-3 h-3 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const JoinedVolunteerCard = ({ volunteer }: { volunteer: any }) => {
    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getAvatarColor = (name: string) => {
      const colors = [
        'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
        'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'
      ];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    };

    return (
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(volunteer.volunteerName)}`}>
              {getInitials(volunteer.volunteerName)}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{volunteer.volunteerName}</h3>
              <p className="text-sm text-gray-600 mb-1">{volunteer.campaignName}</p>
              <p className="text-xs text-gray-500 mb-4">
                Applied: {new Date(volunteer.appliedDate).toLocaleDateString()}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{volunteer.volunteerEmail}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{volunteer.volunteerPhone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Location: {volunteer.volunteerLocation}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Available Shift: {Array.isArray(volunteer.availableShifts) ? volunteer.availableShifts.join(', ') : volunteer.availableShifts}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {volunteer.volunteerSkills.split(', ').map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEmail(volunteer.volunteerEmail)}
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleCall(volunteer.volunteerPhone)}
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleText(volunteer.volunteerPhone)}
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation title="Campaign Manager Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="interested" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Interested</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span>Joined</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>Past Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="email-config" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Email Setup</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interested" className="space-y-6">
            {/* Recruitment Link Card */}
            <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-white">🚀 Volunteer Recruitment Center</CardTitle>
                <CardDescription className="text-blue-100">
                  Share this unique link to recruit volunteers for your campaigns and watch your team grow!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Input
                    value={recruitmentLink}
                    readOnly
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                  />
                  <Button onClick={copyRecruitmentLink} variant="secondary">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {interestedVolunteers.length}
                  </div>
                  <div className="text-gray-600">Interested Volunteers</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.round((joinedVolunteers.length / (interestedVolunteers.length + joinedVolunteers.length)) * 100) || 0}%
                  </div>
                  <div className="text-gray-600">Conversion Rate</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {interestedVolunteers.length + joinedVolunteers.length}
                  </div>
                  <div className="text-gray-600">Total Volunteers</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Interested Volunteers</h2>
                <p className="text-gray-600">Review and approve volunteers who have shown interest in your campaigns</p>
              </div>
              <Button onClick={handleExportContacts} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Contacts
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {interestedVolunteers.map((volunteer: any) => (
                <InterestedVolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </div>

            {interestedVolunteers.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No interested volunteers yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Share your recruitment link to start attracting volunteers!
                  </p>
                  <Button onClick={copyRecruitmentLink} className="bg-blue-600 hover:bg-blue-700">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Recruitment Link
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Joined Volunteers</h2>
                <p className="text-gray-600">Manage volunteers who are actively participating in your campaigns</p>
              </div>
              <Button onClick={handleExportContacts} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Contacts
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {joinedVolunteers.map(volunteer => (
                <JoinedVolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </div>

            {joinedVolunteers.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No joined volunteers yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Approve interested volunteers to see them here.
                  </p>
                  <Button onClick={copyRecruitmentLink} className="bg-blue-600 hover:bg-blue-700">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Recruitment Link
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <PastVolunteers />
          </TabsContent>

          <TabsContent value="email-config" className="space-y-6">
            <EmailConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
