
export const campaigns = [
  {
    id: 'camp-001',
    name: 'Summer Blast Sale',
    description: 'A seasonal discount campaign offering up to 50% off on summer apparel.',
    manager: 'Sarah Johnson',
    startDate: '2023-06-15',
    startTime: '09:00 AM',
    endDate: '2023-06-30',
    endTime: '11:59 PM',
    skillsRequired: ['Digital Marketing', 'Social Media Management', 'Copywriting'],
    volunteersNeeded: 25,
    volunteersRegistered: 18,
    category: 'Marketing',
    location: 'New York, NY',
  },
  {
    id: 'camp-002',
    name: 'Tech Expo 2023',
    description: 'A virtual exhibition showcasing the latest tech innovations.',
    manager: 'David Chen',
    startDate: '2023-07-10',
    startTime: '10:00 AM',
    endDate: '2023-07-12',
    endTime: '06:00 PM',
    skillsRequired: ['Event Planning', 'Technical Support', 'Public Speaking'],
    volunteersNeeded: 30,
    volunteersRegistered: 22,
    category: 'Technology',
    location: 'Virtual Event',
  },
  {
    id: 'camp-003',
    name: 'Fitness Challenge',
    description: 'A 30-day fitness challenge with daily workout routines and prizes.',
    manager: 'Emily Parker',
    startDate: '2023-08-01',
    startTime: '12:00 PM',
    endDate: '2023-08-30',
    endTime: '11:59 PM',
    skillsRequired: ['Health Coaching', 'Social Media Engagement', 'Video Editing'],
    volunteersNeeded: 20,
    volunteersRegistered: 15,
    category: 'Health & Wellness',
    location: 'Los Angeles, CA',
  },
  {
    id: 'camp-004',
    name: 'Back-to-School Promo',
    description: 'Discounts on school supplies and electronics for students.',
    manager: 'Michael Brown',
    startDate: '2023-07-20',
    startTime: '08:00 AM',
    endDate: '2023-09-05',
    endTime: '10:00 PM',
    skillsRequired: ['Sales Strategy', 'Email Marketing', 'Customer Support'],
    volunteersNeeded: 35,
    volunteersRegistered: 28,
    category: 'Education',
    location: 'Chicago, IL',
  },
  {
    id: 'camp-005',
    name: 'Holiday Giveaway',
    description: 'A festive campaign with daily giveaways and surprise gifts.',
    manager: 'Jessica Lee',
    startDate: '2023-12-01',
    startTime: '09:00 AM',
    endDate: '2023-12-24',
    endTime: '11:59 PM',
    skillsRequired: ['Influencer Collaboration', 'Graphic Design', 'CRM Management'],
    volunteersNeeded: 40,
    volunteersRegistered: 32,
    category: 'Marketing',
    location: 'Miami, FL',
  },
  {
    id: 'camp-006',
    name: 'Green Earth Initiative',
    description: 'A sustainability campaign promoting eco-friendly products.',
    manager: 'Robert Green',
    startDate: '2023-04-22',
    startTime: '07:00 AM',
    endDate: '2023-05-22',
    endTime: '11:59 PM',
    skillsRequired: ['Environmental Awareness', 'Content Writing', 'SEO'],
    volunteersNeeded: 25,
    volunteersRegistered: 20,
    category: 'Environment',
    location: 'Portland, OR',
  },
  {
    id: 'camp-007',
    name: 'Startup Pitch Competition',
    description: 'A competition for entrepreneurs to pitch their business ideas.',
    manager: 'Daniel Kim',
    startDate: '2023-09-05',
    startTime: '02:00 PM',
    endDate: '2023-09-10',
    endTime: '08:00 PM',
    skillsRequired: ['Business Analysis', 'Public Relations', 'Judging Experience'],
    volunteersNeeded: 15,
    volunteersRegistered: 12,
    category: 'Business',
    location: 'San Francisco, CA',
  },
  {
    id: 'camp-008',
    name: 'Flash Sale Weekend',
    description: 'Limited-time discounts on selected products for 48 hours.',
    manager: 'Olivia Smith',
    startDate: '2023-10-13',
    startTime: '12:00 PM',
    endDate: '2023-10-15',
    endTime: '12:00 PM',
    skillsRequired: ['E-commerce Management', 'Paid Ads', 'Customer Engagement'],
    volunteersNeeded: 20,
    volunteersRegistered: 16,
    category: 'E-commerce',
    location: 'Austin, TX',
  },
  {
    id: 'camp-009',
    name: 'Mental Health Awareness',
    description: 'A campaign to promote mental well-being through workshops.',
    manager: 'Dr. Alan Foster',
    startDate: '2023-05-01',
    startTime: '10:00 AM',
    endDate: '2023-05-31',
    endTime: '08:00 PM',
    skillsRequired: ['Psychology Knowledge', 'Community Outreach', 'Public Speaking'],
    volunteersNeeded: 30,
    volunteersRegistered: 25,
    category: 'Healthcare',
    location: 'Boston, MA',
  },
  {
    id: 'camp-010',
    name: 'New Product Launch – Alpha X',
    description: 'Introducing the latest flagship product with exclusive perks.',
    manager: 'Sophia Rivera',
    startDate: '2023-11-10',
    startTime: '09:00 AM',
    endDate: '2023-11-20',
    endTime: '11:59 PM',
    skillsRequired: ['Product Marketing', 'Media Relations', 'Analytics'],
    volunteersNeeded: 25,
    volunteersRegistered: 19,
    category: 'Product Launch',
    location: 'Seattle, WA',
  }
];

