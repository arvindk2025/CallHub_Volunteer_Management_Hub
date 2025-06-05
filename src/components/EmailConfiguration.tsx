
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Settings, Mail, ExternalLink, TestTube } from 'lucide-react';
import { emailService } from '../utils/emailService';

const EmailConfiguration = () => {
  const [serviceId, setServiceId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [isTestingConfig, setIsTestingConfig] = useState(false);

  useEffect(() => {
    // Load saved configuration
    const saved = localStorage.getItem('emailjs-config');
    if (saved) {
      const config = JSON.parse(saved);
      setServiceId(config.serviceId || '');
      setTemplateId(config.templateId || '');
      setPublicKey(config.publicKey || '');
    }
  }, []);

  const handleSaveConfiguration = () => {
    const config = {
      serviceId,
      templateId,
      publicKey
    };
    
    localStorage.setItem('emailjs-config', JSON.stringify(config));
    
    toast({
      title: "Configuration Saved!",
      description: "EmailJS credentials have been saved. You can now test the configuration.",
    });
  };

  const handleTestConfiguration = async () => {
    if (!testEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a test email address.",
      });
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Required",
        description: "Please configure all EmailJS credentials before testing.",
      });
      return;
    }

    setIsTestingConfig(true);

    try {
      console.log('🧪 Testing EmailJS configuration...');
      
      const result = await emailService.sendEmail({
        to: testEmail,
        subject: '🧪 EmailJS Configuration Test - CallHub',
        body: 'This is a test email to verify your EmailJS configuration is working correctly. If you receive this email, your setup is successful!'
      });

      if (result.success) {
        toast({
          title: "Test Email Sent!",
          description: `Check ${testEmail} for the test message. If you don't receive it, check your EmailJS configuration.`,
        });
      } else {
        toast({
          title: "Test Failed",
          description: "Email test failed. Check the console for detailed error information.",
        });
      }
    } catch (error) {
      console.error('Test email error:', error);
      toast({
        title: "Test Error",
        description: "Failed to send test email. Check console for details.",
      });
    } finally {
      setIsTestingConfig(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span>Email Configuration (EmailJS)</span>
        </CardTitle>
        <CardDescription>
          Configure EmailJS to send real emails to volunteers. 
          <a 
            href="https://www.emailjs.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 ml-1 inline-flex items-center"
          >
            Get your credentials here
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceId">Service ID</Label>
            <Input
              id="serviceId"
              placeholder="service_xxxxxxx"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="templateId">Template ID</Label>
            <Input
              id="templateId"
              placeholder="template_xxxxxxx"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="publicKey">Public Key</Label>
            <Input
              id="publicKey"
              placeholder="xxxxxxxxxxxxxxx"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
            />
          </div>
        </div>

        {/* Test Email Section */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">🧪 Test Configuration</h4>
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                placeholder="Enter your email to test"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                type="email"
              />
            </div>
            <Button 
              onClick={handleTestConfiguration}
              disabled={!serviceId || !templateId || !publicKey || !testEmail || isTestingConfig}
              variant="outline"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {isTestingConfig ? 'Testing...' : 'Send Test Email'}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Sign up at <strong>emailjs.com</strong></li>
            <li>Create an email service (Gmail, Outlook, etc.)</li>
            <li>Create a template with variables: <code>to_email</code>, <code>subject</code>, <code>message</code>, <code>from_name</code></li>
            <li>Copy your Service ID, Template ID, and Public Key here</li>
            <li>Save configuration and test with your email</li>
          </ol>
        </div>

        <div className="flex space-x-3">
          <Button 
            onClick={handleSaveConfiguration}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>

        {(!serviceId || !templateId || !publicKey) && (
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ Until configured, emails will be logged to the browser console instead of being sent.
            </p>
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            📋 <strong>Debug Help:</strong> Open browser console (F12) to see detailed email sending logs and any error messages.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailConfiguration;
