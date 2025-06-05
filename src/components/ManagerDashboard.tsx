
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Download, Copy, History, Settings, Check, X, TrendingUp, Award, Calendar } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import PastVolunteers from './PastVolunteers';
import EmailConfiguration from './EmailConfiguration';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [interestedVolunteers, setInterestedVolunteers] = useState([]);
  const managerId = localStorage.getItem('managerId') || 'default';
  const managerName = localStorage.getItem('managerName') || 'Sarah Johnson';
  const recruitmentLink = `${window.location.origin}/volunteer-signup?ref=${managerId}`;

  // Mock data for demo purposes
  const mockInterestedVolunteers = [
    {
      id: '1',
      volunteerName: 'Alice Johnson',
      volunteerEmail: 'alice@example.com',
      volunteerPhone: '+1234567890',
      volunteerLocation: 'New York, 10001',
      availableShifts: ['Morning', 'Evening'],
      campaignName: 'Community Cleanup',
      volunteerSkills: 'Leadership, Organization',
      appliedDate: '2024-06-05T10:00:00.000Z'
    },
    {
      id: '2',
      volunteerName: 'Bob Smith',
      volunteerEmail: 'bob@example.com',
      volunteerPhone: '+1234567891',
      volunteerLocation: 'California, 90210',
      availableShifts: ['Afternoon'],
      campaignName: 'Food Drive',
      volunteerSkills: 'Communication, Team Work',
      appliedDate: '2024-06-04T14:30:00.000Z'
    },
    {
      id: '3',
      volunteerName: 'Carol White',
      volunteerEmail: 'carol@example.com',
      volunteerPhone: '+1234567892',
      volunteerLocation: 'Texas, 73301',
      availableShifts: ['Morning'],
      campaignName: 'Education Drive',
      volunteerSkills: 'Teaching, Mentoring',
      appliedDate: '2024-06-03T09:15:00.000Z'
    },
    {
      id: '4',
      volunteerName: 'David Brown',
      volunteerEmail: 'david@example.com',
      volunteerPhone: '+1234567893',
      volunteerLocation: 'Florida, 33101',
      availableShifts: ['Evening'],
      campaignName: 'Health Campaign',
      volunteerSkills: 'Healthcare, First Aid',
      appliedDate: '2024-06-02T16:45:00.000Z'
    },
    {
      id: '5',
      volunteerName: 'Emma Davis',
      volunteerEmail: 'emma@example.com',
      volunteerPhone: '+1234567894',
      volunteerLocation: 'Washington, 98101',
      availableShifts: ['Morning', 'Afternoon'],
      campaignName: 'Environmental Awareness',
      volunteerSkills: 'Public Speaking, Research',
      appliedDate: '2024-06-01T11:20:00.000Z'
    }
  ];

  useEffect(() => {
    // Load interested volunteers for this specific manager
    const loadInterestedVolunteers = () => {
      const managerKey = `interestedVolunteers_${managerName}`;
      const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
      
      // If no real data, use mock data for demo
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
    },
    {
      id: '4',
      volunteerName: 'Sarah Wilson',
      volunteerEmail: 'sarah.w@example.com',
      volunteerPhone: '+1234567893',
      volunteerLocation: 'New York, 10001',
      availableShifts: ['Evening'],
      campaignName: 'Community Outreach',
      volunteerSkills: 'Event Planning, Coordination',
      appliedDate: '2024-05-28T15:30:00.000Z'
    }
  ];

  const handleApprove = (volunteerId: string) => {
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

  const VolunteerCard = ({ volunteer, showActions = false }: { volunteer: any, showActions?: boolean }) => (
    <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(volunteer.volunteerName)}`}>
            {getInitials(volunteer.volunteerName)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{volunteer.volunteerName}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{volunteer.campaignName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Applied: {new Date(volunteer.appliedDate).toLocaleDateString()}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">📧 {volunteer.volunteerEmail}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">📱 {volunteer.volunteerPhone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">📍 {volunteer.volunteerLocation}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">⏰ {Array.isArray(volunteer.availableShifts) ? volunteer.availableShifts.join(', ') : volunteer.availableShifts}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {volunteer.volunteerSkills.split(', ').map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            {showActions && (
              <div className="flex gap-3">
                <Button
                  size="sm"
                  onClick={() => handleApprove(volunteer.id)}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReject(volunteer.id)}
                  variant="destructive"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navigation title="Campaign Manager Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-2">
            <TabsTrigger value="overview" className="flex items-center space-x-2 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="interested" className="flex items-center space-x-2 rounded-lg">
              <Users className="w-4 h-4" />
              <span>Interested</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2 rounded-lg">
              <UserCheck className="w-4 h-4" />
              <span>Joined</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2 rounded-lg">
              <History className="w-4 h-4" />
              <span>Past Volunteers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome back, {managerName}! 👋
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Manage your volunteer campaigns and grow your impact
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Interested</p>
                      <p className="text-3xl font-bold">{interestedVolunteers.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Joined</p>
                      <p className="text-3xl font-bold">{joinedVolunteers.length}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Success Rate</p>
                      <p className="text-3xl font-bold">
                        {Math.round((joinedVolunteers.length / (interestedVolunteers.length + joinedVolunteers.length)) * 100) || 0}%
                      </p>
                    </div>
                    <Award className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Active Campaigns</p>
                      <p className="text-3xl font-bold">5</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recruitment Link */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Volunteer Recruitment Center</span>
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Share this unique link to recruit volunteers for your campaigns
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
          </TabsContent>

          <TabsContent value="interested" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Interested Volunteers</h2>
                <p className="text-gray-600 dark:text-gray-300">Review and approve volunteers who have shown interest</p>
              </div>
              <Button onClick={handleExportContacts} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Contacts
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {interestedVolunteers.map((volunteer: any) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} showActions={true} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Joined Volunteers</h2>
                <p className="text-gray-600 dark:text-gray-300">Active volunteers participating in your campaigns</p>
              </div>
              <Button onClick={handleExportContacts} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Contacts
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {joinedVolunteers.map(volunteer => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <PastVolunteers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
