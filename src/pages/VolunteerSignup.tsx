
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Heart, Users, Clock, MapPin } from 'lucide-react';

const VolunteerSignup = () => {
  const [formData, setFormData] = useState({
    role: 'volunteer',
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    state: '',
    availableShifts: [],
    skills: ''
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
      title: "🎉 Registration Successful!",
      description: "Welcome to our volunteer community! You can now sign in to your account.",
    });
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Join Our Volunteer Community
          </h1>
          <p className="text-xl text-gray-600">
            Make a difference in your community and create lasting impact!
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Build Community</h3>
              <p className="text-sm text-gray-600">Connect with like-minded people and build lasting relationships</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Flexible Schedule</h3>
              <p className="text-sm text-gray-600">Choose shifts that work with your availability</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Local Impact</h3>
              <p className="text-sm text-gray-600">Make a real difference in your local community</p>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Volunteer Registration</CardTitle>
            <CardDescription className="text-center text-green-100">
              Fill out the form below to get started on your volunteer journey
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipcode" className="text-gray-700 font-medium">Zip Code *</Label>
                    <Input
                      id="zipcode"
                      name="zipcode"
                      placeholder="Enter your zip code"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="state" className="text-gray-700 font-medium">State *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, state: value})}>
                      <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shifts.map(shift => (
                    <div key={shift} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                      <Checkbox
                        id={shift}
                        checked={formData.availableShifts.includes(shift)}
                        onCheckedChange={(checked) => handleShiftChange(shift, checked as boolean)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label htmlFor={shift} className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                        {shift}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-purple-600" />
                  Skills & Interests
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-gray-700 font-medium">Skills & Experience</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="e.g., Communication, Event Planning, Teaching, etc."
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-sm text-gray-500">List any relevant skills or experience you'd like to share</p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 text-lg font-semibold shadow-lg"
              >
                🎉 Join Our Volunteer Community
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Sign In Here
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerSignup;
