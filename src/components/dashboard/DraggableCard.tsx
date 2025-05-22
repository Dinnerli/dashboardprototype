import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface DraggableCardProps {
  children: React.ReactNode;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  index: number;
  className?: string;
}

const DraggableCard = ({ 
  children, 
  onDragStart, 
  onDragOver, 
  onDrop, 
  index,
  className
}: DraggableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('card-index', index.toString());
    setIsDragging(true);
    onDragStart(e, index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    onDrop(e, index);
  };

  return (
    <div 
      className={cn(
        "relative w-full transition-opacity duration-200 select-none",
        isDragging ? "opacity-50 scale-105 z-20 cursor-grabbing animate-dnd-zoom" : "opacity-100 cursor-grab",
        className
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
