import { useState, useEffect, useRef } from "react";
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
import activitiesTooltips from '../../Data/ActivitiesTooltips.json';
import { TooltipProvider } from "@/components/ui/tooltip";

interface ActivitiesCardProps {
  startDate: string;
  endDate: string;
  department?: string;
}

const ActivitiesCard = ({ startDate, endDate, department = "All" }: ActivitiesCardProps) => {
  const isMobile = useIsMobile();  
  const [activeTab, setActiveTab] = useState<TabType>('user');
  const [selectedStat, setSelectedStat] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Add drag scrolling functionality
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    // Add event listeners for mouse drag
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Set initial cursor
    container.style.cursor = 'grab';

    // Cleanup
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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

  const { data: currentData, loading, error } = getCurrentData();  // Helper function to get tooltip for a stat
  const getTooltipForStat = (statTitle: string): string | undefined => {
    const categoryTooltips = activitiesTooltips[activeTab as keyof typeof activitiesTooltips];
    return categoryTooltips ? categoryTooltips[statTitle as keyof typeof categoryTooltips] : undefined;
  };  // Update selectedStat when tab changes or data loads
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
    <TooltipProvider>
      <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6`}>
        <div className="h-full">
          <CardHeader title="Activity Overview" rightContent={isMobile ? null : 
          <ViewReportButton  
          target="admin_report_activities.php"
          />} />
          <div className="flex flex-col w-full justify-between mb-2">
            {/* Tabs */}
            <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>              {/* Stats Row */}
              <div 
                ref={scrollContainerRef}
                className={`stat-row flex items-center p-2.5 h-20 w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap carousel-scroll ${styles['stat-row']}`}
              >
                {currentData.map((stat, index) => (
                  <div key={index} className="snap-start flex-shrink-0 min-w-fit">
                    <StatButton
                      title={stat.title}
                      value={stat.value.toString()}
                      percentage={stat.trend}
                      isActive={selectedStat === stat.title}
                      isPositive={stat.rising}
                      onClick={() => handleStatClick(stat.title)}
                      tooltip={getTooltipForStat(stat.title)}
                    />
                  </div>
                ))}
              </div>

              {/* Chart */}
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
    </TooltipProvider>
  );};

export default ActivitiesCard;
