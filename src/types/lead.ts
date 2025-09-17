export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: 'Facebook' | 'Twitter' | 'Google' | 'Website' | 'Offline Event' | 'Referral';
  status: 'New' | 'Contacted' | 'Qualified' | 'Not Interested' | 'Follow Up' | 'Converted';
  priority: 'High' | 'Medium' | 'Low';
  interestedVehicle: string;
  budget: string;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  notes: string;
  score: number;
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note' | 'Status Change';
  description: string;
  timestamp: string;
  performedBy: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
  topSources: Array<{ source: string; count: number; }>;
  monthlyTrends: Array<{ month: string; leads: number; conversions: number; }>;
}