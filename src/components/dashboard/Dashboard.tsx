
import { useState } from 'react';
import OverviewContent from './OverviewContent';
import { CalendarDays, ChevronDown, ClipboardList, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('period');
  const [periodFilter, setPeriodFilter] = useState('Last 60 Days');
  const [typeFilter, setTypeFilter] = useState('Marketing');
  const [statusFilter, setStatusFilter] = useState('Published');

  return (
    <div className="flex flex-col gap-6 px-5 py-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Overview administrative dashboard
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Period Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'period' ? 'bg-blue-light text-blue' : 'bg-white text-dark hover:bg-gray-100'
            }`} onClick={() => setActiveFilter('period')}>
              <CalendarDays size={16} />
              <span className="font-poppins font-medium text-sm">{periodFilter}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] relative">
                <path d="M8.46997 10.74L12 14.26L15.53 10.74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => setPeriodFilter('Last 30 Days')}>
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriodFilter('Last 60 Days')}>
                Last 60 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriodFilter('Last 90 Days')}>
                Last 90 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriodFilter('Last 12 Months')}>
                Last 12 Months
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Type Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'type' ? 'bg-blue-light text-blue' : 'bg-white text-dark hover:bg-gray-100'
            }`} onClick={() => setActiveFilter('type')}>
              <ClipboardList size={16} />
              <span className="font-poppins font-medium text-sm">{typeFilter}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] relative">
                <path d="M8.46997 10.74L12 14.26L15.53 10.74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => setTypeFilter('All')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('Marketing')}>
                Marketing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('Sales')}>
                Sales
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('Product')}>
                Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'status' ? 'bg-blue-light text-blue' : 'bg-white text-dark hover:bg-gray-100'
            }`} onClick={() => setActiveFilter('status')}>
              <Globe size={16} />
              <span className="font-poppins font-medium text-sm">{statusFilter}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] relative">
                <path d="M8.46997 10.74L12 14.26L15.53 10.74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Published')}>
                Published
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Archived')}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <OverviewContent />
    </div>
  );
};

export default Dashboard;
