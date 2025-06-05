
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Target, TrendingUp, CheckCircle, Star, ArrowRight, Zap, Shield, Globe, Play, Award, Heart, Rocket } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "25,000+", label: "Volunteers Recruited", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "92%", label: "Time Saved", icon: Clock, color: "from-purple-500 to-pink-500" },
    { number: "98%", label: "Success Rate", icon: Target, color: "from-green-500 to-emerald-500" },
    { number: "1,500+", label: "Campaigns Managed", icon: TrendingUp, color: "from-orange-500 to-red-500" },
  ];

  const features = [
    {
      title: "AI-Powered Smart Matching",
      description: "Revolutionary AI algorithms that match volunteers with perfect campaigns based on skills, availability, and passion areas",
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Advanced analytics and insights that provide deep understanding of volunteer engagement and campaign performance",
      icon: TrendingUp,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Automated Communication Hub",
      description: "Intelligent messaging system with automated reminders, notifications, and seamless coordination tools",
      icon: CheckCircle,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Global Community Network",
      description: "Connect with a worldwide network of passionate volunteers and impactful organizations making a difference",
      icon: Globe,
      color: "from-pink-500 to-rose-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Campaign Manager at TechCorp",
      content: "CallHub transformed our volunteer recruitment process completely. We now manage 300% more volunteers with half the effort and triple the impact!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&fit=crop&crop=face&auto=format",
      company: "TechCorp",
    },
    {
      name: "Mike Chen",
      role: "Non-profit Director",
      content: "The platform's automation features saved us 40 hours per week. Our campaigns run smoother than ever and reach more people globally.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format",
      company: "Global Impact Foundation",
    },
    {
      name: "Emily Davis",
      role: "Event Coordinator",
      content: "The volunteer matching system is absolutely incredible. We get exactly the right people for every campaign automatically. Game changer!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format",
      company: "Community Events Co",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-white/20 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    CallHub
                  </div>
                  <Badge variant="secondary" className="ml-0 mt-1 bg-gradient-to-r from-green-100 to-blue-100 text-xs font-medium">
                    Volunteer Revolution
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')} 
                className="hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 text-lg font-medium"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/volunteer-signup')} 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Join Revolution
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/90 to-pink-900/95 z-20"></div>
        
        {/* Enhanced Video Background */}
        <div className="absolute inset-0 z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter blur-sm scale-110"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-people-working-together-in-an-office-4622-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-team-of-people-working-together-in-an-office-4624-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Video Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse cursor-pointer hover:bg-white/30 transition-all duration-300">
              <Play className="w-12 h-12 text-white ml-1" />
            </div>
          </div>
        </div>

        <div className="relative z-30 text-center text-white max-w-7xl mx-auto px-4">
          <div className="animate-fade-in">
            {/* Enhanced Hero Title */}
            <div className="mb-8">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-2 text-lg font-medium animate-bounce">
                🚀 #1 Volunteer Management Platform
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
              <span className="block animate-slide-up">Transform Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-glow">
                Impact Today
              </span>
            </h1>
            
            <p className="text-2xl md:text-4xl mb-12 text-gray-200 font-light leading-relaxed animate-fade-in delay-300">
              Revolutionary AI-powered platform that connects passionate volunteers
              <br className="hidden md:block" />
              with world-changing campaigns instantly
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16 animate-scale-in delay-500">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 hover:from-yellow-600 hover:via-orange-700 hover:to-red-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-110 transition-all duration-300 font-bold"
              >
                <Award className="mr-3 w-7 h-7" />
                Start Managing Now
                <ArrowRight className="ml-3 w-7 h-7" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/volunteer-signup')}
                className="text-xl px-12 py-6 border-3 border-white text-white hover:bg-white hover:text-gray-900 rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-110 transition-all duration-300 font-bold backdrop-blur-sm"
              >
                <Heart className="mr-3 w-7 h-7" />
                Become a Hero
              </Button>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className="flex justify-center items-center space-x-12 text-lg text-gray-300 animate-fade-in delay-700">
              <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                <Shield className="w-6 h-6" />
                <span className="font-medium">Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                <Globe className="w-6 h-6" />
                <span className="font-medium">Global Reach</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                <Star className="w-6 h-6 fill-current text-yellow-400" />
                <span className="font-medium">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce delay-1500"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce delay-2000"></div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24 animate-fade-in">
            <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 text-lg font-medium">
              📊 Proven Results
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Numbers That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Speak Volumes
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join thousands of organizations already transforming their volunteer programs with CallHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-purple-500/20 animate-scale-in relative overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardContent className="p-10 relative">
                  <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`text-5xl md:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M50 0L93.3 25v50L50 100 6.7 75V25z" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/%3E%3C/svg%3E')] animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24 animate-fade-in">
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-lg font-medium">
              ⚡ Revolutionary Features
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              Why CallHub is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400">
                Game-Changing
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Advanced features designed to eliminate every pain point of volunteer management
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {features.map((feature, index) => (
              <div key={index} className="group flex items-start space-x-8 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 animate-slide-up">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-6 group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-xl leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-fade-in">
            <Badge className="mb-8 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-6 py-3 text-lg font-medium">
              💬 Success Stories
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Loved by Teams
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                Worldwide
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed">
              See what our customers say about their transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-blue-500/20 animate-scale-in relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 relative">
                  <div className="flex items-center mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 text-xl italic leading-relaxed font-medium">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-6 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <div className="font-black text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 font-medium">{testimonial.role}</div>
                      <div className="text-blue-600 text-sm font-semibold">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="animate-fade-in">
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-lg font-medium">
              🎯 Ready to Transform?
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
              Join the Revolution
              <span className="block text-yellow-300">Today!</span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 mb-16 leading-relaxed">
              Transform your volunteer management and create lasting impact with the world's most advanced platform
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-white text-blue-600 hover:bg-gray-100 text-2xl px-16 py-8 shadow-2xl transform hover:scale-110 transition-all duration-300 font-black rounded-2xl"
              >
                <Rocket className="mr-4 w-8 h-8" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/volunteer-signup')}
                className="text-2xl px-16 py-8 border-3 border-white text-white hover:bg-white hover:text-blue-600 shadow-2xl transform hover:scale-110 transition-all duration-300 font-black rounded-2xl backdrop-blur-sm"
              >
                <Heart className="mr-4 w-8 h-8" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M0 40h80v40H0V40zm40 0a40 40 0 1 1 0-80 40 40 0 0 1 0 80z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CallHub
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30">
                    Transforming Communities
                  </Badge>
                </div>
              </div>
              <p className="text-gray-300 mb-8 text-xl leading-relaxed">
                Empowering organizations worldwide to build stronger communities through intelligent volunteer management technology that creates lasting impact.
              </p>
              <div className="flex space-x-6">
                <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300">
                  Twitter
                </Button>
                <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-black mb-8 text-white">Platform</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-black mb-8 text-white">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg hover:translate-x-2 transform inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-20 pt-12 text-center">
            <p className="text-gray-400 text-xl leading-relaxed">
              © 2024 CallHub Volunteer Management. Transforming communities worldwide, one volunteer at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
