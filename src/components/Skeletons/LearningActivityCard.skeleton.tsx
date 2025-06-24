import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const LearningActivityCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full h-full flex flex-col justify-between animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
      {/* Card Header Skeleton */}
      <div className="flex flex-row justify-between pb-4 sm:pb-6 items-start sm:items-center w-full border-b border-[#B3B3B3]">
        <div className="flex items-start sm:items-center gap-2.5 px-4 flex-1">
          <Skeleton className="h-6 w-40 bg-gray-200" />
        </div>
        {!isMobile && (
          <div className="flex items-center">
            <Skeleton className="h-8 w-24 bg-gray-200" />
          </div>
        )}
      </div>

      <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 h-full'}>
        <div className="flex flex-col gap-4 w-full h-full md:flex-row items-center justify-center">
          {/* Interactive Chart Skeleton */}
          <div className={isMobile ? 'w-full mb-2 flex items-center justify-center' : 'flex-1 h-full max-w-sm flex items-center justify-center'}>
            {/* Donut Chart Skeleton */}
            <div className="w-full max-w-80 h-80 flex items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Multiple concentric circles to represent the donut chart */}
                <div className="absolute inset-0">
                  <Skeleton className="w-full h-full rounded-full bg-gray-200" />
                </div>
                <div className="absolute inset-4">
                  <Skeleton className="w-full h-full rounded-full bg-gray-100" />
                </div>
                <div className="absolute inset-8">
                  <Skeleton className="w-full h-full rounded-full bg-gray-200" />
                </div>
                <div className="absolute inset-12">
                  <Skeleton className="w-full h-full rounded-full bg-gray-100" />
                </div>
                
             
              </div>
            </div>
          </div>

          {/* Stats Section Skeleton */}
          <div className={`flex-1 flex flex-col ${isMobile ? 'gap-2.5 pb-4 justify-between w-full' : 'justify-between p-2.5'}`}>
            {/* Activity Title Skeleton */}
            <div className={isMobile ? 'mb-3' : 'm-3'}>
              <Skeleton className={`h-6 w-32 bg-gray-200 ${isMobile ? '' : ''}`} />
            </div>

            {/* First row: stats[] Skeleton */}
            <div className={`flex flex-wrap gap-1 pb-6 ${isMobile ? 'justify-between' : 'justify-center p-2.5'}`}>
              <div className="flex items-center justify-between w-full">
                {Array.from({ length: 2 }, (_, idx) => (
                  <div key={idx} className="flex items-center gap-1 me-2">
                    {/* Icon skeleton */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12">
                      <Skeleton className="w-full h-full rounded-lg bg-gray-200" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Skeleton className={`bg-gray-200 ${isMobile ? 'h-3 w-16' : 'h-4 w-20'}`} />
                      </div>
                      <div className="flex items-center gap-3">
                        <Skeleton className={`bg-gray-200 ${isMobile ? 'h-4 w-8' : 'h-5 w-12'}`} />
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-3 w-8 bg-gray-200" />
                          <Skeleton className="h-3 w-3 bg-gray-200" />
                        </div>
                      </div>
                    </div>
                    {idx < 2 && (
                      <div className="flex items-center justify-center">
                        <div className="h-[32px] w-px bg-[#F2F3F5]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key metrics skeleton: Assigned, Completed, Enrolled/Viewed */}
            <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-6'}`}>
              {Array.from({ length: 3 }, (_, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[18px_1fr_auto_auto] items-center gap-x-2 p-2.5 rounded-lg"
                >
                  {/* Vertical colored line */}
                  <div className="flex items-center justify-center">
                    <Skeleton 
                      className={`w-0.5 h-6 ${
                        idx === 0 ? "bg-[#CDE4FF]" : 
                        idx === 1 ? "bg-[#338FFF]" : "bg-[#003072]"
                      }`} 
                    />
                  </div>
                  {/* Status label skeleton */}
                  <div className="flex items-center gap-1">
                    <Skeleton className={`bg-gray-200 ${isMobile ? 'h-3 w-16' : 'h-4 w-20'}`} />
                  </div>
                  {/* Value skeleton */}
                  <Skeleton className={`bg-gray-200 text-right min-w-[32px] ${isMobile ? 'h-4 w-8' : 'h-5 w-12'}`} />
                  {/* Trend skeleton */}
                  <div className="flex items-center justify-end min-w-[48px] gap-1">
                    <Skeleton className="h-3 w-8 bg-gray-200" />
                    <Skeleton className="h-3 w-3 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningActivityCardSkeleton;
