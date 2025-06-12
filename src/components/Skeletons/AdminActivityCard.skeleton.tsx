import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminActivityCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <Card 
      className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}
    >
      {/* Header Skeleton */}
      <div className="flex flex-row justify-between pb-4 items-start sm:items-center w-full border-b border-[#B3B3B3]">
        <Skeleton className="h-6 w-32 bg-gray-200" />
        {!isMobile && <Skeleton className="h-8 w-24 bg-gray-200" />}
      </div>
        <div className="flex flex-col items-center justify-center relative h-full">  
        {/* Info Note Skeleton */}
        <div className="flex items-center justify-center mb-10 px-4">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <Skeleton className="h-4 w-4 rounded bg-gray-200" />
            <Skeleton className="h-4 w-64 bg-gray-200" />
          </div>
        </div>
        
        <div className="relative">
          {/* Half Gauge Skeleton */}
          <div className="flex justify-center items-center">
            <div className={`relative ${isMobile ? 'w-[300px] h-[150px]' : 'w-[340px] h-[170px]'}`}>
              {/* Semi-circle gauge skeleton - dark blue arc */}
              <div className="absolute inset-0 flex justify-center">
                <div className={`${isMobile ? 'w-[300px] h-[150px]' : 'w-[340px] h-[170px]'} relative`}>
                  <Skeleton className={`${isMobile ? 'w-[300px] h-[300px]' : 'w-[340px] h-[340px]'} rounded-full bg-gray-200`} 
                    style={{ 
                      clipPath: 'polygon(0 50%, 85% 50%, 85% 100%, 0% 100%)',
                      transform: 'translateY(-50%)'
                    }} 
                  />
                </div>
              </div>
              
              {/* Center overlay content skeleton */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 flex flex-col items-center text-center">
                {/* Title */}
                <Skeleton className="h-4 w-12 bg-gray-200 mb-1" />
                
                {/* Large number */}
                <Skeleton className="h-12 w-16 bg-gray-200 mb-1" />
                
                {/* Percentage and trend */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-8 bg-gray-200" />
                  <Skeleton className="h-4 w-12 bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Legends Skeleton */}
          <div className="flex justify-center gap-8 mt-0 md:translate-x-[-50%] absolute bottom-4 left-1/2 transform -translate-x-1/2">
            {/* Added legend */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full bg-gray-200" />
              <Skeleton className="h-4 w-12 bg-gray-200" />
            </div>
            
            {/* Edited legend */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full bg-gray-200" />
              <Skeleton className="h-4 w-14 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCardSkeleton;
