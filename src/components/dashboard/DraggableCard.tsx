
import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableCardProps {
  children: React.ReactNode;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  index: number;
}

const DraggableCard = ({ 
  children, 
  onDragStart, 
  onDragOver, 
  onDrop, 
  index 
}: DraggableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('card-index', index.toString());
    setIsDragging(true);
    onDragStart(e);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={cn(
        "relative w-full", 
        isDragging ? "opacity-50" : "opacity-100"
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="absolute top-2 right-2 cursor-grab z-10 p-1 rounded-md hover:bg-gray-100">
        <GripVertical size={16} className="text-gray-400" />
      </div>
      {children}
    </div>
  );
};

export default DraggableCard;
