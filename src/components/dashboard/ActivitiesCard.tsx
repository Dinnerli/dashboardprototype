import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import ActivityTabs, { TabType } from "./activities/ActivityTabs";
import ActivityStat from "./activities/ActivityStat";
import ActivityChart from "./activities/ActivityChart";
import ActivityFilters from "./activities/ActivityFilters";
import ViewReportButton from "./ViewReportButton";

// Different data for each tab
const tabData = {
  user: {
    stats: [
      { title: "Active Users", value: "237", percentage: "40%", isPositive: true },
      { title: "New Users", value: "8", percentage: "40%", isPositive: false }
    ],
    chartType: 'user' as TabType
  },
  usage: {
    stats: [
      { title: "Total Usage", value: "1,243", percentage: "15%", isPositive: true },
      { title: "Avg. Time", value: "45m", percentage: "5%", isPositive: true }
    ],
    chartType: 'usage' as TabType
  },
  course: {
    stats: [
      { title: "Completed", value: "89", percentage: "12%", isPositive: false },
      { title: "In Progress", value: "156", percentage: "32%", isPositive: true }
    ],
    chartType: 'course' as TabType
  }
};

const ActivitiesCard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('user');
  // Select the first stat by default for the current tab
  const [selectedStat, setSelectedStat] = useState<string>(tabData['user'].stats[0].title);
  const currentData = tabData[activeTab];

  // Update selectedStat when tab changes
  useEffect(() => {
    setSelectedStat(tabData[activeTab].stats[0].title);
  }, [activeTab]);

  const handleStatClick = (title: string) => {
    setSelectedStat(selectedStat === title ? null : title);
  };

  return (
    <Card className="w-full animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6  border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <CardTitle>Activity Overview </CardTitle>
          </div>
          <div className="flex items-center">
        <ViewReportButton/>
      </div>
        </div>

        {/* Tabs */}
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col gap-2.5 w-full">
          {/* Stats Row */}
          <div className="flex items-center gap-5 p-2.5 h-20 w-full flex-wrap">
            {currentData.stats.map((stat, index) => (
              <ActivityStat 
                key={index}
                title={stat.title} 
                value={stat.value} 
                percentage={stat.percentage} 
                isActive={selectedStat === stat.title}
                isPositive={stat.isPositive}
                onClick={() => handleStatClick(stat.title)}
              />
            ))}
          </div>

          {/* Chart */}
          <ActivityChart chartType={currentData.chartType} selectedStat={selectedStat} />
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCard;
