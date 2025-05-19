
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import Header from '@/components/layout/Header';
import Navigation from '@/components/navigation/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import ActivitiesCard from '@/components/dashboard/ActivitiesCard';
import DevicesCard from '@/components/dashboard/DevicesCard';
import AdminActivityCard from '@/components/dashboard/AdminActivityCard';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import RewardsCard from '@/components/dashboard/RewardsCard';
import DashboardCardGrid from '@/components/dashboard/DashboardCardGrid';
import HighchartsCard from '@/components/dashboard/HighchartsCard';
import EngagementActivitiesCard from '@/components/dashboard/EngagementActivitiesCard';
import CoursePerformanceCard from '@/components/dashboard/CoursePerformanceCard';
import ActivityFilters from '@/components/dashboard/activities/ActivityFilters';

const Index = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  
  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Updated cards configuration with fixed height
  const dashboardCards = [
    { id: 1, component: <DevicesCard /> },
    { id: 2, component: <AdminActivityCard /> },
    { id: 3, component: <LeaderboardCard /> },
    { id: 4, component: <RewardsCard /> },
  ];

  return (
    <div className="min-h-screen bg-white font-poppins flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Navigation />
         
        <div className="px-3 sm:px-4 md:px-6 bg-slate-200">
          <div className='flex flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6'>
          <div className='border-b w-[80%]'></div>
          <div className='justify-end'> <ActivityFilters /></div>
         
          </div>
          
          <Dashboard />
          {/* Cards row - stack on mobile, side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-4 sm:pb-6">
            <ActivitiesCard />
            <HighchartsCard />
          </div>
          
          {/* Course Performance and Engagement Activities - stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-4 sm:pb-6">
            <CoursePerformanceCard />
            <EngagementActivitiesCard />
          </div>
          
          {/* Draggable cards grid - using fixed height cards with responsive columns */}
          <DashboardCardGrid initialCards={dashboardCards} />
        </div>
      </main>
    </div>
  );
};

export default Index;
