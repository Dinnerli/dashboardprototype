import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ActivityTabs, { TabType } from "./activities/ActivityTabs";
import ActivityChart from "./activities/ActivityChart";
import ViewReportButton from "./ViewReportButton";
import CardHeader from "./CardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import StatButton from "./activities/StatButton";
import styles from './StatButton.module.css';
import activityOverview from '@/Data/ActivityOverview.json';

// Map JSON tab names to TabType keys
const tabKeyMap: Record<string, TabType> = {
  "User": "user",
  "Usage": "usage",
  "Course": "course"
};

// Prepare tab data from JSON
const tabsFromJson = activityOverview.ActivityOverview.map((tab) => {
  const key = tabKeyMap[tab.name];
  return {
    key,
    label: tab.name,
    stats: tab.stats.map((stat) => ({
      title: stat.name,
      value: stat.value,
      percentage: stat.trend,
      isPositive: stat.isPositive,
      tooltip: stat.tooltip,
      data: stat.data // <-- include chart data for each stat
    })),
    chartType: key
  };
});

const tabKeyList: TabType[] = tabsFromJson.map(tab => tab.key);

const ActivitiesCard = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<TabType>(tabKeyList[0]);
  // Select the first stat by default for the current tab
  const [selectedStat, setSelectedStat] = useState<string>(tabsFromJson[0].stats[0].title);
  const currentTabData = tabsFromJson.find(tab => tab.key === activeTab)!;

  // Find the stat object for the selected stat
  const selectedStatObj = currentTabData.stats.find(stat => stat.title === selectedStat) || currentTabData.stats[0];

  // Update selectedStat when tab changes
  useEffect(() => {
    setSelectedStat(currentTabData.stats[0].title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleStatClick = (title: string) => {
    if (selectedStat !== title) {
      setSelectedStat(title);
    }
  };

  // Prepare chart data for the current tab and selected stat
  const chartSeries = [
    {
      name: selectedStatObj.title,
      data: selectedStatObj.data.map((point: { month: string; value: number }) => point.value),
      color: '#338FFF',
      type: 'areaspline',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(51, 143, 255, 0.8)'],
          [1, 'rgba(205, 228, 255, 0)']
        ]
      },
      marker: { enabled: false },
      zIndex: 2,
      opacity: 1,
      className: 'active-path',
      showInLegend: false
    }
  ];

  // Pass chartSeries as prop to ActivityChart
  return (
    <Card className="w-full h-full animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
      <div className="w-full">
        <CardHeader title="Activity Overview" rightContent={isMobile ? null : <ViewReportButton />} />

        {/* Tabs */}
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col gap-2.5 w-full">
          {/* Stats Row */}
          <div
            className={`stat-row flex items-center gap-3 sm:gap-5 p-2.5 h-20 w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap md:overflow-visible md:flex-wrap md:snap-none md:scroll-auto ${styles['stat-row']}`}
          >
            {currentTabData.stats.map((stat, index) => (
              <div key={index} className="snap-start w-[70vw] min-w-[70vw] sm:w-auto sm:min-w-0">
                <StatButton
                  title={stat.title}
                  value={stat.value}
                  percentage={stat.percentage}
                  isActive={selectedStat === stat.title}
                  isPositive={stat.isPositive}
                  onClick={() => handleStatClick(stat.title)}
                  tooltip={stat.tooltip}
                />
              </div>
            ))}
          </div>

          {/* Chart */}
          <ActivityChart chartType={currentTabData.chartType} selectedStat={selectedStat} chartSeries={chartSeries} />
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCard;
