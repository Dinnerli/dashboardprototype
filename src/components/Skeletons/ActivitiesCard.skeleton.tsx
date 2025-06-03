import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const ActivitiesCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[555px]'} p-4 sm:p-5 md:p-6`}>
      <div className="h-full">
        {/* Card Header Skeleton */}
        <div className="flex flex-row justify-between pb-4 sm:pb-6 items-start sm:items-center w-full border-b border-[#B3B3B3]">
          <div className="flex items-start sm:items-center gap-2.5 px-4 flex-1">
            <Skeleton className="h-6 w-32 bg-gray-200" />
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <Skeleton className="h-8 w-24 bg-gray-200" />
            </div>
          )}
        </div>

        <div className="flex flex-col w-full justify-between mb-2">
          {/* Tabs Skeleton */}
          <div className="flex w-full">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-2.5 py-5 pt-0 w-full">
                <div className="border-b-2 w-full border-transparent"></div>
                <Skeleton className="h-4 w-16 bg-gray-200" />
              </div>
            ))}
          </div>

          <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>
            {/* Stats Row Skeleton */}
            <div className={`stat-row flex items-center gap-3 sm:gap-5 p-2.5 h-20 w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap md:overflow-visible md:flex-wrap md:snap-none md:scroll-auto`}>
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

            {/* Chart Skeleton */}
            <div className="w-full h-64 mt-4">
              <Skeleton className="w-full h-full bg-gray-200 rounded-lg" />
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCardSkeleton;
