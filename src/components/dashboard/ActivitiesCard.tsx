import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import ActivityTabs, { TabType } from "./activities/ActivityTabs";
import ActivityStat from "./activities/ActivityStat";
import ActivityChart from "./activities/ActivityChart";
import ActivityFilters from "./activities/ActivityFilters";
import ViewReportButton from "./ViewReportButton";
import CardHeader from "./CardHeader";
import { useIsMobile } from "@/hooks/use-mobile";

// Different data for each tab
const tabData = {
  user: {
    stats: [
       { title: "Active Users", value: "237", percentage: "40%", isPositive: true, tooltip: "The number of users who have logged into the platform within the selected timeframe." },
       { title: "Signups", value: "8", percentage: "40%",  isPositive: true, tooltip: "The number of new users who have registered to the platform within that time range" }
      ],
    chartType: 'user' as TabType
  },
  usage: {
    stats: [
      { title: "Platform", value: "1,243h", percentage: "15%", isPositive: true, tooltip: "Total Number of Hours spent on the platform by users" },
      { title: "Course", value: "789h", percentage: "8%", isPositive: true, tooltip: "Total Number of Hours spent on Courses by users" },
      { title: "Library", value: "412h", percentage: "5%", isPositive: false, tooltip: "Total Number of Hours spent on Courses by users" }
    ],
    chartType: 'usage' as TabType
  },
  course: {
    stats: [
      { title: "Assigned", value: "200", percentage: "18%", isPositive: true, tooltip: "Number of learners assigned for Courses" },
      { title: "Passed", value: "134", percentage: "9%", isPositive: true, tooltip: "Number of learners who achieved a passing score" },
      { title: "Completed", value: "89", percentage: "12%", isPositive: false, tooltip: "Number of learners who completed Courses" }
    ],
    chartType: 'course' as TabType
  }
};

const ActivitiesCard = () => {
  const isMobile = useIsMobile();
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
    <Card className="w-full h-full animate-slide-in-up px-6" style={{ animationDelay: '0.2s' }}>
      <div className="w-full">
        <CardHeader title="Activity Overview" rightContent={isMobile ? null : <ViewReportButton />} />

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
                tooltip={stat.tooltip}
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
