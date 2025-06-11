import ActivityFilters from '@/components/dashboard/activities/ActivityFilters';
import ActivitiesCard from '@/components/dashboard/ActivitiesCard';
import AdminActivityCard from '@/components/dashboard/AdminActivityCard';
import CarouselCardRow from '@/components/dashboard/CarouselCardRow';
import CompetencyCard from '@/components/dashboard/CompetencyCard';
import CoursePerformanceCard from '@/components/dashboard/CoursePerformanceCard';
import { DeviceCard } from '@/components/dashboard/DeviceCard';
import EngagementActivitiesCard from '@/components/dashboard/EngagementActivitiesCard';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import LearningActivityCard from '@/components/dashboard/LearningActivityCard';
import OverviewContent from '@/components/dashboard/OverviewContent';
import RewardsCard from '@/components/dashboard/RewardsCard';
import SortableCard from '@/components/dashboard/SortableCard';
import Header from '@/components/layout/Header';
import Navigation from '@/components/navigation/Navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

const Index = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  // Enhanced sensors for better touch and mouse support - disabled on mobile
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Minimum distance before drag starts
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // Delay before drag starts on touch
      tolerance: 5, // Touch movement tolerance
    },
  });

  // Disable sensors on mobile to prevent drag and drop
  const sensors = useSensors(
    ...(isMobile ? [] : [mouseSensor, touchSensor])
  );

  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Cards to be displayed in the horizontal carousel
  const dashboardCards = [
    <DeviceCard key="devices" />,
        <RewardsCard key="rewards" />,
    <AdminActivityCard key="admin" />,
  
    <LeaderboardCard key="leaderboard" />,
  
    <CompetencyCard key="competency" />
  ];
  // DND for first 4 cards in 2x2 grid using @dnd-kit
  const initialDndCards = [
    { id: '0', component: <ActivitiesCard /> },
    { id: '1', component: <LearningActivityCard /> },
    { id: '2', component: <CoursePerformanceCard /> },
    { id: '3', component: <EngagementActivitiesCard /> },
  ];
  const [cards, setCards] = useState(initialDndCards);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex(item => item.id === active.id);
      const newIndex = cards.findIndex(item => item.id === over?.id);
      setCards(arrayMove(cards, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  return (
    <div className="min-h-screen max-w-full bg-white font-poppins flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Navigation />

        <div className="px-3 sm:px-4 md:px-5 bg-slate-200">
                    
          <OverviewContent/>
          {/* DND Cards row - disabled on mobile */}
          {isMobile ? (
            // Static grid on mobile without drag and drop
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cards.map((item) => (
                <div key={item.id}>
                  {item.component}
                </div>
              ))}
            </div>
          ) : (
            // DND enabled on desktop/tablet
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={cards.map(item => item.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                  {cards.map((item) => (
                    <SortableCard key={item.id} id={item.id.toString()}>
                      {item.component}
                    </SortableCard>
                  ))}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <div className="bg-white rounded-lg shadow-2xl rotate-1 scale-105 border ">
                    {cards.find(item => item.id === activeId)?.component}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          )}

          {/* Horizontal scrollable card row - replacing the previous draggable grid */}
          <div className="mt-6 ">
          <CarouselCardRow items={dashboardCards} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
