
import { Invitation } from '../data/campaigns';
import { emailService } from './emailService';
import { campaigns } from '../data/campaigns';

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
      // Get campaign details
      const campaign = campaigns.find(c => c.id === invitation.campaignId);
      if (!campaign) return;

      // Get volunteer email from localStorage (assuming it's stored with volunteer data)
      const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
      const volunteer = volunteers.find((v: any) => v.id === invitation.volunteerId);
      
      if (!volunteer) return;

      // Clean email address (remove +number if present)
      let cleanEmail = volunteer.email;
      if (cleanEmail.includes('+')) {
        const [prefix, domain] = cleanEmail.split('@');
        const cleanPrefix = prefix.split('+')[0];
        cleanEmail = `${cleanPrefix}@${domain}`;
      }

      // Calculate hourly rate (default $25/hour)
      const hourlyRate = 25;

      const emailSubject = `🌟 Exclusive Invitation: Join ${campaign.name} Campaign - Earn $${hourlyRate}/hour!`;
      
      const emailBody = `
        Dear ${volunteer.name || 'Valued Volunteer'},

        🎉 **You've Been Personally Selected!** 🎉

        ${invitation.message ? invitation.message : `Hey! Are you interested in this exciting campaign? ${campaign.manager} is personally approaching you for this amazing opportunity because of your exceptional skills and dedication!`}

        ✨ **Campaign Opportunity Details:**
        
        🏆 **Campaign:** ${campaign.name}
        👨‍💼 **Campaign Manager:** ${campaign.manager}
        📅 **Campaign Period:** ${campaign.startDate} - ${campaign.endDate}
        🕐 **Shift Timing:** ${campaign.startTime} - ${campaign.endTime}
        📍 **Location:** ${campaign.location}
        💰 **Compensation:** $${hourlyRate}/hour (Competitive Pay!)
        
        🎯 **Why We Chose You:**
        Based on your impressive track record and skills, we believe you're the perfect fit for this campaign. Your expertise in ${campaign.skillsRequired.slice(0, 2).join(' and ')} makes you an ideal candidate!

        📋 **Campaign Description:**
        ${campaign.description}

        🔧 **Required Skills:** ${campaign.skillsRequired.join(', ')}

        💡 **What Makes This Special:**
        ✅ Flexible scheduling within shift hours
        ✅ Competitive hourly compensation
        ✅ Work with an experienced team
        ✅ Make a real impact in the community
        ✅ Add valuable experience to your portfolio

        🚀 **Ready to Join?**
        This is an exclusive invitation just for you! We have limited spots available, and ${campaign.manager} specifically requested to invite you based on your previous excellent performance.

        👆 **Next Steps:**
        Please log in to your volunteer dashboard to respond to this invitation and secure your spot in this exciting campaign.

        ⏰ **Don't Wait!** 
        Great opportunities like this fill up quickly. Respond within 48 hours to guarantee your spot.

        Looking forward to having you on our team!

        Best regards,
        ${campaign.manager}
        Campaign Manager
        CallHub Team

        ---
        💬 Questions? Reply to this email or contact your campaign manager directly.
        🌐 Access your dashboard: ${window.location.origin}/volunteer-dashboard
      `;

      console.log('Sending personalized invitation email to:', cleanEmail);
      console.log('Email subject:', emailSubject);
      console.log('Email body:', emailBody);

      await emailService.sendEmail({
        to: cleanEmail,
        subject: emailSubject,
        body: emailBody
      });

      console.log('Invitation email sent successfully to:', cleanEmail);
    } catch (error) {
      console.error('Error sending invitation email:', error);
    }
  }

  // Get invitations for a specific volunteer
  getVolunteerInvitations(volunteerId: string): Invitation[] {
    this.loadInvitations();
    return this.invitations.filter(inv => inv.volunteerId === volunteerId);
  }

  // Get all invitations for a manager
  getManagerInvitations(): Invitation[] {
    this.loadInvitations();
    return this.invitations;
  }

  // Update invitation status
  updateInvitationStatus(invitationId: string, status: 'accepted' | 'declined'): void {
    this.loadInvitations();
    const invitation = this.invitations.find(inv => inv.id === invitationId);
    if (invitation) {
      invitation.status = status;
      localStorage.setItem('invitations', JSON.stringify(this.invitations));
    }
  }

  // Load invitations from localStorage
  private loadInvitations(): void {
    const stored = localStorage.getItem('invitations');
    if (stored) {
      this.invitations = JSON.parse(stored);
    }
  }
}

export const invitationService = new InvitationService();
