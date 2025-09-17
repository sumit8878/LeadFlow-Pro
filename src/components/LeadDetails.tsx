import { useState } from 'react';
import { ArrowLeft, Phone, Mail, Star, Calendar, User, Car, DollarSign, MapPin, Clock, Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Lead } from '../types/lead';
import { mockLeads } from '../data/mockData';

interface LeadDetailsProps {
  leadId: string;
  onBack: () => void;
}

export function LeadDetails({ leadId, onBack }: LeadDetailsProps) {
  const lead = mockLeads.find(l => l.id === leadId);
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  if (!lead) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Back to Listing
          </Button>
        </div>
        <p>Lead not found.</p>
      </div>
    );
  }

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Qualified': return 'bg-green-100 text-green-800 border-green-200';
      case 'Not Interested': return 'bg-red-100 text-red-800 border-red-200';
      case 'Follow Up': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Converted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const addNote = () => {
    if (newNote.trim()) {
      // In a real app, this would make an API call
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Back to Listing
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{lead.firstName} {lead.lastName}</h1>
            <p className="text-muted-foreground">Lead ID: {lead.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(lead.status)}>
            {lead.status}
          </Badge>
          <div className={`flex items-center gap-1 ${getPriorityColor(lead.priority)}`}>
            <Star className="size-4 fill-current" />
            {lead.priority} Priority
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{lead.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex items-center gap-2">
                  <Phone className="size-4" />
                  Call Now
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Mail className="size-4" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Interest */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="size-5" />
                Vehicle Interest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Interested Vehicle</p>
                  <p className="text-sm text-muted-foreground">{lead.interestedVehicle}</p>
                </div>
                <div>
                  <p className="font-medium">Budget Range</p>
                  <p className="text-sm text-muted-foreground">{lead.budget}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lead.activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {activity.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">by {activity.performedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Note */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-5" />
                Add Activity Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add a note about your interaction with this lead..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button onClick={addNote} disabled={!newNote.trim()}>
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lead Score */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{lead.score}</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${lead.score}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {lead.score >= 80 ? 'High Quality Lead' : 
                   lead.score >= 60 ? 'Medium Quality Lead' : 
                   'Low Quality Lead'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Lead Details */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Source</p>
                <Badge variant="secondary">{lead.source}</Badge>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Assigned To</p>
                <p className="text-sm text-muted-foreground">{lead.assignedTo}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Created</p>
                <p className="text-sm text-muted-foreground">{formatDate(lead.createdAt)}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Last Contact</p>
                <p className="text-sm text-muted-foreground">{formatDate(lead.lastContact)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                  <SelectItem value="Follow Up">Follow Up</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Calendar className="size-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="w-full">
                <Edit className="size-4 mr-2" />
                Edit Lead
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          {lead.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{lead.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}