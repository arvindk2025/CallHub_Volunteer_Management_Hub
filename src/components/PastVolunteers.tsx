
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Star, Calendar, Filter } from 'lucide-react';

const PastVolunteers = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Mock data for past volunteers
  const pastVolunteers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1234567890',
      rating: 4.8,
      lastActive: '3 days ago',
      totalCampaigns: 12,
      availability: 'Morning, Afternoon',
      skills: 'Leadership, Public Speaking',
      profilePicture: '/placeholder.svg',
      pastCampaigns: ['Community Cleanup', 'Food Drive', 'Education Fair']
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1234567891',
      rating: 4.9,
      lastActive: '1 week ago',
      totalCampaigns: 8,
      availability: 'Evening, Night',
      skills: 'Organization, Event Planning',
      profilePicture: '/placeholder.svg',
      pastCampaigns: ['Health Awareness', 'Youth Mentoring']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      phone: '+1234567892',
      rating: 4.6,
      lastActive: '2 weeks ago',
      totalCampaigns: 15,
      availability: 'Morning, Evening',
      skills: 'Communication, Team Building',
      profilePicture: '/placeholder.svg',
      pastCampaigns: ['Environmental Cleanup', 'Senior Care', 'Animal Rescue']
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1234567893',
      rating: 4.3,
      lastActive: '1 month ago',
      totalCampaigns: 6,
      availability: 'Afternoon, Evening',
      skills: 'Technical Support, Training',
      profilePicture: '/placeholder.svg',
      pastCampaigns: ['Digital Literacy', 'Tech Workshop']
    }
  ];

  // Mock campaigns for invitation
  const availableCampaigns = [
    { id: '1', name: 'Community Garden Project', date: '2024-07-15' },
    { id: '2', name: 'Blood Donation Drive', date: '2024-07-20' },
    { id: '3', name: 'Children Education Program', date: '2024-07-25' },
    { id: '4', name: 'Senior Citizen Support', date: '2024-08-01' }
  ];

  const handleInvite = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowInviteModal(true);
  };

  const handleCampaignInvite = (campaignId) => {
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${selectedVolunteer.name} for the selected campaign.`,
    });
    setShowInviteModal(false);
  };

  const filteredVolunteers = pastVolunteers.filter(volunteer => {
    let passesFilter = true;

    // Filter by last active
    if (selectedFilter !== 'all') {
      const activeFilter = selectedFilter;
      if (activeFilter === 'week' && !volunteer.lastActive.includes('days ago')) passesFilter = false;
      if (activeFilter === 'month' && volunteer.lastActive.includes('month')) passesFilter = false;
    }

    // Filter by rating
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      if (volunteer.rating < minRating) passesFilter = false;
    }

    // Filter by shift
    if (shiftFilter !== 'all') {
      if (!volunteer.availability.toLowerCase().includes(shiftFilter.toLowerCase())) passesFilter = false;
    }

    return passesFilter;
  });

  const VolunteerCard = ({ volunteer }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={volunteer.profilePicture}
            alt={volunteer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{volunteer.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{volunteer.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{volunteer.email}</p>
            <p className="text-gray-600 text-sm">{volunteer.phone}</p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Last Active:</span>
                <Badge variant="outline" className="text-xs">{volunteer.lastActive}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Total Campaigns:</span>
                <Badge variant="secondary" className="text-xs">{volunteer.totalCampaigns}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Availability:</span>
                <Badge variant="outline" className="text-xs">{volunteer.availability}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Skills:</span>
                <span className="text-sm text-gray-600">{volunteer.skills}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Past Campaigns:</span>
                <div className="flex flex-wrap gap-1">
                  {volunteer.pastCampaigns.slice(0, 2).map(campaign => (
                    <Badge key={campaign} variant="secondary" className="text-xs">{campaign}</Badge>
                  ))}
                  {volunteer.pastCampaigns.length > 2 && (
                    <Badge variant="secondary" className="text-xs">+{volunteer.pastCampaigns.length - 2} more</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              onClick={() => handleInvite(volunteer)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Volunteers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Active</label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Shift</label>
              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Past Volunteers ({filteredVolunteers.length})
        </h2>
        
        {filteredVolunteers.map(volunteer => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Invite {selectedVolunteer.name}</CardTitle>
              <CardDescription>Select a campaign to invite this volunteer to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableCampaigns.map(campaign => (
                <Button
                  key={campaign.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleCampaignInvite(campaign.id)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.date}</div>
                  </div>
                </Button>
              ))}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PastVolunteers;
