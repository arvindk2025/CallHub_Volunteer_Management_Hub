
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Target, TrendingUp, CheckCircle, Star, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "25,000+", label: "Volunteers Recruited", icon: Users },
    { number: "92%", label: "Time Saved", icon: Clock },
    { number: "98%", label: "Success Rate", icon: Target },
    { number: "1,500+", label: "Campaigns Managed", icon: TrendingUp },
  ];

  const features = [
    {
      title: "Smart Volunteer Recruitment",
      description: "AI-powered matching system that connects you with the perfect volunteers based on skills, availability, and location",
      icon: Users,
    },
    {
      title: "Real-time Campaign Management",
      description: "Track volunteer engagement, manage assignments, and coordinate campaigns with our intuitive dashboard",
      icon: CheckCircle,
    },
    {
      title: "Automated Communication Hub",
      description: "Streamlined messaging, automated reminders, and instant notifications keep everyone connected and informed",
      icon: Zap,
    },
    {
      title: "Advanced Analytics & Insights",
      description: "Comprehensive reporting tools provide deep insights into volunteer performance and campaign effectiveness",
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Campaign Manager at TechCorp",
      content: "CallHub transformed our volunteer recruitment process. We now manage 300% more volunteers with half the effort!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Mike Chen",
      role: "Non-profit Director",
      content: "The platform's automation features saved us 40 hours per week. Our campaigns run smoother than ever before.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Emily Davis",
      role: "Event Coordinator",
      content: "The volunteer matching system is incredible. We get exactly the right people for every campaign automatically.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CallHub</div>
              <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-green-100 to-blue-100">Volunteer Hub</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')} className="hover:bg-blue-50">
                Sign In
              </Button>
              <Button onClick={() => navigate('/volunteer-signup')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Join as Volunteer
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10"></div>
        
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-team-of-people-working-together-in-an-office-4624-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-people-working-together-in-an-office-4622-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
                {" "}Volunteer Management
              </span>
            </h1>
            <p className="text-xl md:text-3xl mb-8 text-gray-200 font-light">
              AI-powered platform that revolutionizes how you recruit, manage, and coordinate volunteers
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-lg px-10 py-6 shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Start Managing Now
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/volunteer-signup')}
                className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Become a Volunteer
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Global Scale</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Results That Speak for Themselves
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of organizations already transforming their volunteer programs with CallHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why CallHub is Different
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Advanced features designed to eliminate the pain points of volunteer management
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Loved by Teams Worldwide
            </h2>
            <p className="text-2xl text-gray-600">
              See what our customers say about their experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Revolutionize Your Impact?
          </h2>
          <p className="text-2xl text-blue-100 mb-12">
            Join the future of volunteer management. Start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/volunteer-signup')}
              className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">CallHub</div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Empowering organizations worldwide to build stronger communities through intelligent volunteer management technology.
              </p>
              <div className="flex space-x-6">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              © 2024 CallHub Volunteer Management. Transforming communities worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
