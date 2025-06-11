import { Card } from "../ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const DeviceCardSkeleton = () => {
  const isMobile = useIsMobile();
  return (
    <Card
      className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden relative`}
      style={{ animationDelay: '0.4s' }}
    >
      {/* Header skeleton */}
      <div className="flex flex-row justify-between pb-4 items-start sm:items-center w-full border-b border-[#B3B3B3]">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        {!isMobile && <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />}
      </div>
      {/* Tabs skeleton */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <div className="flex gap-4 mb-10">
          <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
        {/* Gauge skeleton */}
        <div className="flex justify-center items-center flex-1 min-h-[220px]">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-gray-100 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-5 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceCardSkeleton;
