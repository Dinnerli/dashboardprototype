import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface SortableCardProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SortableCard = ({ id, children, className }: SortableCardProps) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className={cn(
        "relative w-full transition-all duration-300 ease-in-out select-none touch-action-none",
        "cursor-grab active:cursor-grabbing",
        "hover:shadow-lg rounded-lg",
        isDragging 
          ? "opacity-60 scale-105 z-50 rotate-2 shadow-xl" 
          : "opacity-100 hover:scale-[1.02] shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SortableCard;
