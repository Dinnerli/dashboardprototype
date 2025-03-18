
import { useState } from 'react';
import OverviewContent from './OverviewContent';
import { CalendarDays, ClipboardList, Globe } from 'lucide-react';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('period');

  return (
    <div className="flex flex-col gap-6 px-5 py-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Overview administrative dashboard
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div 
            className={`flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg transition-colors ${
              activeFilter === 'period' ? 'bg-blue-light text-blue' : 'text-dark hover:bg-gray-100'
            }`}
            onClick={() => setActiveFilter('period')}
          >
            <CalendarDays size={16} />
            <span className="font-poppins font-medium text-sm">Last 60 Days</span>
          </div>
          
          <div 
            className={`flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg transition-colors ${
              activeFilter === 'type' ? 'bg-blue-light text-blue' : 'text-dark hover:bg-gray-100'
            }`}
            onClick={() => setActiveFilter('type')}
          >
            <ClipboardList size={16} />
            <span className="font-poppins font-medium text-sm">Marketing</span>
          </div>
          
          <div 
            className={`flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg transition-colors ${
              activeFilter === 'status' ? 'bg-blue-light text-blue' : 'text-dark hover:bg-gray-100'
            }`}
            onClick={() => setActiveFilter('status')}
          >
            <Globe size={16} />
            <span className="font-poppins font-medium text-sm">Published</span>
          </div>
        </div>
      </div>
      
      <OverviewContent />
      
      {/* Placeholder for upcoming dashboard sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="dashboard-card min-h-[300px] flex items-center justify-center border border-gray-100">
          <p className="text-gray-500">Activity graph will appear here</p>
        </div>
        
        <div className="dashboard-card min-h-[300px] flex items-center justify-center border border-gray-100">
          <p className="text-gray-500">Recent users will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
