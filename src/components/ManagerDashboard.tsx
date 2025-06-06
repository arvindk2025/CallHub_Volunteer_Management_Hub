import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, UserCheck, Download, Mail, MessageSquare, Check, X, Copy, History, Settings, Phone, MapPin, Clock, Upload, Send, Filter, Star, Eye, Moon, Sun, Share2, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Navigation from './shared/Navigation';
import PastVolunteers from './PastVolunteers';
import EmailConfiguration from './EmailConfiguration';
import { invitationService } from '../utils/invitationService';
import { emailService } from '../utils/emailService';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('interested');
  const [interestedVolunteers, setInterestedVolunteers] = useState([]);
  const [joinedVolunteers, setJoinedVolunteers] = useState([]);
  const [filterRating, setFilterRating] = useState('all');
  const [filterShift, setFilterShift] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [bulkEmails, setBulkEmails] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [showBulkRecruit, setShowBulkRecruit] = useState(false);
  const [isSendingBulk, setIsSendingBulk] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  const managerId = localStorage.getItem('managerId') || 'default';
  const managerName = localStorage.getItem('managerName') || 'Sarah Johnson';
  const recruitmentLink = `${window.location.origin}/volunteer-signup?ref=${managerId}`;

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply theme on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Enhanced mock data for interested volunteers with more entries
  const mockInterestedVolunteers = [
    {
      id: 'vol-001',
      volunteerName: 'Alex Thompson',
      volunteerEmail: 'alex.thompson@email.com',
      volunteerPhone: '+1 (555) 123-4567',
      volunteerLocation: 'California, 90210',
      availableShifts: ['Morning'],
      campaignName: 'Community Food Drive',
      volunteerSkills: 'Customer Service, Data Entry',
      appliedDate: '2024-05-12T10:00:00.000Z',
      rating: 4.8,
      totalCampaigns: 12
    },
    {
      id: 'vol-002',
      volunteerName: 'Taylor Brown',
      volunteerEmail: 'taylor.brown@email.com',
      volunteerPhone: '+1 (555) 345-6789',
      volunteerLocation: 'Illinois, 60601',
      availableShifts: ['Afternoon'],
      campaignName: 'Community Food Drive',
      volunteerSkills: 'Organization, Teamwork',
      appliedDate: '2024-05-12T11:30:00.000Z',
      rating: 4.5,
      totalCampaigns: 8
    },
    {
      id: 'vol-003',
      volunteerName: 'Morgan Lee',
      volunteerEmail: 'morgan.lee@email.com',
      volunteerPhone: '+1 (555) 567-8901',
      volunteerLocation: 'Florida, 33101',
      availableShifts: ['Evening'],
      campaignName: 'Phone Banking for Education',
      volunteerSkills: 'Physical Labor, Organization',
      appliedDate: '2024-05-12T14:15:00.000Z',
      rating: 4.2,
      totalCampaigns: 5
    },
    {
      id: 'vol-004',
      volunteerName: 'Jordan Smith',
      volunteerEmail: 'jordan.smith@email.com',
      volunteerPhone: '+1 (555) 789-0123',
      volunteerLocation: 'Texas, 75201',
      availableShifts: ['Morning', 'Afternoon'],
      campaignName: 'Environmental Cleanup',
      volunteerSkills: 'Communication, Leadership',
      appliedDate: '2024-05-13T09:00:00.000Z',
      rating: 4.9,
      totalCampaigns: 15
    },
    {
      id: 'vol-005',
      volunteerName: 'Casey Johnson',
      volunteerEmail: 'casey.johnson@email.com',
      volunteerPhone: '+1 (555) 234-5678',
      volunteerLocation: 'New York, 10001',
      availableShifts: ['Evening'],
      campaignName: 'Youth Mentorship Program',
      volunteerSkills: 'Teaching, Mentoring',
      appliedDate: '2024-05-13T16:45:00.000Z',
      rating: 4.7,
      totalCampaigns: 10
    },
    {
      id: 'vol-006',
      volunteerName: 'Riley Davis',
      volunteerEmail: 'riley.davis@email.com',
      volunteerPhone: '+1 (555) 456-7890',
      volunteerLocation: 'Washington, 98101',
      availableShifts: ['Morning'],
      campaignName: 'Community Outreach',
      volunteerSkills: 'Event Planning, Public Speaking',
      appliedDate: '2024-05-14T08:30:00.000Z',
      rating: 4.6,
      totalCampaigns: 7
    },
    {
      id: 'vol-007',
      volunteerName: 'Sam Rodriguez',
      volunteerEmail: 'sam.rodriguez@email.com',
      volunteerPhone: '+1 (555) 987-6543',
      volunteerLocation: 'Arizona, 85001',
      availableShifts: ['Afternoon', 'Evening'],
      campaignName: 'Food Distribution',
      volunteerSkills: 'Physical Labor, Logistics',
      appliedDate: '2024-05-15T12:00:00.000Z',
      rating: 4.3,
      totalCampaigns: 6
    },
    {
      id: 'vol-008',
      volunteerName: 'Avery Chen',
      volunteerEmail: 'avery.chen@email.com',
      volunteerPhone: '+1 (555) 321-0987',
      volunteerLocation: 'California, 94102',
      availableShifts: ['Morning'],
      campaignName: 'Tech Literacy Program',
      volunteerSkills: 'Technology, Teaching',
      appliedDate: '2024-05-16T14:20:00.000Z',
      rating: 4.8,
      totalCampaigns: 11
    },
    {
      id: 'vol-009',
      volunteerName: 'Blake Wilson',
      volunteerEmail: 'blake.wilson@email.com',
      volunteerPhone: '+1 (555) 654-3210',
      volunteerLocation: 'Georgia, 30309',
      availableShifts: ['Afternoon'],
      campaignName: 'Senior Care Assistance',
      volunteerSkills: 'Healthcare, Compassion',
      appliedDate: '2024-05-17T11:00:00.000Z',
      rating: 4.6,
      totalCampaigns: 9
    },
    {
      id: 'vol-010',
      volunteerName: 'Quinn Parker',
      volunteerEmail: 'quinn.parker@email.com',
      volunteerPhone: '+1 (555) 876-5432',
      volunteerLocation: 'Colorado, 80202',
      availableShifts: ['Morning', 'Evening'],
      campaignName: 'Animal Shelter Support',
      volunteerSkills: 'Animal Care, Organization',
      appliedDate: '2024-05-18T09:30:00.000Z',
      rating: 4.4,
      totalCampaigns: 13
    },
    {
      id: 'vol-011',
      volunteerName: 'Harper Davis',
      volunteerEmail: 'harper.davis@email.com',
      volunteerPhone: '+1 (555) 432-1098',
      volunteerLocation: 'Oregon, 97201',
      availableShifts: ['Afternoon'],
      campaignName: 'Homeless Outreach',
      volunteerSkills: 'Social Work, Communication',
      appliedDate: '2024-05-19T13:15:00.000Z',
      rating: 4.7,
      totalCampaigns: 8
    },
    {
      id: 'vol-012',
      volunteerName: 'Sage Martinez',
      volunteerEmail: 'sage.martinez@email.com',
      volunteerPhone: '+1 (555) 210-9876',
      volunteerLocation: 'Nevada, 89101',
      availableShifts: ['Evening'],
      campaignName: 'Youth Sports Program',
      volunteerSkills: 'Sports Coaching, Mentoring',
      appliedDate: '2024-05-20T16:00:00.000Z',
      rating: 4.5,
      totalCampaigns: 6
    },
    {
      id: 'vol-013',
      volunteerName: 'River Johnson',
      volunteerEmail: 'river.johnson@email.com',
      volunteerPhone: '+1 (555) 098-7654',
      volunteerLocation: 'Montana, 59701',
      availableShifts: ['Morning'],
      campaignName: 'Environmental Conservation',
      volunteerSkills: 'Environmental Science, Research',
      appliedDate: '2024-05-21T08:45:00.000Z',
      rating: 4.8,
      totalCampaigns: 14
    },
    {
      id: 'vol-014',
      volunteerName: 'Phoenix Lee',
      volunteerEmail: 'phoenix.lee@email.com',
      volunteerPhone: '+1 (555) 765-4321',
      volunteerLocation: 'Utah, 84101',
      availableShifts: ['Afternoon', 'Evening'],
      campaignName: 'Literacy Program',
      volunteerSkills: 'Education, Tutoring',
      appliedDate: '2024-05-22T15:30:00.000Z',
      rating: 4.6,
      totalCampaigns: 11
    },
    {
      id: 'vol-015',
      volunteerName: 'Dakota Brown',
      volunteerEmail: 'dakota.brown@email.com',
      volunteerPhone: '+1 (555) 543-2109',
      volunteerLocation: 'Wisconsin, 53202',
      availableShifts: ['Morning'],
      campaignName: 'Community Garden',
      volunteerSkills: 'Gardening, Project Management',
      appliedDate: '2024-05-23T10:15:00.000Z',
      rating: 4.3,
      totalCampaigns: 7
    }
  ];

  // Enhanced joined volunteers data
  const mockJoinedVolunteers = [
    {
      id: 'vol-j001',
      volunteerName: 'Mike Johnson',
      volunteerEmail: 'mike@example.com',
      volunteerPhone: '+1234567892',
      volunteerLocation: 'California, 90210',
      availableShifts: ['Morning', 'Afternoon'],
      campaignName: 'Education Drive',
      volunteerSkills: 'Teaching, Mentoring',
      appliedDate: '2024-06-01T10:00:00.000Z',
      rating: 4.9,
      totalCampaigns: 18
    },
    {
      id: 'vol-j002',
      volunteerName: 'Emma Wilson',
      volunteerEmail: 'emma.wilson@email.com',
      volunteerPhone: '+1 (555) 111-2222',
      volunteerLocation: 'Texas, 73301',
      availableShifts: ['Evening'],
      campaignName: 'Health Awareness',
      volunteerSkills: 'Healthcare, Communication',
      appliedDate: '2024-06-02T11:00:00.000Z',
      rating: 4.7,
      totalCampaigns: 14
    },
    {
      id: 'vol-j003',
      volunteerName: 'David Martinez',
      volunteerEmail: 'david.martinez@email.com',
      volunteerPhone: '+1 (555) 333-4444',
      volunteerLocation: 'Florida, 33101',
      availableShifts: ['Morning'],
      campaignName: 'Environmental Clean-up',
      volunteerSkills: 'Environmental Science, Leadership',
      appliedDate: '2024-06-03T09:00:00.000Z',
      rating: 4.6,
      totalCampaigns: 9
    },
    {
      id: 'vol-j004',
      volunteerName: 'Sophie Anderson',
      volunteerEmail: 'sophie.anderson@email.com',
      volunteerPhone: '+1 (555) 555-6666',
      volunteerLocation: 'New York, 10001',
      availableShifts: ['Afternoon', 'Evening'],
      campaignName: 'Youth Development',
      volunteerSkills: 'Psychology, Mentoring',
      appliedDate: '2024-06-04T15:00:00.000Z',
      rating: 4.8,
      totalCampaigns: 16
    },
    {
      id: 'vol-j005',
      volunteerName: 'James Taylor',
      volunteerEmail: 'james.taylor@email.com',
      volunteerPhone: '+1 (555) 777-8888',
      volunteerLocation: 'Illinois, 60601',
      availableShifts: ['Morning', 'Afternoon'],
      campaignName: 'Community Garden',
      volunteerSkills: 'Gardening, Project Management',
      appliedDate: '2024-06-05T08:00:00.000Z',
      rating: 4.4,
      totalCampaigns: 7
    }
  ];

  useEffect(() => {
    // Load interested volunteers for this specific manager or use mock data for demo
    const loadInterestedVolunteers = () => {
      const managerKey = `interestedVolunteers_${managerName}`;
      const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
      
      // If no stored volunteers, use mock data for demo
      if (volunteers.length === 0) {
        setInterestedVolunteers(mockInterestedVolunteers);
      } else {
        setInterestedVolunteers(volunteers);
      }
    };

    const loadJoinedVolunteers = () => {
      const joinedKey = `joinedVolunteers_${managerName}`;
      const volunteers = JSON.parse(localStorage.getItem(joinedKey) || '[]');
      
      // If no stored volunteers, use mock data for demo
      if (volunteers.length === 0) {
        setJoinedVolunteers(mockJoinedVolunteers);
      } else {
        setJoinedVolunteers(volunteers);
      }
    };

    loadInterestedVolunteers();
    loadJoinedVolunteers();
    
    // Refresh every 3 seconds to catch new interest requests
    const interval = setInterval(() => {
      loadInterestedVolunteers();
      loadJoinedVolunteers();
    }, 3000);
    return () => clearInterval(interval);
  }, [managerName]);

  // Filter function
  const getFilteredVolunteers = (volunteers: any[]) => {
    return volunteers.filter((volunteer: any) => {
      // Rating filter
      if (filterRating !== 'all') {
        const rating = volunteer.rating || 0;
        if (filterRating === '5' && rating < 4.8) return false;
        if (filterRating === '4' && (rating < 4.0 || rating >= 4.8)) return false;
        if (filterRating === '3' && rating < 3.0) return false;
      }

      // Shift filter
      if (filterShift !== 'all') {
        const shifts = Array.isArray(volunteer.availableShifts) 
          ? volunteer.availableShifts 
          : [volunteer.availableShifts];
        const hasShift = shifts.some((shift: string) => 
          shift.toLowerCase().includes(filterShift.toLowerCase())
        );
        if (!hasShift) return false;
      }

      // Location filter
      if (filterLocation !== 'all') {
        const location = volunteer.volunteerLocation || '';
        if (!location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
      }

      return true;
    });
  };

  const filteredInterestedVolunteers = getFilteredVolunteers(interestedVolunteers);
  const filteredJoinedVolunteers = getFilteredVolunteers(joinedVolunteers);

  // Get unique locations for filter
  const allLocations = [...interestedVolunteers, ...joinedVolunteers]
    .map((v: any) => v.volunteerLocation?.split(',')[0])
    .filter((location, index, self) => location && self.indexOf(location) === index);

  const handleApprove = (volunteerId: string) => {
    // Remove from interested and add to joined
    const managerKey = `interestedVolunteers_${managerName}`;
    const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
    const volunteer = volunteers.find((v: any) => v.id === volunteerId);
    const updatedVolunteers = volunteers.filter((v: any) => v.id !== volunteerId);
    localStorage.setItem(managerKey, JSON.stringify(updatedVolunteers));
    setInterestedVolunteers(updatedVolunteers);
    
    // Add to joined volunteers
    if (volunteer) {
      const joinedKey = `joinedVolunteers_${managerName}`;
      const joinedVols = JSON.parse(localStorage.getItem(joinedKey) || '[]');
      joinedVols.push(volunteer);
      localStorage.setItem(joinedKey, JSON.stringify(joinedVols));
      setJoinedVolunteers(joinedVols);
    }
    
    toast({
      title: "Volunteer Approved",
      description: "The volunteer has been approved and moved to joined volunteers.",
    });
  };

  const handleReject = (volunteerId: string) => {
    // Remove from interested volunteers
    const managerKey = `interestedVolunteers_${managerName}`;
    const volunteers = JSON.parse(localStorage.getItem(managerKey) || '[]');
    const updatedVolunteers = volunteers.filter((v: any) => v.id !== volunteerId);
    localStorage.setItem(managerKey, JSON.stringify(updatedVolunteers));
    setInterestedVolunteers(updatedVolunteers);
    
    toast({
      title: "Volunteer Rejected",
      description: "The volunteer application has been rejected.",
    });
  };

  const handleSendInvitation = async (volunteerId: string, volunteerName: string) => {
    try {
      // Store volunteer in localStorage if not already there
      const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
      const existingVolunteer = volunteers.find((v: any) => v.id === volunteerId);
      
      if (!existingVolunteer) {
        const volunteer = interestedVolunteers.find((v: any) => v.id === volunteerId);
        if (volunteer) {
          volunteers.push(volunteer);
          localStorage.setItem('volunteers', JSON.stringify(volunteers));
        }
      }

      // Send invitation for first available campaign (demo purposes)
      const campaignId = 'camp-001'; // You can make this dynamic based on campaign selection
      
      await invitationService.sendInvitation(
        campaignId, 
        volunteerId, 
        `Hi ${volunteerName}, we think you'd be perfect for this campaign based on your skills and availability!`
      );
      
      toast({
        title: "Invitation Sent!",
        description: `Invitation has been sent to ${volunteerName}. They will see it in their volunteer dashboard.`,
      });
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Invitation Sent!",
        description: `Invitation has been logged and sent to ${volunteerName}. They will see it in their volunteer dashboard.`,
      });
    }
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}?subject=Volunteer Opportunity&body=Hello, we have exciting volunteer opportunities available!`);
  };

  const handleText = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^\d]/g, '')}?text=Hello! We have exciting volunteer opportunities available.`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleExportContacts = () => {
    const volunteers = activeTab === 'interested' ? filteredInterestedVolunteers : filteredJoinedVolunteers;
    const csvContent = volunteers.map((v: any) => `${v.volunteerName},${v.volunteerEmail},${v.volunteerPhone}`).join('\n');
    const blob = new Blob([`Name,Email,Phone\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_volunteers.csv`;
    a.click();
    
    toast({
      title: "Contacts Exported",
      description: "Volunteer contacts have been exported successfully.",
    });
  };

  const copyRecruitmentLink = () => {
    navigator.clipboard.writeText(recruitmentLink);
    toast({
      title: "Link Copied",
      description: "Recruitment link copied to clipboard!",
    });
  };

  // Enhanced bulk email sending function (same logic as past volunteers)
  const handleSendBulkEmails = async () => {
    if (!bulkEmails.trim()) {
      toast({
        title: "No Email Addresses",
        description: "Please enter at least one email address.",
        variant: "destructive",
      });
      return;
    }

    // Parse email addresses (support both line breaks and spaces)
    const emailList = bulkEmails
      .split(/[\n\s,]+/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    if (emailList.length === 0) {
      toast({
        title: "Invalid Email Addresses",
        description: "Please enter valid email addresses.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingBulk(true);
    
    try {
      console.log(`📧 Starting bulk recruitment email sending to ${emailList.length} addresses...`);
      
      let successCount = 0;
      let failureCount = 0;

      for (let i = 0; i < emailList.length; i++) {
        const email = emailList[i];
        try {
          console.log(`📤 Sending email ${i + 1}/${emailList.length} to: ${email}`);
          
          // Clean email address (remove +number if present)
          let cleanEmail = email;
          if (cleanEmail.includes('+')) {
            const [prefix, domain] = cleanEmail.split('@');
            const cleanPrefix = prefix.split('+')[0];
            cleanEmail = `${cleanPrefix}@${domain}`;
          }

          const signupUrl = `${window.location.origin}/volunteer-signup`;
          const managerName = localStorage.getItem('managerName') || 'Campaign Manager';

          const emailSubject = `🌟 Exclusive Volunteer Opportunity - Join Our Impact Team!`;
          
          // Use the same email template as past volunteers
          const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Volunteer Recruitment</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">🌟 Join Our Volunteer Community!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Make a Difference in Your Community</p>
    </div>
    
    <!-- Main Content -->
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
        
        <p style="font-size: 18px; margin-bottom: 20px;">Dear Future Volunteer,</p>
        
        ${bulkMessage ? `
        <p style="font-size: 16px; margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-left: 4px solid #667eea; border-radius: 5px;">
            ${bulkMessage}
        </p>
        ` : ''}
        
        <p style="font-size: 16px; margin-bottom: 25px;">
            We're excited to invite you to join our volunteer community! We have amazing opportunities for people who want to make a positive impact in their community.
        </p>
        
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h2 style="margin: 0 0 15px 0; font-size: 22px;">✨ Why Volunteer With Us?</h2>
            <div style="display: grid; gap: 10px;">
                <div><strong>🤝</strong> Make meaningful connections in your community</div>
                <div><strong>🌱</strong> Develop new skills and gain valuable experience</div>
                <div><strong>💝</strong> Create positive change and help those in need</div>
                <div><strong>🏆</strong> Join a supportive team of like-minded individuals</div>
                <div><strong>📈</strong> Build your resume with volunteer experience</div>
            </div>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #2d5a2d; margin: 0 0 15px 0;">🎯 What We Offer:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #2d5a2d;">
                <li>Flexible scheduling that works with your availability</li>
                <li>Training and support from experienced team members</li>
                <li>Various types of volunteer opportunities</li>
                <li>Recognition for your contributions</li>
                <li>A welcoming and inclusive community</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; border-radius: 10px; display: inline-block;">
                <h3 style="margin: 0 0 10px 0;">🚀 Ready to Get Started?</h3>
                <p style="margin: 0; font-size: 16px;">Join our volunteer community today!</p>
                <a href="${signupUrl}" style="display: inline-block; background: #ffffff; color: #11998e; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 15px; transition: all 0.3s;">
                    📝 Sign Up as Volunteer
                </a>
            </div>
        </div>
        
        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #155724; margin: 0 0 15px 0;">👆 Next Steps:</h3>
            <ol style="margin: 0; padding-left: 20px; color: #155724;">
                <li>Click the sign-up link above</li>
                <li>Fill out the volunteer registration form</li>
                <li>Wait for us to match you with suitable opportunities</li>
                <li>Start making a difference in your community!</li>
            </ol>
        </div>
        
        <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 10px; margin: 25px 0; text-align: center;">
            <p style="margin: 0; color: #721c24; font-weight: bold;">⏰ Don't Wait! Start Your Volunteer Journey Today.</p>
            <p style="margin: 5px 0 0 0; color: #721c24;">Every moment counts when making a difference.</p>
        </div>
        
    </div>
    
    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 25px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="margin: 0 0 15px 0; font-size: 16px;">We can't wait to welcome you to our volunteer family!</p>
        <p style="margin: 0 0 20px 0;">
            <strong>Best regards,</strong><br>
            ${managerName}<br>
            <em>Volunteer Coordinator</em><br>
            <strong>CallHub Team</strong>
        </p>
        
        <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
                💬 Questions? Reply to this email for more information.<br>
                🌐 Learn more: <a href="${signupUrl}" style="color: #667eea;">Volunteer Signup</a>
            </p>
        </div>
    </div>
    
</body>
</html>
          `;

          const result = await emailService.sendEmail({
            to: cleanEmail,
            subject: emailSubject,
            body: emailBody
          });

          if (result.success) {
            console.log(`✅ Successfully sent email to: ${cleanEmail}`);
            successCount++;
          } else {
            console.error(`❌ Failed to send email to: ${cleanEmail}`, result.error);
            failureCount++;
          }

          // Add delay between emails to avoid rate limiting
          if (i < emailList.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

        } catch (error) {
          console.error(`❌ Error sending email to ${email}:`, error);
          failureCount++;
        }
      }

      // Show results
      if (successCount > 0) {
        toast({
          title: "📧 Bulk Emails Sent!",
          description: `Successfully sent ${successCount} emails${failureCount > 0 ? `, ${failureCount} failed` : ''}. Check recipients' inboxes!`,
        });
        
        // Clear form on success
        setBulkEmails('');
        setBulkMessage('');
        setShowBulkRecruit(false);
      } else {
        toast({
          title: "Email Sending Failed",
          description: "No emails were sent successfully. Please check your email configuration.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('❌ Error in bulk email sending:', error);
      toast({
        title: "Error",
        description: "Failed to send bulk emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingBulk(false);
    }
  };

  const VolunteerCard = ({ volunteer, isJoined = false }: { volunteer: any, isJoined?: boolean }) => {
    // Extract initials from name
    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Generate a consistent color based on the volunteer's name
    const getAvatarColor = (name: string) => {
      const colors = [
        'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
        'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'
      ];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    };

    return (
      <Card className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700/50 text-white' : 'bg-white/95 border-gray-200'} backdrop-blur-sm rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(volunteer.volunteerName)} shadow-lg`}>
              {getInitials(volunteer.volunteerName)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{volunteer.volunteerName}</h3>
                <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-yellow-700">{volunteer.rating?.toFixed(1) || 'N/A'}</span>
                </div>
              </div>
              
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{volunteer.campaignName}</p>
              <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Applied: {new Date(volunteer.appliedDate).toLocaleDateString()}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{volunteer.volunteerEmail}</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>{volunteer.volunteerLocation}</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>Available: {Array.isArray(volunteer.availableShifts) ? volunteer.availableShifts.join(', ') : volunteer.availableShifts}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {volunteer.volunteerSkills.split(', ').map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className={`text-xs px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 ${isDarkMode ? 'from-blue-900/50 to-purple-900/50 text-blue-200' : ''}`}>
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {!isJoined ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(volunteer.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReject(volunteer.id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleEmail(volunteer.volunteerEmail)}
                      variant="outline"
                      className={`text-blue-600 border-blue-200 hover:bg-blue-50 ${isDarkMode ? 'bg-gray-800/80 border-gray-600 text-blue-400' : 'bg-white/80'}`}
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleText(volunteer.volunteerPhone)}
                      variant="outline"
                      className={`text-purple-600 border-purple-200 hover:bg-purple-50 ${isDarkMode ? 'bg-gray-800/80 border-gray-600 text-purple-400' : 'bg-white/80'}`}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200'} relative overflow-hidden`}>
      {/* Enhanced animated background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10' : 'bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-pink-300/20'}`}></div>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20' : 'bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30'} animate-gradient`}></div>
      
      {/* Floating elements */}
      <div className={`absolute top-20 left-10 w-32 h-32 ${isDarkMode ? 'bg-gradient-to-r from-blue-400/20 to-purple-400/20' : 'bg-gradient-to-r from-blue-300/30 to-purple-300/30'} rounded-full blur-xl animate-pulse`}></div>
      <div className={`absolute top-60 right-20 w-24 h-24 ${isDarkMode ? 'bg-gradient-to-r from-pink-400/20 to-red-400/20' : 'bg-gradient-to-r from-pink-300/30 to-red-300/30'} rounded-full blur-xl animate-pulse delay-1000`}></div>

      <Navigation title="Campaign Manager Dashboard">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50' : 'bg-white/50 border-gray-300 hover:bg-white/80'} backdrop-blur-sm transition-all duration-300`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
        </Button>
      </Navigation>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Recruitment Link Card - Moved above tabs */}
        <Card className={`mb-8 ${isDarkMode ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-gray-700 text-white' : 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white border-0'} backdrop-blur-sm shadow-2xl transition-all duration-300`}>
          <CardHeader>
            <CardTitle className="text-white">🚀 Volunteer Recruitment Center</CardTitle>
            <CardDescription className={`${isDarkMode ? 'text-blue-200' : 'text-blue-100'}`}>
              Share this unique link to recruit volunteers for your campaigns and watch your team grow!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Input
                value={recruitmentLink}
                readOnly
                className={`flex-1 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/10 border-white/20 text-white placeholder-white/60'}`}
              />
              <Button onClick={copyRecruitmentLink} variant="secondary" className="shadow-lg">
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Recruitment Section - Moved above tabs */}
        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800/70 border-gray-700 text-white' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
          <CardHeader>
            <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center space-x-2`}>
              <Upload className="w-5 h-5" />
              <span>Bulk Volunteer Recruitment</span>
            </CardTitle>
            <CardDescription className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Import contact lists and send volunteer signup invitations in bulk
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showBulkRecruit ? (
              <Button 
                onClick={() => setShowBulkRecruit(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Start Bulk Recruitment
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bulk-emails" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Email Addresses (one per line)</Label>
                  <Textarea
                    id="bulk-emails"
                    placeholder="volunteer1@email.com&#10;volunteer2@email.com&#10;volunteer3@email.com"
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    className={`mt-2 ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 border-gray-300'}`}
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="bulk-message" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Custom Message (Optional)</Label>
                  <Textarea
                    id="bulk-message"
                    placeholder="Add a personal message to your recruitment email..."
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    className={`mt-2 ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 border-gray-300'}`}
                    rows={3}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleSendBulkEmails}
                    disabled={isSendingBulk || !bulkEmails.trim()}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg"
                  >
                    {isSendingBulk ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Invitations
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setShowBulkRecruit(false)}
                    variant="outline"
                    className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50' : 'bg-white/50 border-gray-300 hover:bg-white/80'}`}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm border transition-all duration-300`}>
            <TabsTrigger value="interested" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-700/70 data-[state=active]:text-white text-gray-300' : 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800'}`}>
              <Users className="w-4 h-4" />
              <span>Interested Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-700/70 data-[state=active]:text-white text-gray-300' : 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800'}`}>
              <UserCheck className="w-4 h-4" />
              <span>Joined</span>
            </TabsTrigger>
            <TabsTrigger value="past" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-700/70 data-[state=active]:text-white text-gray-300' : 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800'}`}>
              <History className="w-4 h-4" />
              <span>Past Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="email-config" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-700/70 data-[state=active]:text-white text-gray-300' : 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800'}`}>
              <Settings className="w-4 h-4" />
              <span>Email Setup</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interested" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {filteredInterestedVolunteers.length}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Interested Volunteers</div>
                </CardContent>
              </Card>
              <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {Math.round((filteredJoinedVolunteers.length / (filteredInterestedVolunteers.length + filteredJoinedVolunteers.length)) * 100) || 0}%
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conversion Rate</div>
                </CardContent>
              </Card>
              <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">
                    {filteredInterestedVolunteers.length + filteredJoinedVolunteers.length}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Volunteers</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Filters */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Filter className="w-5 h-5" />
                  <span>Advanced Filters</span>
                </CardTitle>
                <CardDescription className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Filter volunteers by rating, availability, and location to find the perfect match
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Rating</Label>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/80 border-gray-300'}`}>
                        <SelectValue placeholder="All ratings" />
                      </SelectTrigger>
                      <SelectContent className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}>
                        <SelectItem value="all">All ratings</SelectItem>
                        <SelectItem value="5">⭐ 4.8+ stars</SelectItem>
                        <SelectItem value="4">⭐ 4.0+ stars</SelectItem>
                        <SelectItem value="3">⭐ 3.0+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available Shift</Label>
                    <Select value={filterShift} onValueChange={setFilterShift}>
                      <SelectTrigger className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/80 border-gray-300'}`}>
                        <SelectValue placeholder="All shifts" />
                      </SelectTrigger>
                      <SelectContent className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}>
                        <SelectItem value="all">All shifts</SelectItem>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</Label>
                    <Select value={filterLocation} onValueChange={setFilterLocation}>
                      <SelectTrigger className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/80 border-gray-300'}`}>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}>
                        <SelectItem value="all">All locations</SelectItem>
                        {allLocations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2">
                    <Eye className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Showing {filteredInterestedVolunteers.length} of {interestedVolunteers.length} volunteers
                    </span>
                  </div>
                  <Button onClick={handleExportContacts} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Export ({filteredInterestedVolunteers.length})
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInterestedVolunteers.map((volunteer: any) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </div>

            {filteredInterestedVolunteers.length === 0 && (
              <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    No volunteers found
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {interestedVolunteers.length === 0 
                      ? "Share your recruitment link to start attracting volunteers!"
                      : "Try adjusting your filters to see more volunteers."
                    }
                  </p>
                  <Button onClick={copyRecruitmentLink} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Recruitment Link
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            {/* Enhanced Filters for Joined Volunteers */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Filter className="w-5 h-5" />
                  <span>Filter Joined Volunteers</span>
                </CardTitle>
                <CardDescription className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Manage and filter your active volunteer team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Rating</Label>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/80 border-gray-300'}`}>
                        <SelectValue placeholder="All ratings" />
                      </SelectTrigger>
                      <SelectContent className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}>
                        <SelectItem value="all">All ratings</SelectItem>
                        <SelectItem value="5">⭐ 4.8+ stars</SelectItem>
                        <SelectItem value="4">⭐ 4.0+ stars</SelectItem>
                        <SelectItem value="3">⭐ 3.0+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available Shift</Label>
                    <Select value={filterShift} onValueChange={setFilterShift}>
                      <SelectTrigger className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/80 border-gray-300'}`}>
                        <SelectValue placeholder="All shifts" />
                      </SelectTrigger>
                      <SelectContent className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}>
                        <SelectItem value="all">All shifts</SelectItem>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</Label>
                    <Select value={filterLocation} onValueChange={setFilterLocation}>
                      <SelectTrigger className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/80 border-gray-300'}`}>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}>
                        <SelectItem value="all">All locations</SelectItem>
                        {allLocations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2">
                    <Eye className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Showing {filteredJoinedVolunteers.length} of {joinedVolunteers.length} volunteers
                    </span>
                  </div>
                  <Button onClick={handleExportContacts} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Export ({filteredJoinedVolunteers.length})
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJoinedVolunteers.map(volunteer => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} isJoined={true} />
              ))}
            </div>

            {filteredJoinedVolunteers.length === 0 && (
              <Card className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl transition-all duration-300`}>
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    No joined volunteers found
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {joinedVolunteers.length === 0 
                      ? "Approve interested volunteers to see them here."
                      : "Try adjusting your filters to see more volunteers."
                    }
                  </p>
                  <Button onClick={copyRecruitmentLink} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Recruitment Link
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <PastVolunteers />
          </TabsContent>

          <TabsContent value="email-config" className="space-y-6">
            <EmailConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
