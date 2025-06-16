import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminActivityCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <Card 
      className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 bg-white animate-slide-in-up overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between w-full border-b border-[#DADADA] pb-4">
        <Skeleton className="h-6 w-28 bg-gray-200" />
        <Skeleton className="h-4 w-20 bg-gray-200" />
      </div>

      {/* Info Alert */}
      <div className="flex justify-center mt-6 mb-6">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
          <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-[230px] bg-gray-200" />
        </div>
      </div>

      {/* Half Gauge */}
      <div className="flex justify-center items-center relative">
        <div className="relative w-[320px] h-[160px]">
          {/* Semi-circle */}
          <div className="absolute w-full h-full">
            <Skeleton
              className="w-[320px] h-[160px] rounded-t-full bg-gray-200"
              style={{
                clipPath: "ellipse(100% 100% at 50% 100%)",
              }}
            />
          </div>

          {/* Center Data */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Skeleton className="h-4 w-12 bg-gray-200 mx-auto mb-2" />
            <Skeleton className="h-10 w-12 bg-gray-200 mx-auto mb-1" />
            <div className="flex justify-center gap-2 mt-1">
              <Skeleton className="h-4 w-10 bg-gray-200" />
              <Skeleton className="h-4 w-14 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Legends */}
      <div className="flex justify-center gap-10 mt-6">
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-10 bg-gray-200" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-12 bg-gray-200" />
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCardSkeleton;
