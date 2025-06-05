import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'volunteer'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if coming from email invitation link
    const fromInvitation = searchParams.get('from') === 'invitation';
    if (fromInvitation) {
      setFormData(prev => ({ ...prev, role: 'volunteer' }));
      toast({
        title: "Welcome!",
        description: "Please sign in to view your campaign invitation.",
      });
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call your backend
    localStorage.setItem('userRole', formData.role);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('isAuthenticated', 'true');
    
    if (formData.role === 'manager') {
      // Generate unique manager ID for recruitment link
      const managerId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('managerId', managerId);
      navigate('/manager-dashboard');
    } else {
      // Generate volunteer ID for invitation tracking
      const volunteerId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('volunteerId', volunteerId);
      navigate('/volunteer-dashboard');
    }
    
    toast({
      title: "Login Successful",
      description: `Welcome ${formData.role}!`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Volunteer Management Hub</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Select Role</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({...formData, role: value})}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volunteer" id="volunteer" />
                  <Label htmlFor="volunteer">Volunteer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manager" id="manager" />
                  <Label htmlFor="manager">Campaign Manager</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/volunteer-signup')}
              className="text-blue-600 hover:underline"
            >
              Sign up as Volunteer
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
