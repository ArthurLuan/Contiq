import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SuggestionPanel from '../components/dashboard/SuggestionPanel';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [suggestionPanelOpen, setSuggestionPanelOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-rich-black text-white">
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          toggleSuggestionPanel={() => setSuggestionPanelOpen(!suggestionPanelOpen)}
          isSuggestionPanelOpen={suggestionPanelOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-dark-gray/50">
          <Outlet />
        </main>
      </div>
      
      <SuggestionPanel 
        isOpen={suggestionPanelOpen} 
        onClose={() => setSuggestionPanelOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;