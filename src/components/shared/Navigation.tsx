
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

interface NavigationProps {
  title: string;
  children?: React.ReactNode;
}

const Navigation = ({ title, children }: NavigationProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {children}
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
