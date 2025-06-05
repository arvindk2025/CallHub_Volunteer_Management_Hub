
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Mail, Phone, MapPin, Calendar, User } from 'lucide-react';

const PastVolunteers = () => {
  const pastVolunteers = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 234-5678',
      campaigns: ['Environment Cleanup', 'Food Drive 2023'],
      totalHours: 45,
      rating: 4.8,
      lastActive: '2024-03-15',
      skills: ['Leadership', 'Organization'],
      location: 'New York, NY',
      profilePicture: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 345-6789',
      campaigns: ['Education Initiative', 'Community Outreach'],
      totalHours: 62,
      rating: 4.9,
      lastActive: '2024-02-28',
      skills: ['Teaching', 'Communication'],
      location: 'San Francisco, CA',
      profilePicture: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Ananya Sharma',
      email: 'ananya.sharma@email.com',
      phone: '+1 (555) 456-7890',
      campaigns: ['Health Awareness', 'Digital Literacy'],
      totalHours: 38,
      rating: 4.7,
      lastActive: '2024-04-10',
      skills: ['Healthcare', 'Technology'],
      location: 'Austin, TX',
      profilePicture: null // This will trigger the fallback
    }
  ];

  const handleContactVolunteer = (email: string) => {
    window.open(`mailto:${email}?subject=New Volunteer Opportunity&body=Hello! We have a new volunteer opportunity that might interest you.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">📚 Past Volunteers</h2>
          <p className="text-gray-600 mt-2">Volunteers who have previously participated in campaigns</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/80 backdrop-blur-sm">
          {pastVolunteers.length} Past Volunteers
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastVolunteers.map(volunteer => (
          <Card key={volunteer.id} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-l-4 border-l-purple-500">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                {volunteer.profilePicture ? (
                  <img
                    src={volunteer.profilePicture}
                    alt={volunteer.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {volunteer.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg">{volunteer.name}</CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{volunteer.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{volunteer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{volunteer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{volunteer.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last active: {volunteer.lastActive}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">Campaign History</div>
                <div className="space-y-1">
                  {volunteer.campaigns.map(campaign => (
                    <Badge key={campaign} variant="outline" className="text-xs mr-1">{campaign}</Badge>
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">{volunteer.totalHours} hours</span> volunteered
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
                <div className="flex flex-wrap gap-1">
                  {volunteer.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => handleContactVolunteer(volunteer.email)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact for New Campaign
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {pastVolunteers.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No past volunteers yet
            </h3>
            <p className="text-gray-600">
              Previous campaign volunteers will appear here for future reference.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PastVolunteers;
