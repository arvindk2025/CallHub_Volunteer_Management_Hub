
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
      
      // Check if EmailJS is configured
      if (config.serviceId === 'YOUR_SERVICE_ID' || !config.serviceId || !config.templateId || !config.publicKey) {
        console.log('EmailJS not configured yet. Email content:');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
        console.log('\nTo send real emails:');
        console.log('1. Go to Manager Dashboard > Email Configuration');
        console.log('2. Sign up at https://www.emailjs.com/');
        console.log('3. Create a service and template');
        console.log('4. Enter your credentials in the Email Configuration section');
        
        return {
          success: true,
          message: 'Email logged to console (EmailJS not configured)'
        };
      }

      // Initialize EmailJS with your public key
      emailjs.init(config.publicKey);

      // Send email using EmailJS
      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          to_email: to,
          subject: subject,
          message: body,
          from_name: 'CallHub Team'
        }
      );

      console.log('Email sent successfully via EmailJS:', response);
      return {
        success: true,
        message: 'Email sent successfully via EmailJS'
      };
    } catch (error) {
      console.error('Error sending email via EmailJS:', error);
      
      // Fallback to console logging if EmailJS fails
      console.log('Fallback - Email content:');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      
      return {
        success: false,
        message: 'Failed to send email via EmailJS, logged to console instead'
      };
    }
  }
}

export const emailService = new EmailService();

// Email reminder service for volunteers
export const scheduleMonthlyReminder = (email: string, name: string) => {
  // This would typically connect to a backend service
  // For demo purposes, we'll simulate with console logging
  console.log(`Monthly reminder scheduled for ${name} (${email})`);
  
  // In a real application, this would:
  // 1. Set up a recurring job/cron task
  // 2. Send email via service like SendGrid, AWS SES, etc.
  // 3. Track reminder history
  
  return {
    success: true,
    message: 'Monthly reminder scheduled successfully'
  };
};

export const sendCampaignReminder = (email: string, campaignName: string, campaignDate: string) => {
  // This would send a reminder 2 hours before campaign starts
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
