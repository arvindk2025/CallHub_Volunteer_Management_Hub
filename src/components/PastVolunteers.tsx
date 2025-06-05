
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Star, Calendar, Send, Filter, Mail, Users } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { volunteers, campaigns } from '../data/campaigns';
import { invitationService } from '../utils/invitationService';

const PastVolunteers = () => {
  const [filterBy, setFilterBy] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | null>(null);
  const [isBulkInviteDialogOpen, setIsBulkInviteDialogOpen] = useState(false);
  const [bulkCampaign, setBulkCampaign] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');

  // Filter volunteers based on selected criteria
  const filteredVolunteers = volunteers.filter(volunteer => {
    // Filter by last active days
    if (filterBy !== 'all') {
      const activeDays = parseInt(volunteer.lastActive.split(' ')[0]);
      if (filterBy === 'recent' && activeDays > 7) return false;
      if (filterBy === 'week' && (activeDays <= 7 || activeDays > 30)) return false;
      if (filterBy === 'month' && activeDays <= 30) return false;
    }

    // Filter by rating
    if (ratingFilter !== 'all') {
      const rating = volunteer.rating;
      if (ratingFilter === '5' && rating < 5) return false;
      if (ratingFilter === '4' && (rating < 4 || rating >= 5)) return false;
      if (ratingFilter === '3' && (rating < 3 || rating >= 4)) return false;
    }

    // Filter by shift
    if (shiftFilter !== 'all') {
      const shift = volunteer.shiftTime.toLowerCase();
      if (shiftFilter === 'morning' && !shift.includes('9:00 am')) return false;
      if (shiftFilter === 'afternoon' && !shift.includes('1:00 pm')) return false;
      if (shiftFilter === 'evening' && !shift.includes('5:00 pm')) return false;
    }

    return true;
  });

  const handleInviteVolunteer = (volunteerId: string) => {
    setSelectedVolunteer(volunteerId);
    setIsInviteDialogOpen(true);
  };

  const handleSendInvitation = async () => {
    if (!selectedCampaign || !selectedVolunteer) {
      toast({
        title: "Error",
        description: "Please select a campaign and volunteer.",
      });
      return;
    }

    try {
      await invitationService.sendInvitation(selectedCampaign, selectedVolunteer, inviteMessage);
      
      toast({
        title: "Invitation Sent Successfully!",
        description: "The volunteer has been invited to the campaign and will receive an email notification.",
      });

      setIsInviteDialogOpen(false);
      setSelectedCampaign('');
      setInviteMessage('');
      setSelectedVolunteer(null);
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Invitation Sent",
        description: "The invitation has been sent to the volunteer dashboard.",
      });

      setIsInviteDialogOpen(false);
      setSelectedCampaign('');
      setInviteMessage('');
      setSelectedVolunteer(null);
    }
  };

  const handleBulkInvitation = async () => {
    if (!bulkCampaign) {
      toast({
        title: "Error",
        description: "Please select a campaign for bulk invitation.",
      });
      return;
    }

    if (filteredVolunteers.length === 0) {
      toast({
        title: "Error",
        description: "No volunteers match the current filters.",
      });
      return;
    }

    console.log(`🚀 Starting bulk invitation for ${filteredVolunteers.length} filtered volunteers...`);
    console.log('📋 Filtered volunteers:', filteredVolunteers.map(v => ({ id: v.id, name: v.name, email: v.email })));

    try {
      const campaign = campaigns.find(c => c.id === bulkCampaign);
      if (!campaign) {
        console.error('❌ Campaign not found for bulk invitation');
        return;
      }

      console.log('✅ Found campaign for bulk invitation:', campaign.name);

      // Extract volunteer IDs from filtered volunteers
      const volunteerIds = filteredVolunteers.map(volunteer => volunteer.id);
      console.log('📤 Volunteer IDs to send invitations to:', volunteerIds);

      // Use the bulk invitation service
      const sentInvitations = await invitationService.sendBulkInvitations(
        bulkCampaign, 
        volunteerIds, 
        bulkMessage || `Hello! You've been selected for the ${campaign.name} campaign. We believe your skills would be a great fit for this opportunity!`
      );

      console.log('✅ Bulk invitations completed:', sentInvitations.length);

      toast({
        title: "Bulk Invitations Sent Successfully!",
        description: `${sentInvitations.length} out of ${filteredVolunteers.length} volunteers have been invited to ${campaign.name} campaign.`,
      });

      setIsBulkInviteDialogOpen(false);
      setBulkCampaign('');
      setBulkMessage('');
    } catch (error) {
      console.error('❌ Error in bulk invitation process:', error);
      toast({
        title: "Bulk Invitations Processed",
        description: `Invitations have been processed for ${filteredVolunteers.length} volunteers. Check console for details.`,
        variant: "destructive"
      });

      setIsBulkInviteDialogOpen(false);
      setBulkCampaign('');
      setBulkMessage('');
    }
  };

  const VolunteerCard = ({ volunteer }: { volunteer: any }) => (
    <Card className="mb-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={volunteer.profilePicture}
            alt={volunteer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900">{volunteer.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{volunteer.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {volunteer.totalCampaigns} campaigns
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{volunteer.email}</p>
            <p className="text-gray-600 text-sm mb-3">{volunteer.city}, {volunteer.state}, {volunteer.country}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Shift Time:</span>
                  <Badge variant="secondary" className="text-xs">{volunteer.shiftTime}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Last Active:</span>
                  <span className="text-sm text-gray-600">{volunteer.lastActive}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Rating:</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(volunteer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600">({volunteer.rating})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Total Campaigns:</span>
                  <span className="text-sm text-gray-600">{volunteer.totalCampaigns}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Skills:</span>
              <div className="flex flex-wrap gap-1">
                {volunteer.skills.map((skill: string) => (
                  <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              onClick={() => handleInviteVolunteer(volunteer.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Send className="w-4 h-4 mr-1" />
              Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">🏆 Past Volunteers</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/80 backdrop-blur-sm">
            {filteredVolunteers.length} Volunteers
          </Badge>
          {filteredVolunteers.length > 0 && (
            <Button
              onClick={() => setIsBulkInviteDialogOpen(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Send Bulk Invitation ({filteredVolunteers.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Volunteers</span>
          </CardTitle>
          <CardDescription>Filter volunteers by last active days, rating, and available shifts. Use bulk invitation to send campaigns to all filtered volunteers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Last Active</Label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <SelectValue placeholder="All volunteers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All volunteers</SelectItem>
                  <SelectItem value="recent">Last 7 days</SelectItem>
                  <SelectItem value="week">7-30 days ago</SelectItem>
                  <SelectItem value="month">30+ days ago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Rating</Label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ratings</SelectItem>
                  <SelectItem value="5">5 stars</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Available Shift</Label>
              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All shifts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All shifts</SelectItem>
                  <SelectItem value="morning">Morning (9AM-1PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (1PM-5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM-9PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volunteers List */}
      <div className="space-y-4">
        {filteredVolunteers.map(volunteer => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>

      {filteredVolunteers.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No volunteers found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more volunteers.
            </p>
            <Button 
              onClick={() => {
                setFilterBy('all');
                setRatingFilter('all');
                setShiftFilter('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Individual Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Volunteer to Campaign</DialogTitle>
            <DialogDescription>
              Select a campaign and add a personal message for the volunteer. An email will be sent automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign">Select Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name} - {campaign.manager}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to the volunteer..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendInvitation} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Invite Dialog */}
      <Dialog open={isBulkInviteDialogOpen} onOpenChange={setIsBulkInviteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Bulk Invitation to Filtered Volunteers</DialogTitle>
            <DialogDescription>
              Send campaign invitations to all {filteredVolunteers.length} filtered volunteers at once. Each volunteer will receive a personalized email with campaign details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-campaign">Select Campaign</Label>
              <Select value={bulkCampaign} onValueChange={setBulkCampaign}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a campaign for bulk invitation" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name} - {campaign.manager} ({campaign.startDate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bulk-message">Personal Message (Optional)</Label>
              <Textarea
                id="bulk-message"
                placeholder="Add a personal message that will be sent to all volunteers..."
                value={bulkMessage}
                onChange={(e) => setBulkMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Volunteers to be invited:</h4>
              <div className="flex flex-wrap gap-2">
                {filteredVolunteers.slice(0, 10).map(volunteer => (
                  <Badge key={volunteer.id} variant="secondary" className="text-xs">
                    {volunteer.name}
                  </Badge>
                ))}
                {filteredVolunteers.length > 10 && (
                  <Badge variant="outline" className="text-xs">
                    +{filteredVolunteers.length - 10} more
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsBulkInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBulkInvitation} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                Send to {filteredVolunteers.length} Volunteers
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PastVolunteers;
