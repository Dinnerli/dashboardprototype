import { Skeleton } from '../ui/skeleton';

const OverviewCardSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div 
      className={`flex flex-col gap-6 px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6`}
    >
      <div className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar bg-[#F5F6F8] scroll-smooth snap-x snap-mandatory">
        {skeletonCards.map((index) => (
          <div
            key={index}
            className="snap-start w-[75vw] min-w-[75vw] sm:w-64 sm:min-w-[16rem] flex h-auto px-5 py-2.5 flex-col justify-center items-start flex-[1_0_0] rounded-[10px] bg-white"
          >
            <div className="flex flex-col justify-center items-start gap-2.5 w-full max-w-full">
              {/* Title row skeleton */}
              <div className="flex items-center gap-2.5 w-full min-w-0">
                <Skeleton className="h-4 w-28 bg-gray-200" />
              </div>

              {/* Value and trend row skeleton */}
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col justify-center items-start">
                  <Skeleton className="h-7 w-16 bg-gray-200" />
                </div>
                
                <div className="flex justify-end items-center gap-1">
                  <Skeleton className="h-4 w-9 bg-gray-200" />
            
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCardSkeleton;
