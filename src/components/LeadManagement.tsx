import { useState } from 'react';
import { Users, UserCheck, Settings, CheckSquare, UserPlus, Mail, Phone, Calendar, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Lead } from '../types/lead';
import { mockLeads } from '../data/mockData';

export function LeadManagement() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesAssignee = assigneeFilter === 'all' || lead.assignedTo === assigneeFilter;
    return matchesStatus && matchesAssignee;
  });

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedLeads(prev => 
      prev.length === filteredLeads.length 
        ? [] 
        : filteredLeads.map(lead => lead.id)
    );
  };

  const executeBulkAction = () => {
    if (bulkAction && selectedLeads.length > 0) {
      console.log(`Executing ${bulkAction} on leads:`, selectedLeads);
      // In a real app, this would make API calls
      setSelectedLeads([]);
      setBulkAction('');
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const uniqueAssignees = Array.from(new Set(mockLeads.map(lead => lead.assignedTo)));

  // Get leads requiring attention
  const leadsRequiringAttention = mockLeads.filter(lead => {
    const lastContactDate = new Date(lead.lastContact);
    const daysSinceContact = Math.floor((Date.now() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24));
    return (lead.status === 'New' && daysSinceContact > 1) || 
           (lead.status === 'Follow Up' && daysSinceContact > 2);
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lead Management</h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="size-4" />
          Add New Lead
        </Button>
      </div>

      {/* Management Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <Settings className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{leadsRequiringAttention.length}</div>
            <p className="text-xs text-muted-foreground">Overdue follow-ups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockLeads.filter(l => !l.assignedTo || l.assignedTo === 'Unassigned').length}
            </div>
            <p className="text-xs text-muted-foreground">Need assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <UserCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockLeads.filter(l => l.priority === 'High').length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected</CardTitle>
            <CheckSquare className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{selectedLeads.length}</div>
            <p className="text-xs text-muted-foreground">For bulk actions</p>
          </CardContent>
        </Card>
      </div>

      {/* Attention Required Alert */}
      {leadsRequiringAttention.length > 0 && (
        <Alert>
          <Settings className="size-4" />
          <AlertDescription>
            {leadsRequiringAttention.length} leads require immediate attention due to overdue follow-ups. 
            Review these leads to maintain customer engagement.
          </AlertDescription>
        </Alert>
      )}

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm">Select All ({selectedLeads.length} selected)</span>
            </div>
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose bulk action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assign">Assign to Sales Rep</SelectItem>
                <SelectItem value="status-contacted">Mark as Contacted</SelectItem>
                <SelectItem value="status-followup">Set Follow-up Reminder</SelectItem>
                <SelectItem value="send-email">Send Email Campaign</SelectItem>
                <SelectItem value="export">Export Selected</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={executeBulkAction} 
              disabled={!bulkAction || selectedLeads.length === 0}
            >
              Execute Action
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="size-5" />
            Management Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Follow Up">Follow Up</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {uniqueAssignees.map(assignee => (
                  <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Management Table ({filteredLeads.length} leads)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Quick Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const isOverdue = leadsRequiringAttention.some(l => l.id === lead.id);
                return (
                  <TableRow 
                    key={lead.id} 
                    className={`${isOverdue ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleLeadSelection(lead.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.firstName} {lead.lastName}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.priority === 'High' ? 'destructive' : 
                                lead.priority === 'Medium' ? 'secondary' : 'outline'}
                      >
                        {lead.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.assignedTo}</TableCell>
                    <TableCell>
                      <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                        {formatDate(lead.lastContact)}
                        {isOverdue && <span className="ml-1">⚠️</span>}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {lead.status === 'New' && 'Initial Contact'}
                        {lead.status === 'Contacted' && 'Follow-up Call'}
                        {lead.status === 'Qualified' && 'Send Proposal'}
                        {lead.status === 'Follow Up' && 'Schedule Meeting'}
                        {lead.status === 'Not Interested' && 'Archive'}
                        {lead.status === 'Converted' && 'Post-Sale Follow-up'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{lead.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="size-8 p-0">
                          <Phone className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="size-8 p-0">
                          <Mail className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="size-8 p-0">
                          <Calendar className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}