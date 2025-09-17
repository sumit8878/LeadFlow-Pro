import { Lead, Activity, DashboardMetrics } from '../types/lead';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'Call',
    description: 'Initial contact - discussed Honda Civic interest',
    timestamp: '2024-12-15T10:30:00Z',
    performedBy: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'Email',
    description: 'Sent vehicle specifications and pricing',
    timestamp: '2024-12-15T11:15:00Z',
    performedBy: 'Sarah Johnson'
  }
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    source: 'Facebook',
    status: 'Qualified',
    priority: 'High',
    interestedVehicle: 'Honda Civic 2024',
    budget: '$25,000 - $30,000',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-12-15T09:00:00Z',
    lastContact: '2024-12-15T11:15:00Z',
    notes: 'Looking for reliable family car. Interested in financing options.',
    score: 85,
    activities: mockActivities
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 234-5678',
    source: 'Google',
    status: 'New',
    priority: 'Medium',
    interestedVehicle: 'Toyota Camry 2024',
    budget: '$30,000 - $35,000',
    assignedTo: 'Mike Wilson',
    createdAt: '2024-12-16T14:30:00Z',
    lastContact: '2024-12-16T14:30:00Z',
    notes: 'Submitted inquiry through website contact form.',
    score: 65,
    activities: [
      {
        id: '3',
        type: 'Note',
        description: 'Lead created from website inquiry',
        timestamp: '2024-12-16T14:30:00Z',
        performedBy: 'System'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@email.com',
    phone: '+1 (555) 345-6789',
    source: 'Website',
    status: 'Follow Up',
    priority: 'High',
    interestedVehicle: 'BMW X3 2024',
    budget: '$45,000 - $50,000',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-12-14T16:45:00Z',
    lastContact: '2024-12-15T10:00:00Z',
    notes: 'Previous BMW owner. Interested in trade-in value.',
    score: 90,
    activities: [
      {
        id: '4',
        type: 'Call',
        description: 'Discussed trade-in options for current BMW X1',
        timestamp: '2024-12-15T10:00:00Z',
        performedBy: 'Sarah Johnson'
      }
    ]
  },
  {
    id: '4',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.wilson@email.com',
    phone: '+1 (555) 456-7890',
    source: 'Twitter',
    status: 'Not Interested',
    priority: 'Low',
    interestedVehicle: 'Ford Mustang 2024',
    budget: '$35,000 - $40,000',
    assignedTo: 'Mike Wilson',
    createdAt: '2024-12-13T11:20:00Z',
    lastContact: '2024-12-14T09:30:00Z',
    notes: 'Found a vehicle elsewhere. Not interested at this time.',
    score: 25,
    activities: [
      {
        id: '5',
        type: 'Call',
        description: 'Called to follow up - customer found vehicle elsewhere',
        timestamp: '2024-12-14T09:30:00Z',
        performedBy: 'Mike Wilson'
      }
    ]
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david.johnson@email.com',
    phone: '+1 (555) 567-8901',
    source: 'Offline Event',
    status: 'Converted',
    priority: 'High',
    interestedVehicle: 'Mercedes C-Class 2024',
    budget: '$40,000 - $45,000',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-12-10T10:00:00Z',
    lastContact: '2024-12-16T15:30:00Z',
    notes: 'Met at auto show. Purchased vehicle today!',
    score: 100,
    activities: [
      {
        id: '6',
        type: 'Meeting',
        description: 'Auto show contact - very interested',
        timestamp: '2024-12-10T10:00:00Z',
        performedBy: 'Sarah Johnson'
      },
      {
        id: '7',
        type: 'Status Change',
        description: 'Converted - Purchase completed',
        timestamp: '2024-12-16T15:30:00Z',
        performedBy: 'Sarah Johnson'
      }
    ]
  },
  {
    id: '6',
    firstName: 'Michelle',
    lastName: 'Thompson',
    email: 'michelle.thompson@email.com',
    phone: '+1 (555) 678-9012',
    source: 'Referral',
    status: 'Contacted',
    priority: 'Medium',
    interestedVehicle: 'Audi A4 2024',
    budget: '$42,000 - $47,000',
    assignedTo: 'Mike Wilson',
    createdAt: '2024-12-16T08:15:00Z',
    lastContact: '2024-12-16T13:45:00Z',
    notes: 'Referred by existing customer David Johnson. Interested in Audi lineup.',
    score: 75,
    activities: [
      {
        id: '8',
        type: 'Email',
        description: 'Sent welcome email and Audi brochures',
        timestamp: '2024-12-16T13:45:00Z',
        performedBy: 'Mike Wilson'
      }
    ]
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalLeads: 156,
  newLeads: 23,
  qualifiedLeads: 45,
  convertedLeads: 12,
  conversionRate: 7.7,
  avgResponseTime: 2.5,
  topSources: [
    { source: 'Website', count: 52 },
    { source: 'Google', count: 38 },
    { source: 'Facebook', count: 28 },
    { source: 'Referral', count: 22 },
    { source: 'Offline Event', count: 16 }
  ],
  monthlyTrends: [
    { month: 'Aug', leads: 134, conversions: 8 },
    { month: 'Sep', leads: 142, conversions: 11 },
    { month: 'Oct', leads: 128, conversions: 9 },
    { month: 'Nov', leads: 156, conversions: 12 },
    { month: 'Dec', leads: 89, conversions: 7 }
  ]
};