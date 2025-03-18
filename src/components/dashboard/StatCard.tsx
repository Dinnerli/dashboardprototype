
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    positive: boolean;
  };
  icon: ReactNode;
  iconBgColor?: string;
}

const StatCard = ({ title, value, change, icon, iconBgColor = 'bg-blue-light' }: StatCardProps) => {
  return (
    <div className="dashboard-card border border-gray-100 hover:border-blue-100 overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-dark text-2xl font-bold">{value}</p>
          
          {change && (
            <div className="flex items-center mt-1">
              <div 
                className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  change.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}
              >
                <span>{change.positive ? '↑' : '↓'}</span>
                <span>{Math.abs(change.value)}%</span>
              </div>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
