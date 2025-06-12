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
import { useUserActivity } from '../../hooks/useUserActivity';
import { useUsageActivity } from '../../hooks/useUsageActivity';
import { useCourseActivity } from '../../hooks/useCourseActivity';

interface ActivitiesCardProps {
  startDate: string;
  endDate: string;
  department?: string;
}

const ActivitiesCard = ({ startDate, endDate, department = "All" }: ActivitiesCardProps) => {
  const isMobile = useIsMobile();  
  const [activeTab, setActiveTab] = useState<TabType>('user');
  const [selectedStat, setSelectedStat] = useState<string>('');

  // Use the appropriate hook based on active tab
  const userActivityResult = useUserActivity({ startDate, endDate, department });
  const usageActivityResult = useUsageActivity({ startDate, endDate, department });
  const courseActivityResult = useCourseActivity({ startDate, endDate, department });

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'user':
        return userActivityResult;
      case 'usage':
        return usageActivityResult;
      case 'course':
        return courseActivityResult;
      default:
        return userActivityResult;
    }
  };

  const { data: currentData, loading, error } = getCurrentData();

  // Update selectedStat when tab changes or data loads
  useEffect(() => {
    if (currentData && currentData.length > 0) {
      setSelectedStat(currentData[0].title);
    }
  }, [activeTab, currentData]);

  const handleStatClick = (title: string) => {
    if (selectedStat !== title) {
      setSelectedStat(title);
    }
  };

  if (loading) {
    return <ActivitiesCardSkeleton />;
  }
  if (error || !currentData) {
    return (
      <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} p-4 sm:p-5 md:p-6`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500 text-center">
            Error loading activities data: {error || 'Data not available'}
          </div>
        </div>
      </Card>
    );
  }

  // Find the selected stat object
  const selectedStatObj = currentData.find(stat => stat.title === selectedStat) || currentData[0];
  // Prepare chart data for the selected stat
  const chartSeries: Highcharts.SeriesOptionsType[] = [
    {
      name: selectedStatObj.title,
      data: selectedStatObj.chartValues.map(point => point.value),
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

  // Extract x-axis categories from the selected stat
  const xAxisCategories = selectedStatObj.chartValues.map(point => point.name);
  
  // Pass chartSeries as prop to ActivityChart
  return (
    <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6`}>
      <div className="h-full">
        <CardHeader title="Activity Overview" rightContent={isMobile ? null : <ViewReportButton />} />
        <div className="flex flex-col w-full justify-between mb-2">
          {/* Tabs */}
          <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>            {/* Stats Row */}
            <div className={`stat-row flex items-center gap-3 sm:gap-5 p-2.5 h-20 w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap md:overflow-visible md:flex-wrap md:snap-none md:scroll-auto ${styles['stat-row']}`}>
              {currentData.map((stat, index) => (
                <div key={index} className="snap-start w-[70vw] min-w-[70vw] sm:w-auto sm:min-w-0">
                  <StatButton
                    title={stat.title}
                    value={stat.value.toString()}
                    percentage={stat.trend}
                    isActive={selectedStat === stat.title}
                    isPositive={stat.rising}
                    onClick={() => handleStatClick(stat.title)}
                    tooltip={stat.title}
                  />
                </div>
              ))}
            </div>            {/* Chart */}
            <ActivityChart 
              chartType={activeTab} 
              selectedStat={selectedStat} 
              chartSeries={chartSeries}
              xAxisCategories={xAxisCategories}
            />
          </CardContent>
        </div>
      </div>
    </Card>
  );};

export default ActivitiesCard;
