import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const CoursePerformanceCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6 [animation-delay:0.2s]`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          {!isMobile && <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>}
        </div>

        {/* Tabs */}
        <div className="flex h-auto justify-start w-full bg-white rounded-none p-0 mb-4">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse mr-2"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 py-2 mb-4">
          <div className="flex-1">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex-1">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex flex-col">
          {/* Course bars */}          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4 mb-4">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-3 bg-gray-100 rounded">
                <div className={`h-full bg-gray-200 rounded animate-pulse ${
                  item === 1 ? 'w-4/5' : 
                  item === 2 ? 'w-3/5' : 
                  item === 3 ? 'w-5/6' : 
                  item === 4 ? 'w-2/5' : 
                  'w-3/4'
                }`}></div>
              </div>
            </div>
          ))}
          
          {/* Scale line */}
          <div className="flex items-center w-full mt-4">
            <div className="hidden sm:block w-20"></div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          {/* Scale labels */}
          <div className="flex justify-between items-center pl-0 sm:pl-20 mt-2">
            {[0, 20, 40, 60, 80, 100].map((val) => (
              <div key={val} className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoursePerformanceCardSkeleton;