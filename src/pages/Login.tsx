
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Eye, EyeOff, User, Shield } from 'lucide-react';

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
    
    localStorage.setItem('userRole', formData.role);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('isAuthenticated', 'true');
    
    if (formData.role === 'manager') {
      const managerId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('managerId', managerId);
      navigate('/manager-dashboard');
    } else {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <Label className="text-gray-700 font-medium mb-4 block">Sign in as</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'volunteer'})}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                  formData.role === 'volunteer' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="font-medium">Volunteer</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'manager'})}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                  formData.role === 'manager' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Shield className="w-6 h-6" />
                <span className="font-medium">Manager</span>
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-2 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign In
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => navigate('/volunteer-signup')}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
