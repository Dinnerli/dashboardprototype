
import React, { useRef, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface CarouselCardRowProps {
  items: React.ReactNode[];
}

const CarouselCardRow: React.FC<CarouselCardRowProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    // Change cursor to grabbing
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
      scrollRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset cursor
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Reset cursor
      if (scrollRef.current) {
        scrollRef.current.style.cursor = 'grab';
        scrollRef.current.style.userSelect = 'auto';
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (!scrollRef.current) return;
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    // Calculate how far the mouse has moved
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    // Scroll the container
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="relative group w-full pb-4 sm:pb-6"
    >
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F6F8] to-transparent z-10 pointer-events-none opacity-0 sm:opacity-100" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F5F6F8] to-transparent z-10 pointer-events-none opacity-0 sm:opacity-100" />
      
      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 pb-4 pt-1 hide-scrollbar cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0"
            style={{ minWidth: '280px', maxWidth: '320px' }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselCardRow;
