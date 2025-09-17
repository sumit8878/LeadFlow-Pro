import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LeadListing } from './components/LeadListing';
import { LeadDetails } from './components/LeadDetails';
import { LeadManagement } from './components/LeadManagement';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('listing');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
    setSelectedLeadId(null);
  };

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeadId(leadId);
    setCurrentScreen('details');
  };

  const handleBackToListing = () => {
    setSelectedLeadId(null);
    setCurrentScreen('listing');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentScreen={currentScreen} onScreenChange={handleScreenChange} />
      
      <main>
        {currentScreen === 'listing' && (
          <LeadListing onLeadSelect={handleLeadSelect} />
        )}
        
        {currentScreen === 'details' && selectedLeadId && (
          <LeadDetails leadId={selectedLeadId} onBack={handleBackToListing} />
        )}
        
        {currentScreen === 'management' && (
          <LeadManagement />
        )}
        
        {currentScreen === 'dashboard' && (
          <Dashboard />
        )}
      </main>
    </div>
  );
}