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
import { useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';

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

  // --- Date Range State (LIFTED UP) ---
  const today = new Date();
  const defaultFrom = new Date(today);
  defaultFrom.setDate(today.getDate() - 29); // last 30 days (inclusive)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: defaultFrom,
    to: today
  });

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  // Handler to pass to ActivityFilters
  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to });
  };

  // --- Department State (LIFTED UP) ---
  const [department, setDepartment] = useState<string>("All");
  const handleDepartmentChange = (dep: string) => setDepartment(dep);
  // Cards to be displayed in the horizontal carousel
  const dashboardCards = [
    <DeviceCard
      key="devices"
      startDate={formatDate(dateRange.from)}
      endDate={formatDate(dateRange.to || dateRange.from)}
      department={department}
    />,
    <RewardsCard
      key="rewards"
      startDate={formatDate(dateRange.from)}
      endDate={formatDate(dateRange.to || dateRange.from)}
      department={department}
    />,
    <AdminActivityCard 
      key="admin"
      startDate={formatDate(dateRange.from)}
      endDate={formatDate(dateRange.to || dateRange.from)}
    />,
    <LeaderboardCard 
      key="leaderboard"
      startDate={formatDate(dateRange.from)}
      endDate={formatDate(dateRange.to || dateRange.from)}
      department={department}
    />,
    <CompetencyCard key="competency" />  ];  // DND for first 4 cards in 2x2 grid using @dnd-kit - make reactive to date changes
  const initialDndCards = useMemo(() => [
    { id: '0', component: <ActivitiesCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} department={department} /> },
    { id: '1', component: <LearningActivityCard /> },
    { id: '2', component: <CoursePerformanceCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} /> },
    { id: '3', component: <EngagementActivitiesCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} /> },
  ], [dateRange.from, dateRange.to, department]);
  
  const [cards, setCards] = useState(initialDndCards);

  // Update cards when dates change
  useEffect(() => {
    setCards(initialDndCards);
  }, [initialDndCards]);
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
        {/* Pass dateRange, department, and handlers to ActivityFilters */}
          <nav className="flex items-center justify-between w-full px-5 py-3 bg-white border-b animate-slide-in-up relative">
      <div className="flex flex-col">
        <h1 className="text-h4 font-semibold text-dark mb-1">Analytical Dashboard</h1>
      </div>
        <ActivityFilters
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          department={department}
          onDepartmentChange={handleDepartmentChange}
        />  </nav>
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
