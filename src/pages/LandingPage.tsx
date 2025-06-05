
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Star, CheckCircle, Heart, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/shared/Navigation';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Active Volunteers', value: '50K+', color: 'text-blue-600' },
    { icon: Calendar, label: 'Campaigns Launched', value: '2K+', color: 'text-green-600' },
    { icon: MapPin, label: 'Cities Covered', value: '500+', color: 'text-purple-600' },
    { icon: Award, label: 'Success Rate', value: '95%', color: 'text-orange-600' }
  ];

  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'Our AI-powered system matches volunteers with campaigns based on skills, location, and availability.'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Comprehensive tools for campaign managers to recruit, organize, and coordinate volunteer teams.'
    },
    {
      icon: Calendar,
      title: 'Event Coordination',
      description: 'Streamlined scheduling and event management to keep your campaigns running smoothly.'
    },
    {
      icon: Heart,
      title: 'Impact Tracking',
      description: 'Track and measure the real-world impact of your volunteer efforts and campaigns.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Campaign Manager',
      content: 'CallHub transformed how we manage volunteers. We increased our volunteer engagement by 300%!',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Volunteer Coordinator',
      content: 'The platform makes it incredibly easy to find and recruit passionate volunteers for our causes.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Organizer',
      content: 'Best volunteer management platform we have used. Highly recommend for any organization.',
      avatar: 'ER'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation showProfile={false} />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
              🚀 Join 50K+ Active Volunteers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Volunteers with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Meaningful Causes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              CallHub is the premier platform connecting passionate volunteers with impactful campaigns. 
              Whether you're organizing a political campaign or looking to make a difference, we bring communities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/volunteer-signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Join as Volunteer
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                <Users className="w-5 h-5 mr-2" />
                Campaign Manager Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CallHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the tools and platform you need to create meaningful connections and drive real change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied users who are making a difference with CallHub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-blue-100 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-blue-50 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join CallHub today and connect with opportunities that matter to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/volunteer-signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Get Started as Volunteer
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              <Users className="w-5 h-5 mr-2" />
              Manage Campaigns
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">CallHub</div>
            <p className="text-gray-400 mb-4">Connecting volunteers with meaningful causes</p>
            <p className="text-gray-500 text-sm">© 2024 CallHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
