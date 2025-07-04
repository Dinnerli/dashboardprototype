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
import { useCardOrderContext } from '@/hooks/CardOrderContext';
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
import { useEffect, useMemo, useState } from 'react';

const Index = () => {
  // Hooks at top
  const { cardOrder, setCardOrder } = useCardOrderContext();
  const { loading: cardOrderLoading, error: cardOrderError } = useCardOrderContext();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } });
  const sensors = useSensors(...(isMobile ? [] : [mouseSensor, touchSensor]));

  // Smooth scroll
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  // --- Date Range State (LIFTED UP) ---
  // Restore from localStorage if available
  function getInitialDateRange() {
    const storedFilters = localStorage.getItem('dashboard-filters');
    if (storedFilters) {
      try {
        const { startDate, endDate } = JSON.parse(storedFilters);
        if (startDate && endDate) {
          return { from: new Date(startDate), to: new Date(endDate) };
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    const today = new Date();
    const defaultFrom = new Date(today);
    defaultFrom.setDate(today.getDate() - 29);
    return { from: defaultFrom, to: today };
  }
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>(getInitialDateRange());

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  // Handler to pass to ActivityFilters
  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to });
    // Persist to localStorage
    const storedFilters = localStorage.getItem('dashboard-filters');
    let department = 'All';
    if (storedFilters) {
      try {
        const parsed = JSON.parse(storedFilters);
        if (parsed.department) department = parsed.department;
      } catch (e) {
        // Ignore parse errors
      }
    }
    localStorage.setItem('dashboard-filters', JSON.stringify({ startDate: from, endDate: to, department }));
  };

  // --- Department State (LIFTED UP) ---
  function getInitialDepartment() {
    const storedFilters = localStorage.getItem('dashboard-filters');
    if (storedFilters) {
      try {
        const { department } = JSON.parse(storedFilters);
        if (department) return department;
      } catch (e) {
        // Ignore parse errors
      }
    }
    return 'All';
  }
  const [department, setDepartment] = useState<string>(getInitialDepartment());
  const handleDepartmentChange = (dep: string) => {
    setDepartment(dep);
    // Persist to localStorage
    localStorage.setItem('dashboard-filters', JSON.stringify({ startDate: dateRange.from, endDate: dateRange.to || dateRange.from, department: dep }));
  };
  // Cards to be displayed in the horizontal carousel
  const dashboardCards = useMemo(() => [
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
      department={department}
    />,
    <LeaderboardCard 
      key="leaderboard"
      startDate={formatDate(dateRange.from)}
      endDate={formatDate(dateRange.to || dateRange.from)}
      department={department}
    />,
    // <CompetencyCard key="competency" /> 
   ], [dateRange, department]);  // DND for first 4 cards in 2x2 grid using @dnd-kit - make reactive to date changes
  // --- DND Card Order Persistence ---
  const initialCardIds = useMemo(() => ['0', '1', '2', '3'], []);
  const initialDndCards = useMemo(() => [
    { id: '0', component: <ActivitiesCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} department={department} /> },
    { id: '1', component: <LearningActivityCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} department={department} /> },
    { id: '2', component: <CoursePerformanceCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} department={department} /> },
    { id: '3', component: <EngagementActivitiesCard startDate={formatDate(dateRange.from)} endDate={formatDate(dateRange.to || dateRange.from)} department={department} /> },
  ], [dateRange.from, dateRange.to, department]);

  const [cards, setCards] = useState(() => {
    const cardMap = Object.fromEntries(initialDndCards.map(c => [c.id, c]));
    return cardOrder.map(id => cardMap[id]);
  });

  // Update cards when dates/department/cardOrder change, but keep order
  useEffect(() => {
    const cardMap = Object.fromEntries(initialDndCards.map(c => [c.id, c]));
    setCards(cardOrder.map(id => cardMap[id]));
  }, [initialDndCards, cardOrder, dateRange, department]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over?.id) {
      const oldIndex = cardOrder.indexOf(active.id.toString());
      const newIndex = cardOrder.indexOf(over.id.toString());
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(cardOrder, oldIndex, newIndex);
        setCardOrder(newOrder);
      }
    }
    setActiveId(null);
  };

  // Render
  return (
    cardOrderLoading ? (
      <div className="min-h-screen flex items-center justify-center">
         <img src="/status.gif" alt="Loading..." className="h-16 w-16 mx-auto mb-4" />
      </div>
    ) : cardOrderError ? (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error loading dashboard: {cardOrderError}</p>
      </div>
    ) : (
      <div className="min-h-screen max-w-full bg-white font-poppins flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          {/* Pass dateRange, department, and handlers to ActivityFilters */}
            <nav className="flex items-center justify-between w-full px-5 py-3 bg-white border-b animate-slide-in-up relative">
        <div className="flex flex-col">
          <h1 className="text-h4 font-semibold text-dark mb-1">Insight Desk</h1>
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
                  items={cardOrder}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    {cardOrder.map((id) => {
                      const item = cards.find(c => c.id === id);
                      return item ? (
                        <SortableCard key={item.id} id={item.id.toString()}>
                          {item.component}
                        </SortableCard>
                      ) : null;
                    })}
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
    )
  );
};

export default Index;
