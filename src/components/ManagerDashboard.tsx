
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Download, Mail, MessageSquare, Check, X, Copy } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

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
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={volunteer.profilePicture}
            alt={volunteer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{volunteer.name}</h3>
            <p className="text-gray-600">{volunteer.email}</p>
            <p className="text-gray-600">{volunteer.phone}</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Availability:</span>
                <Badge variant="secondary">{volunteer.availability}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Preferred Campaign:</span>
                <Badge variant="outline">{volunteer.preferredCampaign}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Skills:</span>
                <span className="text-sm text-gray-600">{volunteer.skills}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {showActions && activeTab === 'interested' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleApprove(volunteer.id)}
                  className="bg-green-600 hover:bg-green-700"
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
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleText(volunteer.phone)}
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Campaign Manager Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={activeTab === 'interested' ? 'default' : 'outline'}
                onClick={() => setActiveTab('interested')}
              >
                <Users className="w-4 h-4 mr-2" />
                Interested Volunteers
              </Button>
              <Button
                variant={activeTab === 'joined' ? 'default' : 'outline'}
                onClick={() => setActiveTab('joined')}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Joined Volunteers
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recruitment Link Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Volunteer Recruitment</CardTitle>
            <CardDescription>
              Share this unique link to recruit volunteers for your campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                value={recruitmentLink}
                readOnly
                className="flex-1"
              />
              <Button onClick={copyRecruitmentLink}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === 'interested' ? 'Interested Volunteers' : 'Joined Volunteers'}
          </h2>
          <Button onClick={handleExportContacts}>
            <Download className="w-4 h-4 mr-2" />
            Export Contacts
          </Button>
        </div>

        {/* Volunteers List */}
        <div className="space-y-4">
          {activeTab === 'interested' && interestedVolunteers.map(volunteer => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
          {activeTab === 'joined' && joinedVolunteers.map(volunteer => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} showActions={false} />
          ))}
        </div>

        {((activeTab === 'interested' && interestedVolunteers.length === 0) || 
          (activeTab === 'joined' && joinedVolunteers.length === 0)) && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">
                No {activeTab} volunteers yet. Share your recruitment link to get started!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
