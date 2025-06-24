import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

const EngagementActivitiesCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full h-full animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-40 bg-gray-200" />
        {!isMobile && <Skeleton className="h-8 w-24 bg-gray-200" />}
      </div>

      <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0'}>
        <div className="flex flex-col justify-between h-full gap-6">
          {/* Stats Section Skeleton */}
          <div className="stat-row flex items-center gap-2.5 p-5 h-auto w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap md:overflow-visible md:flex-wrap md:snap-none md:scroll-auto">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="snap-start w-[70vw] min-w-[70vw] sm:w-auto sm:min-w-0">
                <div className="flex items-center gap-2.5 py-2 px-3 sm:py-1 sm:px-2 rounded-lg border border-[#F5F6F8]">
                  <div className="flex flex-col items-center justify-center p-2">
                    <Skeleton className="h-8 w-0.5 bg-gray-200" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-12 bg-gray-200" />
                      <Skeleton className="h-3 w-8 bg-gray-200" />
                      <Skeleton className="h-3 w-3 bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section Skeleton */}
          <div className="w-full h-[250px] sm:h-[250px] flex items-end justify-center">
            <Skeleton className="w-full h-full bg-gray-200 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementActivitiesCardSkeleton;
