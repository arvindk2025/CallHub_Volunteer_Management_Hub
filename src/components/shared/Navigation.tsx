
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';

const Navigation = ({ 
  showProfile = true, 
  title = "CallHub",
  children 
}: { 
  showProfile?: boolean;
  title?: string;
  children?: React.ReactNode;
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('managerId');
    navigate('/');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      navigate('/login');
    }
  };

  const goToDashboard = () => {
    if (userRole === 'manager') {
      navigate('/manager-dashboard');
    } else if (userRole === 'volunteer') {
      navigate('/volunteer-dashboard');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-2xl font-bold text-blue-600">{title}</div>
            <Badge variant="secondary" className="ml-2">Volunteer Hub</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            {children}
            
            {showProfile && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated && userEmail && (
                    <span className="hidden md:block">{userEmail}</span>
                  )}
                </Button>

                {showProfileMenu && isAuthenticated && (
                  <Card className="absolute right-0 top-full mt-2 w-64 z-50 bg-white shadow-lg">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="border-b pb-3">
                          <p className="text-sm font-medium">{userEmail}</p>
                          <Badge variant="outline" className="mt-1">
                            {userRole === 'manager' ? 'Campaign Manager' : 'Volunteer'}
                          </Badge>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={goToDashboard}
                          className="w-full justify-start"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Go to Dashboard
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
