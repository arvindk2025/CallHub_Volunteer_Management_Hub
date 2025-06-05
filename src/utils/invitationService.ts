
import { Invitation } from '../data/campaigns';
import { emailService } from './emailService';
import { campaigns, volunteers } from '../data/campaigns';

class InvitationService {
  private invitations: Invitation[] = [];

  // Send invitation from manager to volunteer
  async sendInvitation(campaignId: string, volunteerId: string, message?: string): Promise<Invitation> {
    const invitation: Invitation = {
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      campaignId,
      volunteerId,
      invitedDate: new Date().toISOString(),
      status: 'pending',
      message
    };

    this.invitations.push(invitation);
    
    // Store in localStorage for persistence
    localStorage.setItem('invitations', JSON.stringify(this.invitations));
    
    // Send email to volunteer
    await this.sendInvitationEmail(invitation);
    
    return invitation;
  }

  // Send email to volunteer about the invitation
  private async sendInvitationEmail(invitation: Invitation): Promise<void> {
    try {
      console.log('🔍 Looking for campaign and volunteer data...');
      
      // Get campaign details
      const campaign = campaigns.find(c => c.id === invitation.campaignId);
      if (!campaign) {
        console.error('❌ Campaign not found for ID:', invitation.campaignId);
        return;
      }
      console.log('✅ Found campaign:', campaign.name);

      // Get volunteer from imported data first, then check localStorage as fallback
      let volunteer = volunteers.find((v: any) => v.id === invitation.volunteerId);
      
      if (!volunteer) {
        console.log('🔍 Volunteer not found in imported data, checking localStorage...');
        const storedVolunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
        volunteer = storedVolunteers.find((v: any) => v.id === invitation.volunteerId);
      }
      
      if (!volunteer) {
        console.error('❌ Volunteer not found for ID:', invitation.volunteerId);
        return;
      }
      console.log('✅ Found volunteer:', volunteer.name, volunteer.email);

      // Clean email address (remove +number if present)
      let cleanEmail = volunteer.email;
      if (cleanEmail.includes('+')) {
        const [prefix, domain] = cleanEmail.split('@');
        const cleanPrefix = prefix.split('+')[0];
        cleanEmail = `${cleanPrefix}@${domain}`;
      }

      // Calculate hourly rate (default $25/hour)
      const hourlyRate = 25;
      const dashboardUrl = `${window.location.origin}/volunteer-dashboard`;

      const emailSubject = `🌟 Exclusive Invitation: Join ${campaign.name} Campaign - Earn $${hourlyRate}/hour!`;
      
      // Create the email body with actual campaign and volunteer data
      const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Campaign Invitation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">🌟 Exclusive Campaign Invitation!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You've Been Personally Selected</p>
    </div>
    
    <!-- Main Content -->
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
        
        <p style="font-size: 18px; margin-bottom: 20px;">Dear <strong>${volunteer.name}</strong>,</p>
        
        <p style="font-size: 16px; margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-left: 4px solid #667eea; border-radius: 5px;">
            ${invitation.message || `Hey ${volunteer.name}! Are you interested in this exciting campaign? ${campaign.manager} is personally approaching you for this amazing opportunity because of your exceptional skills and dedication!`}
        </p>
        
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h2 style="margin: 0 0 15px 0; font-size: 22px;">✨ Campaign Details</h2>
            <div style="display: grid; gap: 10px;">
                <div><strong>🏆 Campaign:</strong> ${campaign.name}</div>
                <div><strong>👨‍💼 Manager:</strong> ${campaign.manager}</div>
                <div><strong>📅 Period:</strong> ${campaign.startDate} - ${campaign.endDate}</div>
                <div><strong>🕐 Shift:</strong> ${campaign.startTime} - ${campaign.endTime}</div>
                <div><strong>📍 Location:</strong> ${campaign.location}</div>
                <div><strong>💰 Compensation:</strong> $${hourlyRate}/hour</div>
            </div>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #2d5a2d; margin: 0 0 15px 0;">🎯 Why We Chose You:</h3>
            <p style="margin: 0; color: #2d5a2d;">Based on your impressive track record and skills in ${(volunteer.skills || campaign.skillsRequired).slice(0, 2).join(' and ')}, we believe you're the perfect fit for this campaign!</p>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #ffeaa7;">
            <h3 style="color: #856404; margin: 0 0 15px 0;">💡 What Makes This Special:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #856404;">
                <li>Flexible scheduling within shift hours</li>
                <li>Competitive hourly compensation</li>
                <li>Work with an experienced team</li>
                <li>Make a real impact in the community</li>
                <li>Add valuable experience to your portfolio</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; border-radius: 10px; display: inline-block;">
                <h3 style="margin: 0 0 10px 0;">🚀 Ready to Join?</h3>
                <p style="margin: 0; font-size: 16px;">This is an exclusive invitation just for you!</p>
                <a href="${window.location.origin}/login" style="display: inline-block; background: #ffffff; color: #11998e; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 15px; transition: all 0.3s;">
                    🔗 Sign In as Volunteer
                </a>
            </div>
        </div>
        
        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #155724; margin: 0 0 15px 0;">👆 Next Steps:</h3>
            <p style="margin: 0; color: #155724;">Please log in to your volunteer dashboard to respond to this invitation and secure your spot in this exciting campaign.</p>
        </div>
        
        <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 10px; margin: 25px 0; text-align: center;">
            <p style="margin: 0; color: #721c24; font-weight: bold;">⏰ Don't Wait! Great opportunities like this fill up quickly.</p>
            <p style="margin: 5px 0 0 0; color: #721c24;">Respond within 48 hours to guarantee your spot.</p>
        </div>
        
    </div>
    
    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 25px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="margin: 0 0 15px 0; font-size: 16px;">Looking forward to having you on our team!</p>
        <p style="margin: 0 0 20px 0;">
            <strong>Best regards,</strong><br>
            ${campaign.manager}<br>
            <em>Campaign Manager</em><br>
            <strong>CallHub Team</strong>
        </p>
        
        <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
                💬 Questions? Reply to this email or contact your campaign manager directly.<br>
                🌐 Access your dashboard: <a href="${dashboardUrl}" style="color: #667eea;">Volunteer Dashboard</a>
            </p>
        </div>
    </div>
    
</body>
</html>
      `;

      console.log('📧 Sending invitation email to:', cleanEmail);
      console.log('📋 Email subject:', emailSubject);
      console.log('👤 Volunteer name:', volunteer.name);
      console.log('🏆 Campaign name:', campaign.name);

      const result = await emailService.sendEmail({
        to: cleanEmail,
        subject: emailSubject,
        body: emailBody
      });

      if (result.success) {
        console.log('✅ Invitation email sent successfully to:', cleanEmail);
      } else {
        console.error('❌ Failed to send invitation email to:', cleanEmail, result.error);
      }

    } catch (error) {
      console.error('❌ Error in sendInvitationEmail:', error);
      console.error('Error details:', {
        campaignId: invitation.campaignId,
        volunteerId: invitation.volunteerId,
        message: invitation.message
      });
    }
  }

  // Send bulk invitations to multiple volunteers
  async sendBulkInvitations(campaignId: string, volunteerIds: string[], message?: string): Promise<Invitation[]> {
    const invitations: Invitation[] = [];
    
    console.log(`📤 Starting bulk invitation process for ${volunteerIds.length} volunteers...`);
    
    for (let i = 0; i < volunteerIds.length; i++) {
      const volunteerId = volunteerIds[i];
      try {
        console.log(`📧 Sending invitation ${i + 1}/${volunteerIds.length} to volunteer ID: ${volunteerId}`);
        const invitation = await this.sendInvitation(campaignId, volunteerId, message);
        invitations.push(invitation);
        
        // Add a small delay between emails to avoid rate limiting
        if (i < volunteerIds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`❌ Failed to send invitation to volunteer ${volunteerId}:`, error);
      }
    }
    
    console.log(`✅ Bulk invitation process completed. Sent ${invitations.length}/${volunteerIds.length} invitations.`);
    return invitations;
  }

  // Get invitations for a specific volunteer
  getVolunteerInvitations(volunteerId: string): Invitation[] {
    this.loadInvitations();
    return this.invitations.filter(inv => inv.volunteerId === volunteerId);
  }

  getManagerInvitations(): Invitation[] {
    this.loadInvitations();
    return this.invitations;
  }

  updateInvitationStatus(invitationId: string, status: 'accepted' | 'declined'): void {
    this.loadInvitations();
    const invitation = this.invitations.find(inv => inv.id === invitationId);
    if (invitation) {
      invitation.status = status;
      localStorage.setItem('invitations', JSON.stringify(this.invitations));
    }
  }

  private loadInvitations(): void {
    const stored = localStorage.getItem('invitations');
    if (stored) {
      this.invitations = JSON.parse(stored);
    }
  }
}

export const invitationService = new InvitationService();
