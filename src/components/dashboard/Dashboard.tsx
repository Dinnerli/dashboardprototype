
import { useState } from 'react';
import OverviewContent from './OverviewContent';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 px-5 py-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Overview administrative dashboard
          </p>
        </div>
      </div>
      
      <OverviewContent />
    </div>
  );
};

export default Dashboard;
