
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/navigation/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import ActivitiesCard from '@/components/dashboard/ActivitiesCard';
import LearningActivitiesCard from '@/components/dashboard/LearningActivitiesCard';
import CoursePerformanceCard from '@/components/dashboard/CoursePerformanceCard';
import DevicesCard from '@/components/dashboard/DevicesCard';
import AdminActivityCard from '@/components/dashboard/AdminActivityCard';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import RewardsCard from '@/components/dashboard/RewardsCard';
import DashboardCardGrid from '@/components/dashboard/DashboardCardGrid';

const Index = () => {
  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Updated cards configuration - with HighchartsCard removed
  const dashboardCards = [
    { id: 1, component: <DevicesCard /> },
    { id: 2, component: <AdminActivityCard /> },
    { id: 3, component: <RewardsCard /> },
    { id: 4, component: <LeaderboardCard /> }
  ];

  return (
    <div className="min-h-screen bg-white font-poppins flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Navigation />
        <div className="px-6 bg-slate-200">
          <Dashboard />
          {/* Cards row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <ActivitiesCard />
            <LearningActivitiesCard />
          </div>
          
          {/* Course Performance Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <CoursePerformanceCard />
            {/* Placeholder for future card */}
            <div className="hidden md:block"></div>
          </div>
          
          {/* Draggable cards grid */}
          <DashboardCardGrid initialCards={dashboardCards} />
        </div>
      </main>
    </div>
  );
};

export default Index;
