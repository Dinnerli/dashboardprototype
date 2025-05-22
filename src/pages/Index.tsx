import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import Header from '@/components/layout/Header';
import Navigation from '@/components/navigation/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import ActivitiesCard from '@/components/dashboard/StatButton';
import DevicesCard from '@/components/dashboard/DevicesCard';
import AdminActivityCard from '@/components/dashboard/AdminActivityCard';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import RewardsCard from '@/components/dashboard/RewardsCard';
import HighchartsCard from '@/components/dashboard/HighchartsCard';
import EngagementActivitiesCard from '@/components/dashboard/EngagementActivitiesCard';
import CoursePerformanceCard from '@/components/dashboard/CoursePerformanceCard';
import ActivityFilters from '@/components/dashboard/activities/ActivityFilters';
import CarouselCardRow from '@/components/dashboard/CarouselCardRow';
import CompetencyCard from '@/components/dashboard/CompetencyCard';
import DraggableCard from '@/components/dashboard/DraggableCard';
import { useDragDrop } from '@/hooks/useDragDrop';

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

  // Cards to be displayed in the horizontal carousel
  const dashboardCards = [
    <DevicesCard key="devices" />,
    <AdminActivityCard key="admin" />,
    <LeaderboardCard key="leaderboard" />,
    <RewardsCard key="rewards" />,
    <CompetencyCard key="competency" />
  ];

  // DND for first 4 cards in 2x2 grid
  const initialDndCards = [
    { id: 0, component: <ActivitiesCard /> },
    { id: 1, component: <HighchartsCard /> },
    { id: 2, component: <CoursePerformanceCard /> },
    { id: 3, component: <EngagementActivitiesCard /> },
  ];
  const { items: dndCards, handleDragStart, handleDragOver, handleDrop } = useDragDrop(initialDndCards);

  return (
    <div className="min-h-screen max-w-full bg-white font-poppins flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Navigation />
         
        <div className="px-3 sm:px-4 md:px-5 bg-slate-200">
          <div className="flex flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
            <div className="border-b flex-1"></div>
            <div className="w-auto">
              <ActivityFilters />
            </div>
          </div>
          
          <Dashboard />
          {/* DND Cards row - 2x2 grid, draggable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-5 sm:pb-6">
            {dndCards.map((item, idx) => (
              <DraggableCard
                key={item.id}
                index={idx}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                
              >
                {item.component}
              </DraggableCard>
            ))}
          </div>
          
          {/* Horizontal scrollable card row - replacing the previous draggable grid */}
          <CarouselCardRow items={dashboardCards} />
        </div>
      </main>
    </div>
  );
};

export default Index;
