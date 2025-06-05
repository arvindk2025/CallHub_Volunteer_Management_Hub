import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Download, Mail, MessageSquare, Check, X, Copy, History, Settings } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import PastVolunteers from './PastVolunteers';
import EmailConfiguration from './EmailConfiguration';
import { invitationService } from '../utils/invitationService';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('interested');
  const managerId = localStorage.getItem('managerId') || 'default';
  const recruitmentLink = `${window.location.origin}/volunteer-signup?ref=${managerId}`;

  // Mock data - in real app, this would come from your database
  const interestedVolunteers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      availability: 'Morning, Evening',
      preferredCampaign: 'Community Outreach',
      skills: 'Communication, Event Planning',
      profilePicture: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      availability: 'Afternoon',
      preferredCampaign: 'Environmental Cleanup',
      skills: 'Leadership, Organization',
      profilePicture: '/placeholder.svg'
    }
  ];

  const joinedVolunteers = [
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1234567892',
      availability: 'Morning, Afternoon',
      preferredCampaign: 'Education Drive',
      skills: 'Teaching, Mentoring',
      profilePicture: '/placeholder.svg'
    }
  ];

  const handleApprove = (volunteerId: string) => {
    toast({
      title: "Volunteer Approved",
      description: "The volunteer has been approved and moved to joined volunteers.",
    });
  };

  const handleReject = (volunteerId: string) => {
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
        const volunteer = interestedVolunteers.find(v => v.id === volunteerId);
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

  const handleExportContacts = () => {
    const volunteers = activeTab === 'interested' ? interestedVolunteers : joinedVolunteers;
    const csvContent = volunteers.map(v => `${v.name},${v.email},${v.phone}`).join('\n');
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

  const VolunteerCard = ({ volunteer, showActions = true }: { volunteer: any, showActions?: boolean }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={volunteer.profilePicture}
            alt={volunteer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{volunteer.name}</h3>
            <p className="text-gray-600 text-sm">{volunteer.email}</p>
            <p className="text-gray-600 text-sm">{volunteer.phone}</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Availability:</span>
                <Badge variant="secondary" className="text-xs">{volunteer.availability}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Preferred Campaign:</span>
                <Badge variant="outline" className="text-xs">{volunteer.preferredCampaign}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Skills:</span>
                <span className="text-sm text-gray-600">{volunteer.skills}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {showActions && activeTab === 'interested' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleSendInvitation(volunteer.id, volunteer.name)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Send Invitation
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleApprove(volunteer.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(volunteer.id)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEmail(volunteer.email)}
              className="hover:bg-blue-50"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleText(volunteer.phone)}
              className="hover:bg-green-50"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Text
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
              <h2 className="text-3xl font-bold text-gray-900">👋 Interested Volunteers</h2>
              <Button onClick={handleExportContacts} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Contacts
              </Button>
            </div>

            <div className="space-y-4">
              {interestedVolunteers.map(volunteer => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
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
              <h2 className="text-3xl font-bold text-gray-900">✅ Joined Volunteers</h2>
              <Button onClick={handleExportContacts} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Contacts
              </Button>
            </div>

            <div className="space-y-4">
              {joinedVolunteers.map(volunteer => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} showActions={false} />
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
