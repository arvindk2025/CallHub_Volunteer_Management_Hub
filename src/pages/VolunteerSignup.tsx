
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';

const VolunteerSignup = () => {
  const [formData, setFormData] = useState({
    role: 'volunteer',
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    state: '',
    availableShifts: [],
    skills: '',
    profilePicture: null
  });
  
  const navigate = useNavigate();

  const shifts = ['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)'];
  const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock save to database
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const newVolunteer = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    volunteers.push(newVolunteer);
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
    
    toast({
      title: "Registration Successful",
      description: "Your volunteer application has been submitted!",
    });
    
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShiftChange = (shift: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        availableShifts: [...formData.availableShifts, shift]
      });
    } else {
      setFormData({
        ...formData,
        availableShifts: formData.availableShifts.filter(s => s !== shift)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Volunteer Registration</CardTitle>
          <CardDescription className="text-center">
            Join our volunteer community and make a difference!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  placeholder="Enter your zip code"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => setFormData({...formData, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
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
                  placeholder="e.g., Communication, Event Planning"
                  value={formData.skills}
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
                      checked={formData.availableShifts.includes(shift)}
                      onCheckedChange={(checked) => handleShiftChange(shift, checked as boolean)}
                    />
                    <Label htmlFor={shift} className="text-sm">{shift}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({...formData, profilePicture: e.target.files[0]})}
                  />
                  <label htmlFor="profilePicture" className="cursor-pointer">
                    <span className="text-sm text-gray-600">Upload a file</span>
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Register as Volunteer
            </Button>
          </form>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerSignup;
