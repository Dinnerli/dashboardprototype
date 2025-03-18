
import { useState } from 'react';
import OverviewContent from './OverviewContent';

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState('weekly');

  return (
    <div className="flex flex-col gap-6 px-5 py-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Overview administrative dashboard
          </p>
        </div>
        
        <div className="flex items-center p-1 rounded-lg border border-gray-200 bg-gray-50">
          <button 
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              activePeriod === 'daily' 
                ? 'bg-white text-blue shadow-sm' 
                : 'text-gray-600 hover:text-blue hover:bg-gray-100'
            }`}
            onClick={() => setActivePeriod('daily')}
          >
            Daily
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              activePeriod === 'weekly' 
                ? 'bg-white text-blue shadow-sm' 
                : 'text-gray-600 hover:text-blue hover:bg-gray-100'
            }`}
            onClick={() => setActivePeriod('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              activePeriod === 'monthly' 
                ? 'bg-white text-blue shadow-sm' 
                : 'text-gray-600 hover:text-blue hover:bg-gray-100'
            }`}
            onClick={() => setActivePeriod('monthly')}
          >
            Monthly
          </button>
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