export const volunteers = [
  {
    id: 'vol-001',
    name: 'Ananya Sharma',
    email: 'sharan+30@callhub.io',
    phone: '+91 8747966795',
    city: 'Bangalore',
    state: 'KA',
    country: 'India',
    zipCode: '560001',
    shiftTime: '9:00 AM – 1:00 PM',
    skills: ['Digital Marketing', 'Content Writing', 'Social Media Management'],
    rating: 4.8,
    totalCampaigns: 12,
    lastActive: '2 days ago',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: 'vol-002',
    name: 'Rohan Patel',
    email: 'sharan+31@callhub.io',
    phone: '+91 8747966795',
    city: 'Mumbai',
    state: 'MH',
    country: 'India',
    zipCode: '400001',
    shiftTime: '1:00 PM – 5:00 PM',
    skills: ['Event Planning', 'Technical Support', 'Project Management'],
    rating: 4.9,
    totalCampaigns: 18,
    lastActive: '1 day ago',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: 'vol-003',
    name: 'Priya Verma',
    email: 'sharan+32@callhub.io',
    phone: '+91 8747966795',
    city: 'Delhi',
    state: 'DL',
    country: 'India',
    zipCode: '110001',
    shiftTime: '5:00 PM – 9:00 PM',
    skills: ['Health Coaching', 'Video Editing', 'Social Media Engagement'],
    rating: 4.7,
    totalCampaigns: 9,
    lastActive: '3 days ago',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: 'vol-004',
    name: 'Emily Walker',
    email: 'arvindk+10@callhub.io',
    phone: '+91 9695271037',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10001',
    shiftTime: '1:00 PM – 5:00 PM',
    skills: ['Sales Strategy', 'Email Marketing', 'Customer Support'],
    rating: 4.8,
    totalCampaigns: 15,
    lastActive: '1 day ago',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: 'vol-005',
    name: 'Michael Smith',
    email: 'arvindk+11@callhub.io',
    phone: '+91 9695271037',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    zipCode: '90001',
    shiftTime: '5:00 PM – 9:00 PM',
    skills: ['Graphic Design', 'CRM Management', 'Influencer Collaboration'],
    rating: 4.6,
    totalCampaigns: 11,
    lastActive: '5 days ago',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  }
];

export interface Campaign {
  id: string;
  name: string;
  description: string;
  manager: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  skillsRequired: string[];
  volunteersNeeded: number;
  volunteersRegistered: number;
  category: string;
  location: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  shiftTime: string;
  skills: string[];
  rating: number;
  totalCampaigns: number;
  lastActive: string;
  profilePicture: string;
}

export interface Invitation {
  id: string;
  campaignId: string;
  volunteerId: string;
  invitedDate: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
}
