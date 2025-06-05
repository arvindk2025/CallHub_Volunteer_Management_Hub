
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { User, Upload, Save } from 'lucide-react';

const VolunteerProfile = () => {
  const userEmail = localStorage.getItem('userEmail') || 'volunteer@example.com';
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: userEmail,
    phone: '+1234567890',
    zipcode: '12345',
    state: 'California',
    availableShifts: ['Morning (6AM-12PM)', 'Evening (6PM-12AM)'],
    skills: 'Communication, Event Planning',
    profilePicture: '/placeholder.svg'
  });

  const shifts = ['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)'];
  const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleShiftChange = (shift: string, checked: boolean) => {
    if (checked) {
      setProfileData({
        ...profileData,
        availableShifts: [...profileData.availableShifts, shift]
      });
    } else {
      setProfileData({
        ...profileData,
        availableShifts: profileData.availableShifts.filter(s => s !== shift)
      });
    }
  };

  const handleSave = () => {
    // Update profile information
    localStorage.setItem('volunteerProfile', JSON.stringify(profileData));
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated!",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Edit Profile</span>
          </CardTitle>
          <CardDescription>
            Update your volunteer information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
              />
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full"
                variant="outline"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipcode">Zip Code</Label>
              <Input
                id="zipcode"
                name="zipcode"
                value={profileData.zipcode}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select onValueChange={(value) => setProfileData({...profileData, state: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={profileData.state} />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={profileData.skills}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Available Shifts</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {shifts.map(shift => (
                <div key={shift} className="flex items-center space-x-2">
                  <Checkbox
                    id={shift}
                    checked={profileData.availableShifts.includes(shift)}
                    onCheckedChange={(checked) => handleShiftChange(shift, checked as boolean)}
                  />
                  <Label htmlFor={shift} className="text-sm">{shift}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerProfile;
