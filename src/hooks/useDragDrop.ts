
import { useState } from 'react';

interface DraggableItem {
  id: number;
  component: React.ReactNode;
}

export function useDragDrop<T extends DraggableItem>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);

  const handleDragStart = (e: React.DragEvent, index: number) => {
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
    
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    
    // Remove the dragged item
    newItems.splice(draggedIndex, 1);
    
    // Insert at the new position
    newItems.splice(targetIndex, 0, draggedItem);
    
    // Update state
    setItems(newItems);
  };

  return {
    items,
    setItems,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
}
