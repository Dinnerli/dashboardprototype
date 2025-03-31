
import React from 'react';
import { useMediaQuery } from '@mui/material';
import DraggableCard from './DraggableCard';
import { useDragDrop } from '@/hooks/useDragDrop';

interface DashboardCardGridProps {
  initialCards: {
    id: number;
    component: React.ReactNode;
  }[];
}

const DashboardCardGrid: React.FC<DashboardCardGridProps> = ({ initialCards }) => {
  const { items: cards, handleDragStart, handleDragOver, handleDrop } = useDragDrop(initialCards);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:1280px)');

  // Determine number of columns based on screen size
  const getGridClass = () => {
    if (isMobile) return "grid-cols-1";
    if (isTablet) return "grid-cols-2";
    if (isLargeScreen) return "grid-cols-4";
    return "grid-cols-3";
  };

  return (
    <div className={`grid ${getGridClass()} gap-3 sm:gap-4 md:gap-5 pb-4 sm:pb-6`}>
      {cards.map((card, index) => (
        <DraggableCard 
          key={card.id} 
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {card.component}
        </DraggableCard>
      ))}
    </div>
  );
};

export default DashboardCardGrid;
