import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ActivityTabs, { TabType } from "./activities/ActivityTabs";
import ActivityChart from "./activities/ActivityChart";
import ViewReportButton from "./ViewReportButton";
import CardHeader from "./CardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import StatButton from "./activities/StatButton";
import styles from './StatButton.module.css';
import ActivitiesCardSkeleton from '../Skeletons/ActivitiesCard.skeleton';
import { useGetActivitiesData } from '../../hooks/useGetActivitiesData';

const ActivitiesCard = () => {
  const isMobile = useIsMobile();
  const { data: activitiesData, loading, error } = useGetActivitiesData();
  
  const [activeTab, setActiveTab] = useState<TabType>('user');
  const [selectedStat, setSelectedStat] = useState<string>('');

  // Update state when data loads
  useEffect(() => {
    if (activitiesData && activitiesData.tabKeyList.length > 0) {
      const firstTab = activitiesData.tabKeyList[0];
      setActiveTab(firstTab);
      const firstTabData = activitiesData.tabs.find(tab => tab.key === firstTab);
      if (firstTabData && firstTabData.stats.length > 0) {
        setSelectedStat(firstTabData.stats[0].title);
      }
    }
  }, [activitiesData]);

  // Update selectedStat when tab changes
  useEffect(() => {
    if (activitiesData) {
      const currentTabData = activitiesData.tabs.find(tab => tab.key === activeTab);
      if (currentTabData && currentTabData.stats.length > 0) {
        setSelectedStat(currentTabData.stats[0].title);
      }
    }
  }, [activeTab, activitiesData]);

  const handleStatClick = (title: string) => {
    if (selectedStat !== title) {
      setSelectedStat(title);
    }
  };

  if (loading) {
    return <ActivitiesCardSkeleton />;
  }

  if (error || !activitiesData) {
    return (
      <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[555px]'} p-4 sm:p-5 md:p-6`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500 text-center">
            Error loading activities data: {error || 'Data not available'}
          </div>
        </div>
      </Card>
    );
  }

  const currentTabData = activitiesData.tabs.find(tab => tab.key === activeTab)!;
  
  // Find the stat object for the selected stat
  const selectedStatObj = currentTabData.stats.find(stat => stat.title === selectedStat) || currentTabData.stats[0];  // Prepare chart data for the current tab and selected stat
  const chartSeries: Highcharts.SeriesOptionsType[] = [
    {
      name: selectedStatObj.title,
      data: selectedStatObj.data.map((point: { month: string; value: number }) => point.value),
      color: '#338FFF',
      type: 'areaspline' as const,
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
    <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6`}>
      <div className="h-full">
        <CardHeader title="Activity Overview" rightContent={isMobile ? null : <ViewReportButton />} />
        <div className="flex flex-col w-full justify-between mb-2">
          {/* Tabs */}
          <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>
            {/* Stats Row */}
            <div className={`stat-row flex items-center gap-3 sm:gap-5 p-2.5 h-20 w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap md:overflow-visible md:flex-wrap md:snap-none md:scroll-auto ${styles['stat-row']}`}>
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
          </CardContent>
        </div>
      </div>
    </Card>
  );};

export default ActivitiesCard;
