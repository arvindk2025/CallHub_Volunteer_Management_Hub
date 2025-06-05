
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { User, Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'volunteer'
  });
  const [showPassword, setShowPassword] = useState(false);
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

  const handleRoleSelect = (role: string) => {
    setFormData({
      ...formData,
      role: role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl border-0">
        <CardContent className="p-8">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Sign in as</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect('volunteer')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                  formData.role === 'volunteer'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="font-medium">Volunteer</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('manager')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                  formData.role === 'manager'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <Shield className="w-6 h-6" />
                <span className="font-medium">Manager</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
              />
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg"
            >
              Sign In
            </Button>
          </form>
          
          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/volunteer-signup')}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
