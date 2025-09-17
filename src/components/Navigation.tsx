import { Users, UserCheck, Settings, BarChart3, Car } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const navItems = [
    { id: 'listing', label: 'Lead Listing', icon: Users },
    { id: 'management', label: 'Lead Management', icon: Settings },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }
  ];

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Car className="size-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-primary">LeadFlow Pro</h1>
              <p className="text-sm text-muted-foreground">HSR Motors Lead Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentScreen === item.id ? 'default' : 'ghost'}
                onClick={() => onScreenChange(item.id)}
                className="flex items-center gap-2"
              >
                <Icon className="size-4" />
                {item.label}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">Sales Manager</p>
          </div>
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            SJ
          </div>
        </div>
      </div>
    </nav>
  );
}