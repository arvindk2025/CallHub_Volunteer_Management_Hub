
import { Invitation } from '../data/campaigns';

class InvitationService {
  private invitations: Invitation[] = [];

  // Send invitation from manager to volunteer
  sendInvitation(campaignId: string, volunteerId: string, message?: string): Invitation {
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
    
    return invitation;
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
