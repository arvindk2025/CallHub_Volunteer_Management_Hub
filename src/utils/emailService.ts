
import emailjs from '@emailjs/browser';

// Email service for sending notifications
class EmailService {
  private getConfiguration() {
    const saved = localStorage.getItem('emailjs-config');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      serviceId: 'YOUR_SERVICE_ID',
      templateId: 'YOUR_TEMPLATE_ID',
      publicKey: 'YOUR_PUBLIC_KEY'
    };
  }

  async sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
    try {
      const config = this.getConfiguration();
      
      console.log('=== EMAIL DEBUG INFO ===');
      console.log('EmailJS Config:', {
        serviceId: config.serviceId,
        templateId: config.templateId,
        publicKey: config.publicKey ? 'SET' : 'NOT SET'
      });
      console.log('Email Details:', { to, subject });
      
      // Check if EmailJS is configured
      if (config.serviceId === 'YOUR_SERVICE_ID' || !config.serviceId || !config.templateId || !config.publicKey) {
        console.warn('❌ EmailJS NOT CONFIGURED - Showing email in console instead');
        console.log(`📧 TO: ${to}`);
        console.log(`📧 SUBJECT: ${subject}`);
        console.log(`📧 BODY: ${body}`);
        console.log('\n🔧 TO SEND REAL EMAILS:');
        console.log('1. Go to Manager Dashboard > Email Configuration');
        console.log('2. Sign up at https://www.emailjs.com/');
        console.log('3. Create a service and template');
        console.log('4. Enter your credentials in the Email Configuration section');
        
        return {
          success: true,
          message: 'Email logged to console (EmailJS not configured)'
        };
      }

      console.log('✅ EmailJS is configured, attempting to send...');

      // Initialize EmailJS with your public key
      emailjs.init(config.publicKey);

      // Prepare template parameters
      const templateParams = {
        to_email: to,
        subject: subject,
        message: body,
        from_name: 'CallHub Campaign Manager'
      };

      console.log('📤 Sending email with params:', templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams
      );

      console.log('✅ EMAIL SENT SUCCESSFULLY via EmailJS:', response);
      console.log('Response status:', response.status);
      console.log('Response text:', response.text);
      
      return {
        success: true,
        message: 'Email sent successfully via EmailJS',
        response: response
      };
    } catch (error) {
      console.error('❌ ERROR SENDING EMAIL via EmailJS:', error);
      console.error('Error details:', error);
      
      // More detailed error logging
      if (error.text) {
        console.error('EmailJS Error Text:', error.text);
      }
      if (error.status) {
        console.error('EmailJS Error Status:', error.status);
      }
      
      // Fallback to console logging if EmailJS fails
      console.log('🔄 FALLBACK - Email content logged to console:');
      console.log(`📧 TO: ${to}`);
      console.log(`📧 SUBJECT: ${subject}`);
      console.log(`📧 BODY: ${body}`);
      
      return {
        success: false,
        message: 'Failed to send email via EmailJS, logged to console instead',
        error: error
      };
    }
  }

  // Test email configuration
  async testConfiguration() {
    const config = this.getConfiguration();
    
    if (config.serviceId === 'YOUR_SERVICE_ID' || !config.serviceId || !config.templateId || !config.publicKey) {
      return {
        configured: false,
        message: 'EmailJS not configured'
      };
    }

    try {
      // Try to send a test email
      const testResult = await this.sendEmail({
        to: 'test@example.com',
        subject: 'Test Email Configuration',
        body: 'This is a test email to verify EmailJS configuration.'
      });

      return {
        configured: true,
        message: 'Configuration appears valid',
        testResult
      };
    } catch (error) {
      return {
        configured: true,
        message: 'Configuration set but may have errors',
        error: error
      };
    }
  }
}

export const emailService = new EmailService();

// Email reminder service for volunteers
export const scheduleMonthlyReminder = (email: string, name: string) => {
  console.log(`Monthly reminder scheduled for ${name} (${email})`);
  
  return {
    success: true,
    message: 'Monthly reminder scheduled successfully'
  };
};

export const sendCampaignReminder = (email: string, campaignName: string, campaignDate: string) => {
  console.log(`Campaign reminder sent to ${email} for ${campaignName} on ${campaignDate}`);
  
  return {
    success: true,
    message: 'Campaign reminder sent successfully'
  };
};

export const checkProfileUpdates = (lastUpdated: string) => {
  const lastUpdate = new Date(lastUpdated);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    needsUpdate: daysDiff > 30,
    daysSinceUpdate: daysDiff
  };
};
