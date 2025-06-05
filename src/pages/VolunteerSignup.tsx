
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Heart, User, Clock, MapPin, Users } from 'lucide-react';

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
      title: "Registration Successful!",
      description: "You have successfully registered as a volunteer. Redirecting to login...",
    });
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="text-center py-8 px-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Our Volunteer Community</h1>
          <p className="text-gray-600">Make a difference in your community and create lasting impact!</p>
        </div>

        {/* Features */}
        <div className="px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Build Community</h3>
              <p className="text-xs text-gray-600 mt-1">Connect with like-minded people and build lasting relationships</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Flexible Schedule</h3>
              <p className="text-xs text-gray-600 mt-1">Choose shifts that work with your availability</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Local Impact</h3>
              <p className="text-xs text-gray-600 mt-1">Make a real difference in your local community</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-6 mb-8">
          <h2 className="text-xl font-bold text-white text-center mb-2">Volunteer Registration</h2>
          <p className="text-green-100 text-center text-sm">Fill out the form below to get started on your volunteer journey</p>
        </div>

        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-gray-600" />
                <Label className="text-gray-800 font-semibold">Personal Information</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 text-sm">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-10 rounded-lg border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700 text-sm">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-10 rounded-lg border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700 text-sm">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-10 rounded-lg border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipcode" className="text-gray-700 text-sm">Zip Code *</Label>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    placeholder="Enter your zip code"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-10 rounded-lg border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="state" className="text-gray-700 text-sm">State *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, state: value})}>
                    <SelectTrigger className="mt-1 h-10 rounded-lg border-gray-200">
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
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600" />
                <Label className="text-gray-800 font-semibold">Availability</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shifts.map(shift => (
                  <div key={shift} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={shift}
                      checked={formData.availableShifts.includes(shift)}
                      onCheckedChange={(checked) => handleShiftChange(shift, checked as boolean)}
                    />
                    <Label htmlFor={shift} className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                      {shift}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Interests */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-gray-600" />
                <Label className="text-gray-800 font-semibold">Skills & Interests</Label>
              </div>
              
              <div>
                <Label htmlFor="skills" className="text-gray-700 text-sm">Skills & Experience</Label>
                <Input
                  id="skills"
                  name="skills"
                  placeholder="e.g., Communication, Event Planning, Teaching, etc."
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="mt-1 h-10 rounded-lg border-gray-200 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">List any relevant skills or experience you'd like to share</p>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Join Our Volunteer Community</span>
            </Button>
          </form>
          
          {/* Sign In Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">Already have an account? </span>
            <button 
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline text-sm"
            >
              Sign In Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignup;
