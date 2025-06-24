import React, { useRef, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import StatCard from "./common/StatCard";

interface CarouselCardRowProps {
  items: React.ReactNode[];
}

const CarouselCardRow: React.FC<CarouselCardRowProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const updateFadeVisibility = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Show left fade if scrolled right from the beginning
    setShowLeftFade(scrollLeft > 0);
    
    // Show right fade if not scrolled to the end
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
  };

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
    // Update fade visibility during drag
    updateFadeVisibility();
  };

  const handleScroll = () => {
    updateFadeVisibility();
  };

  return (
    <div 
      className="relative group w-full h-full pb-4 sm:pb-6 "
    >      {/* Left fade overlay */}
      <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F6F8] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} sm:block hidden`} />
        {/* Right fade overlay */}
      <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F5F6F8] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} sm:block hidden`} />{/* Scrollable container */}      <div 
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-auto gap-3 sm:gap-5 pb-4 pt-1 hide-scrollbar cursor-grab h-full px-4 sm:px-0 snap-x snap-mandatory sm:snap-none carousel-scroll touch-pan-x"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
      >{items.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 md:h-[555px] sm:h-[80px] sm:min-h-[80px] w-[calc(100vw-5rem)] sm:w-[400px] min-h-[85px] max-w-full snap-start sm:snap-align-none max-h-[550px]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselCardRow;
