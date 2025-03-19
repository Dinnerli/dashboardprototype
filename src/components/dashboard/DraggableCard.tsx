
import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
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
        "relative w-full transition-opacity duration-200", 
        isDragging ? "opacity-50" : "opacity-100",
        className
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute top-2 right-2 cursor-grab z-10 p-1 rounded-md hover:bg-gray-100 transition-colors">
        <GripVertical size={16} className="text-gray-400" />
      </div>
      {children}
    </div>
  );
};

export default DraggableCard;
