
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Target, TrendingUp, CheckCircle, Star, ArrowRight, Zap, Shield, Globe, Play, Award, Heart, Rocket, UserPlus, Calendar, MessageCircle, BarChart, Check } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "50,000+", label: "Volunteers Recruited", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "95%", label: "Recruitment Success Rate", icon: Target, color: "from-green-500 to-emerald-500" },
    { number: "85%", label: "Time Saved on Coordination", icon: Clock, color: "from-purple-500 to-pink-500" },
    { number: "2,000+", label: "Active Campaigns", icon: TrendingUp, color: "from-orange-500 to-red-500" },
  ];

  const features = [
    {
      title: "Smart Volunteer Matching",
      description: "AI-powered algorithms that match volunteers with campaigns based on skills, availability, location, and interests for optimal engagement",
      icon: UserPlus,
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Campaign Management Hub",
      description: "Centralized dashboard to create, manage, and track volunteer campaigns with real-time progress monitoring and analytics",
      icon: BarChart,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Automated Communication",
      description: "Streamlined messaging system with automated reminders, updates, and notifications to keep volunteers engaged and informed",
      icon: MessageCircle,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Scheduling & Coordination",
      description: "Intelligent scheduling tools that coordinate volunteer availability with campaign needs, reducing conflicts and maximizing participation",
      icon: Calendar,
      color: "from-orange-400 to-red-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Volunteer Coordinator",
      content: "CallHub transformed how we recruit and manage volunteers. We've increased our volunteer base by 300% and reduced coordination time by half!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      company: "Community Action Network",
    },
    {
      name: "Michael Rodriguez",
      role: "Campaign Manager",
      content: "The automated matching system is incredible. We get exactly the right volunteers for each campaign, and retention rates have skyrocketed.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      company: "Help Local Initiative",
    },
    {
      name: "Emily Thompson",
      role: "Non-Profit Director",
      content: "CallHub's volunteer management platform streamlined our entire operation. Campaign coordination has never been this efficient and effective.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      company: "Volunteer United",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for local campaigns and small organizations",
      volunteers: "Up to 50 volunteers",
      popular: false,
      features: [
        "Volunteer sign-up forms",
        "Basic scheduling calendar",
        "Email reminders",
        "Basic reporting",
        "Mobile access",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "Ideal for larger campaigns and established nonprofits",
      volunteers: "Up to 200 volunteers",
      popular: true,
      features: [
        "Everything in Starter",
        "SMS + Email reminders",
        "Drag-and-drop scheduling",
        "Advanced analytics",
        "Role-based permissions",
        "API integrations",
        "Priority support",
        "Custom branding"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations and multi-state campaigns",
      volunteers: "Unlimited volunteers",
      popular: false,
      features: [
        "Everything in Professional",
        "Multi-location management",
        "Advanced automation",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
        "SLA guarantee",
        "Custom training"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-white/20 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
                  <Users className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    CallHub
                  </div>
                  <Badge variant="secondary" className="ml-0 mt-1 bg-gradient-to-r from-green-100 to-blue-100 text-xs font-medium">
                    Volunteer Management
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')} 
                className="hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 text-sm sm:text-lg font-medium px-3 sm:px-4"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/volunteer-signup')} 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Join as Volunteer
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse cursor-pointer hover:bg-white/30 transition-all duration-300">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white ml-1" />
            </div>
          </div>
        </div>

        <div className="relative z-30 text-center text-white max-w-7xl mx-auto px-4">
          <div className="animate-fade-in">
            {/* Enhanced Hero Title */}
            <div className="mb-6 sm:mb-8">
              <Badge className="mb-4 sm:mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 sm:px-6 py-2 text-sm sm:text-lg font-medium animate-bounce">
                🚀 #1 Volunteer Management Platform
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 leading-tight">
              <span className="block animate-slide-up">Revolutionize Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-glow">
                Volunteer Programs
              </span>
            </h1>
            
            <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-12 text-gray-200 font-light leading-relaxed animate-fade-in delay-300 px-4">
              Complete volunteer management solution that streamlines recruitment, coordination, and engagement
              <br className="hidden md:block" />
              for maximum community impact
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-12 sm:mb-16 animate-scale-in delay-500 px-4">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 hover:from-yellow-600 hover:via-orange-700 hover:to-red-700 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-110 transition-all duration-300 font-bold"
              >
                <Award className="mr-2 sm:mr-3 w-5 h-5 sm:w-7 sm:h-7" />
                Start Managing Now
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-7 sm:h-7" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/volunteer-signup')}
                className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 sm:border-3 border-white text-white hover:bg-white hover:text-gray-900 rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-110 transition-all duration-300 font-bold backdrop-blur-sm"
              >
                <Heart className="mr-2 sm:mr-3 w-5 h-5 sm:w-7 sm:h-7" />
                Become a Volunteer
              </Button>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 text-sm sm:text-lg text-gray-300 animate-fade-in delay-700 px-4">
              <div className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors duration-300">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium">Secure & Reliable</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors duration-300">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium">Global Reach</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors duration-300">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-yellow-400" />
                <span className="font-medium">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce delay-1500"></div>
        <div className="absolute bottom-40 left-4 sm:left-20 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce delay-2000"></div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24 animate-fade-in">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium">
              📊 Proven Impact
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight">
              Volunteer Management
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                That Delivers Results
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Join thousands of organizations streamlining their volunteer programs with CallHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-purple-500/20 animate-scale-in relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardContent className="p-6 sm:p-8 lg:p-10 relative">
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3 25v50L50 100 6.7 75V25z' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24 animate-fade-in">
            <Badge className="mb-6 sm:mb-8 bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium">
              ⚡ Powerful Features
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight">
              Complete Volunteer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400">
                Management Suite
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed px-4">
              Everything you need to recruit, manage, and engage volunteers effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {features.map((feature, index) => (
              <div key={index} className="group flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 animate-slide-up">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-2xl lg:text-3xl font-black mb-4 sm:mb-6 group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24 animate-fade-in">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium">
              💬 Success Stories
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight">
              Trusted by Volunteer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                Organizations Worldwide
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed px-4">
              See how CallHub transforms volunteer management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-blue-500/20 animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-6 sm:p-8 lg:p-10 relative">
                  <div className="flex items-center mb-6 sm:mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl italic leading-relaxed font-medium">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full mr-4 sm:mr-6 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random&color=fff&size=64`;
                      }}
                    />
                    <div>
                      <div className="font-black text-gray-900 text-base sm:text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 font-medium text-sm sm:text-base">{testimonial.role}</div>
                      <div className="text-blue-600 text-xs sm:text-sm font-semibold">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24 animate-fade-in">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium">
              💰 Pricing Plans
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight">
              Choose the Right Plan for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Your Campaign
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
              Start with a 14-day free trial. No credit card required. Scale as your volunteer program grows.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Zap className="w-6 h-6" />
              <span className="text-lg font-semibold">14-Day Free Trial + 30-Day Money Back Guarantee</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl animate-scale-in ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-medium">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl sm:text-5xl font-black text-gray-900">{plan.price}</span>
                      <span className="text-lg text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-blue-600 font-semibold">{plan.volunteers}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                        : plan.name === 'Enterprise'
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                    onClick={() => navigate('/login')}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg">
              Try CallHub's Volunteer Hub risk-free. If you're not completely satisfied with the results, we'll refund every penny within 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 40h80v40H0V40zm40 0a40 40 0 1 1 0-80 40 40 0 0 1 0 80z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CallHub
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30">
                    Volunteer Management
                  </Badge>
                </div>
              </div>
              <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl leading-relaxed">
                Empowering organizations worldwide to build stronger communities through intelligent volunteer management and coordination technology.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 text-sm sm:text-base">
                  Twitter
                </Button>
                <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 text-sm sm:text-base">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 text-sm sm:text-base">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 text-white">Platform</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 text-white">Support</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg hover:translate-x-2 transform inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 text-center">
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed">
              © 2024 CallHub Volunteer Management. Connecting communities through effective volunteer coordination.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
