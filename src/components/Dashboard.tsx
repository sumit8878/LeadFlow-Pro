import { TrendingUp, Users, UserCheck, Target, Clock, Award, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { mockDashboardMetrics, mockLeads } from '../data/mockData';

export function Dashboard() {
  const metrics = mockDashboardMetrics;

  // Calculate additional metrics
  const leadsBySource = metrics.topSources;
  const conversionBySource = leadsBySource.map(source => ({
    source: source.source,
    leads: source.count,
    conversions: Math.floor(source.count * (metrics.conversionRate / 100)),
    rate: ((Math.floor(source.count * (metrics.conversionRate / 100)) / source.count) * 100).toFixed(1)
  }));

  const leadsByStatus = mockLeads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(leadsByStatus).map(([status, count]) => ({
    name: status,
    value: count
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

  const teamPerformance = [
    { name: 'Sarah Johnson', leads: 28, conversions: 6, rate: 21.4 },
    { name: 'Mike Wilson', leads: 24, conversions: 4, rate: 16.7 },
    { name: 'Jennifer Davis', leads: 19, conversions: 3, rate: 15.8 },
    { name: 'Robert Chen', leads: 16, conversions: 2, rate: 12.5 }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with John Smith', type: 'Call', priority: 'High', time: '10:00 AM' },
    { id: 2, task: 'Send proposal to Emily Davis', type: 'Email', priority: 'Medium', time: '2:00 PM' },
    { id: 3, task: 'Schedule test drive for Robert Brown', type: 'Meeting', priority: 'High', time: '4:30 PM' },
    { id: 4, task: 'Weekly team meeting', type: 'Meeting', priority: 'Low', time: '5:00 PM' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of lead management performance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last updated</p>
          <p className="font-medium">Today, 3:24 PM</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+0.3h</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <UserCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.qualifiedLeads}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              Monthly Lead Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" name="Leads" />
                <Line type="monotone" dataKey="conversions" stroke="#82ca9d" name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionBySource}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#8884d8" name="Total Leads" />
                <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="size-5" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{member.name}</span>
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    {member.rate}% conversion
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{member.leads} leads</span>
                  <span>{member.conversions} conversions</span>
                </div>
                <Progress value={member.rate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="mt-1">
                  {task.type === 'Call' && <Phone className="size-4 text-blue-600" />}
                  {task.type === 'Email' && <Calendar className="size-4 text-green-600" />}
                  {task.type === 'Meeting' && <Users className="size-4 text-purple-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{task.task}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{task.time}</span>
                    <Badge 
                      variant={task.priority === 'High' ? 'destructive' : 
                              task.priority === 'Medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Source Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>Source Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversionBySource.map((source) => (
              <div key={source.source} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{source.source}</h4>
                  <Badge variant="outline">{source.rate}%</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Leads:</span>
                    <span className="font-medium">{source.leads}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conversions:</span>
                    <span className="font-medium text-green-600">{source.conversions}</span>
                  </div>
                  <Progress value={parseFloat(source.rate)} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}