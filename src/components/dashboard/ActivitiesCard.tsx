
import { Card } from "@/components/ui/card";
import ActivityTabs from "./activities/ActivityTabs";
import ActivityStat from "./activities/ActivityStat";
import ActivityChart from "./activities/ActivityChart";
import ActivityFilters from "./activities/ActivityFilters";

const ActivitiesCard = () => {
  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6 border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="h3 text-[#233143] font-poppins">Activity Overview</h3>
          </div>
          <ActivityFilters />
        </div>

        {/* Tabs */}
        <ActivityTabs />

        <div className="flex flex-col gap-2.5 w-full">
          {/* Stats Row */}
          <div className="flex items-center gap-5 p-2.5 h-20 w-full flex-wrap">
            <ActivityStat 
              title="Active Users" 
              value="237" 
              percentage="40%" 
              isActive={true}
              isPositive={true}
            />
            <ActivityStat 
              title="New Users" 
              value="8" 
              percentage="40%" 
              isActive={false}
              isPositive={false}
            />
          </div>

          {/* Chart */}
          <ActivityChart />
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCard;
