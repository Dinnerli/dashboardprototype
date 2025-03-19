import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/navigation/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import ActivitiesCard from '@/components/dashboard/ActivitiesCard';
import LearningActivitiesCard from '@/components/dashboard/LearningActivitiesCard';
import CoursePerformanceCard from '@/components/dashboard/CoursePerformanceCard';
import DevicesCard from '@/components/dashboard/DevicesCard';
import AdminActivityCard from '@/components/dashboard/AdminActivityCard';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import DraggableCard from '@/components/dashboard/DraggableCard';

const Index = () => {
  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // State to keep track of card order
  const [cards, setCards] = useState([
    { id: 1, component: <DevicesCard /> },
    { id: 2, component: <AdminActivityCard /> },
    { id: 3, component: <LeaderboardCard /> },
    { id: 4, component: <LeaderboardCard title="Leaderboard 2" /> }
  ]);

  // Handler for drag and drop functionality
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedIndex = parseInt(e.dataTransfer.getData('card-index'));
    
    if (draggedIndex === targetIndex) return;
    
    const newCards = [...cards];
    const draggedCard = newCards[draggedIndex];
    
    // Remove the dragged card
    newCards.splice(draggedIndex, 1);
    
    // Insert at the new position
    newCards.splice(targetIndex, 0, draggedCard);
    
    // Update state
    setCards(newCards);
  };

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
          
          {/* All four cards in a single row - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
            {cards.map((card, index) => (
              <DraggableCard 
                key={card.id} 
                index={index}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {card.component}
              </DraggableCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
