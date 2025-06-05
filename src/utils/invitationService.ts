
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

      // Calculate hourly rate (assuming it's stored in campaign data or default)
      const hourlyRate = campaign.hourlyRate || 25; // Default $25/hour if not specified

      const emailSubject = `Invitation: Join ${campaign.name} Campaign`;
      
      const emailBody = `
        Hi ${volunteer.name || 'there'},

        ${invitation.message ? invitation.message : 'You have been personally invited to join an exciting volunteer campaign!'}

        **Campaign Details:**
        📋 Campaign: ${campaign.name}
        👨‍💼 Manager: ${campaign.manager}
        📅 Date: ${campaign.startDate} - ${campaign.endDate}
        🕐 Shift: ${campaign.startTime} - ${campaign.endTime}
        📍 Location: ${campaign.location}
        💰 Compensation: $${hourlyRate}/hour

        **About the Campaign:**
        ${campaign.description}

        **Skills Required:** ${campaign.skillsRequired.join(', ')}

        Are you interested in this campaign? The manager ${campaign.manager} is approaching you specifically for this opportunity.

        Please log in to your volunteer dashboard to respond to this invitation.

        Best regards,
        CallHub Team
      `;

      console.log('Sending invitation email to:', cleanEmail);
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
