import { Skeleton } from '../ui/skeleton';
import { useIsMobile } from "@/hooks/use-mobile";

interface LeaderboardSkeletonProps {
  count?: number;
}

const LeaderboardSkeleton = ({ count = 5 }: LeaderboardSkeletonProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="py-2.5 flex flex-col gap-2.5">
      {Array.from({ length: count }, (_, index) => (
        <div 
          key={index}
          className="flex py-2.5 sm:py-2.5 px-2 sm:px-3 md:px-4 items-center border-b border-[#F5F6F8]"
        >
          {/* Avatar Skeleton */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full mr-2 sm:mr-3 flex-shrink-0">
            <Skeleton className="w-full h-full rounded-full bg-gray-200" />
          </div>
          
          {/* User info Skeleton */}
          <div className="flex flex-col flex-1 min-w-0 px-2 sm:px-3 py-0.5 sm:py-1.5">
            {/* Name with varying widths to look more natural */}
            <Skeleton className={`h-4 bg-gray-200 mb-1 ${
              index % 3 === 0 ? 'w-28 sm:w-36' : 
              index % 3 === 1 ? 'w-32 sm:w-44' : 'w-24 sm:w-32'
            }`} />
            {/* Email with varying widths */}
            <Skeleton className={`h-3 bg-gray-200 ${
              index % 2 === 0 ? 'w-20 sm:w-28' : 'w-24 sm:w-32'
            }`} />
          </div>
          
          {/* Points Skeleton */}
          <div className="flex flex-col items-end ml-auto">
            <Skeleton className="h-4 w-16 bg-gray-200 mb-1" />
            <Skeleton className="h-3 w-12 bg-gray-200" />
          </div>
          
          {/* Position/Trophy Skeleton */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ml-2 relative">
            <Skeleton className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-gray-200`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardSkeleton;
