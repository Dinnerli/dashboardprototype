import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import CardHeader from "./CardHeader";
import CourseTabContent from "./course-performance/CourseTabContent";
import { useCoursePerforming, CoursePerformance } from "../../hooks/useCoursePerforming";
import { useCourseUnderperforming, CourseUnderperforming } from "../../hooks/useCourseUnderperforming";
import ViewReportButton from "./ViewReportButton";
import EmptyState from "./EmptyState";
import CoursePerformanceCardSkeleton from "../Skeletons/CoursePerformanceCard.skeleton";

interface CoursePerformanceCardProps {
  startDate: string;
  endDate: string;
}

const CoursePerformanceCard = ({ startDate, endDate }: CoursePerformanceCardProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("top-performers");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Fetch performing courses data
  const { data: performingData, loading: performingLoading, error: performingError } = useCoursePerforming({ 
    startDate, 
    endDate,
    enabled: activeTab === "top-performers"
  });

  // Fetch underperforming courses data
  const { data: underperformingData, loading: underperformingLoading, error: underperformingError } = useCourseUnderperforming({ 
    startDate, 
    endDate,
    enabled: activeTab === "underperformers"
  });
  // Determine overall loading and error states
  const loading = (activeTab === "top-performers" && performingLoading) || (activeTab === "underperformers" && underperformingLoading);
  const error = (activeTab === "top-performers" && performingError) || (activeTab === "underperformers" && underperformingError);

  // Auto-select first course when performing data loads
  useEffect(() => {
    if (activeTab === "top-performers" && performingData && performingData.length > 0 && !selectedCourse) {
      setSelectedCourse(performingData[0].title);
    }
  }, [performingData, activeTab, selectedCourse]);
  // Auto-select first course when underperforming data loads
  useEffect(() => {
    if (activeTab === "underperformers" && underperformingData && underperformingData.length > 0 && !selectedCourse) {
      setSelectedCourse(underperformingData[0].title);
    }
  }, [underperformingData, activeTab, selectedCourse]);

  // Ensure selected course exists in current data, if not select first available
  useEffect(() => {
    if (activeTab === "top-performers" && performingData) {
      if (selectedCourse && !performingData.find(course => course.title === selectedCourse)) {
        // Selected course doesn't exist in current data, select first available
        if (performingData.length > 0) {
          setSelectedCourse(performingData[0].title);
        }
      }
    } else if (activeTab === "underperformers" && underperformingData) {
      if (selectedCourse && !underperformingData.find(course => course.title === selectedCourse)) {
        // Selected course doesn't exist in current data, select first available
        if (underperformingData.length > 0) {
          setSelectedCourse(underperformingData[0].title);
        }
      }
    }
  }, [performingData, underperformingData, selectedCourse, activeTab]);

  // Transform API data to chart format for performing courses
  const transformPerformingData = (data: CoursePerformance[]) => {
    return data.map((course) => {
      const all = course.all.value;
      const completed = Math.min(course.completed.value, all);
      const passed = Math.min(course.passed.value, completed);
      
      return {
        name: course.title,
        passedPercentage: all > 0 ? (passed / all) * 100 : 0,
        completedButNotPassedPercentage: all > 0 ? ((completed - passed) / all) * 100 : 0,
        notCompletedPercentage: all > 0 ? ((all - completed) / all) * 100 : 0,
        rawData: {
          courseName: course.title,
          all: course.all.value,
          completed: course.completed,
          pass: course.passed,
        },
      };
    });
  };

  // Transform API data to chart format for underperforming courses
  const transformUnderperformingData = (data: CourseUnderperforming[]) => {
    return data.map((course) => {
      const all = course.all.value;
      const completed = Math.min(course.completed.value, all);
      const failed = Math.min(course.failed.value, completed);
      
      return {
        name: course.title,
        passedPercentage: all > 0 ? ((completed - failed) / all) * 100 : 0, // Show completed but not failed
        completedButNotPassedPercentage: all > 0 ? (failed / all) * 100 : 0, // Show failed portion
        notCompletedPercentage: all > 0 ? ((all - completed) / all) * 100 : 0,
        rawData: {
          courseName: course.title,
          all: course.all.value,
          completed: course.completed,
          pass: { value: completed - failed, rising: true, trend: "0%" }, // Calculate passed
          failed: course.failed,
        },
      };
    });
  };
  // Generate stats for performing courses
  const getPerformingStats = (data: CoursePerformance[]) => {
    if (!data || data.length === 0) {
      return [
        {
          title: "Completed",
          value: "0",
          percentage: "0%",
          isActive: selectedCourse === null,
          isSelected: selectedCourse === null,
          tooltip: "Total completed courses across all learners",
          rising: true,
        },
        {
          title: "Passed", 
          value: "0",
          percentage: "0%",
          isActive: selectedCourse === null,
          isSelected: selectedCourse === null,
          tooltip: "Total passed courses across all learners",
          rising: true,
        }
      ];
    }

    // If a course is selected, show stats for that specific course
    if (selectedCourse) {
      const course = data.find(c => c.title === selectedCourse);
      if (course) {
        return [
          {
            title: "Completed",
            value: course.completed.value.toString(),
            percentage: course.completed.trend,
            isActive: true,
            isSelected: true,
            tooltip: "Percentage of learners who finished all course components",
            rising: course.completed.rising,
          },
          {
            title: "Passed",
            value: course.passed.value.toString(), 
            percentage: course.passed.trend,
            isActive: true,
            isSelected: true,
            tooltip: "Percentage learners who met the passing criteria for the course",
            rising: course.passed.rising,
          }
        ];
      }
    }

    // Show aggregate stats for all courses
    const totalCompleted = data.reduce((sum, course) => sum + course.completed.value, 0);
    const totalPassed = data.reduce((sum, course) => sum + course.passed.value, 0);
    
    const avgCompletedTrend = data.reduce((sum, course) => {
      const trend = parseFloat(course.completed.trend.replace('%', ''));
      return sum + trend;
    }, 0) / data.length;
    
    const avgPassedTrend = data.reduce((sum, course) => {
      const trend = parseFloat(course.passed.trend.replace('%', ''));
      return sum + trend;
    }, 0) / data.length;

    const mostCompletedRising = data.filter(course => course.completed.rising).length > data.length / 2;
    const mostPassedRising = data.filter(course => course.passed.rising).length > data.length / 2;

    return [
      {
        title: "Completed",
        value: totalCompleted.toString(),
        percentage: `${avgCompletedTrend.toFixed(1)}%`,
        isActive: selectedCourse === null,
        isSelected: selectedCourse === null,
        tooltip: "Total completed courses across all learners",
        rising: mostCompletedRising,
      },
      {
        title: "Passed", 
        value: totalPassed.toString(),
        percentage: `${avgPassedTrend.toFixed(1)}%`,
        isActive: selectedCourse === null,
        isSelected: selectedCourse === null,
        tooltip: "Total passed courses across all learners",
        rising: mostPassedRising,
      }
    ];
  };

  // Generate stats for underperforming courses
  const getUnderperformingStats = (data: CourseUnderperforming[]) => {
    if (!data || data.length === 0) {
      return [
        {
          title: "Completed",
          value: "0",
          percentage: "0%",
          isActive: selectedCourse === null,
          isSelected: selectedCourse === null,
          tooltip: "Total completed courses across all learners",
          rising: true,
        },
        {
          title: "Failed", 
          value: "0",
          percentage: "0%",
          isActive: selectedCourse === null,
          isSelected: selectedCourse === null,
          tooltip: "Total failed courses across all learners",
          rising: false,
        }
      ];
    }

    // If a course is selected, show stats for that specific course
    if (selectedCourse) {
      const course = data.find(c => c.title === selectedCourse);
      if (course) {
        return [
          {
            title: "Completed",
            value: course.completed.value.toString(),
            percentage: course.completed.trend,
            isActive: true,
            isSelected: true,
            tooltip: "Percentage of learners who finished all course components",
            rising: course.completed.rising,
          },
          {
            title: "Failed",
            value: course.failed.value.toString(), 
            percentage: course.failed.trend,
            isActive: true,
            isSelected: true,
            tooltip: "Percentage learners who failed the course",
            rising: course.failed.rising,
          }
        ];
      }
    }

    // Show aggregate stats for all courses
    const totalCompleted = data.reduce((sum, course) => sum + course.completed.value, 0);
    const totalFailed = data.reduce((sum, course) => sum + course.failed.value, 0);
    
    const avgCompletedTrend = data.reduce((sum, course) => {
      const trend = parseFloat(course.completed.trend.replace('%', ''));
      return sum + trend;
    }, 0) / data.length;
    
    const avgFailedTrend = data.reduce((sum, course) => {
      const trend = parseFloat(course.failed.trend.replace('%', ''));
      return sum + trend;
    }, 0) / data.length;

    const mostCompletedRising = data.filter(course => course.completed.rising).length > data.length / 2;
    const mostFailedRising = data.filter(course => course.failed.rising).length > data.length / 2;

    return [
      {
        title: "Completed",
        value: totalCompleted.toString(),
        percentage: `${avgCompletedTrend.toFixed(1)}%`,
        isActive: selectedCourse === null,
        isSelected: selectedCourse === null,
        tooltip: "Total completed courses across all learners",
        rising: mostCompletedRising,
      },
      {
        title: "Failed", 
        value: totalFailed.toString(),
        percentage: `${avgFailedTrend.toFixed(1)}%`,
        isActive: selectedCourse === null,
        isSelected: selectedCourse === null,
        tooltip: "Total failed courses across all learners",
        rising: mostFailedRising,
      }
    ];
  };  const handleStatClick = (statName: string) => {
    // Always ensure a course is selected when clicking stats
    if (!selectedCourse) {
      if (activeTab === "top-performers" && performingData && performingData.length > 0) {
        setSelectedCourse(performingData[0].title);
      } else if (activeTab === "underperformers" && underperformingData && underperformingData.length > 0) {
        setSelectedCourse(underperformingData[0].title);
      }
    }
    // If a course is already selected, keep it selected
  };

  const handleCourseClick = (courseName: string) => {
    setSelectedCourse(courseName);
  };
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // Auto-select first course of the new tab
    if (newTab === "top-performers" && performingData && performingData.length > 0) {
      setSelectedCourse(performingData[0].title);
    } else if (newTab === "underperformers" && underperformingData && underperformingData.length > 0) {
      setSelectedCourse(underperformingData[0].title);
    } else {
      setSelectedCourse(null); // Only set to null if no data available
    }
  };

  // Get current tab data and stats
  const getCurrentData = () => {
    if (activeTab === "top-performers") {
      return {
        courseData: performingData ? transformPerformingData(performingData) : [],
        stats: getPerformingStats(performingData || [])
      };
    } else {
      return {
        courseData: underperformingData ? transformUnderperformingData(underperformingData) : [],
        stats: getUnderperformingStats(underperformingData || [])
      };
    }
  };

  const { courseData, stats } = getCurrentData();

  // Handle empty state
  const hasNoData = !courseData || courseData.length === 0;
  const currentTabName = activeTab === "top-performers" ? "performing courses" : "underperforming courses";
  // Handle loading state
  if (loading) {
    return <CoursePerformanceCardSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6`} style={{ animationDelay: '0.2s' }}>
        <div className="h-full flex flex-col">
          <CardHeader title="Course Performance" rightContent={isMobile ? null : <ViewReportButton />} />
          <div className="flex items-center justify-center h-full">
            <span className="text-red-500">Error: {error}</span>
          </div>
        </div>
      </Card>
    );
  }  return (
    <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6`} style={{ animationDelay: '0.2s' }}>
      <div className="h-full flex flex-col">
        <CardHeader title="Course Performance" rightContent={isMobile ? null : <ViewReportButton />} />
          {/* Tabs with top indicator */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full">
          <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
            <TabsTrigger
              value="top-performers"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {activeTab === "top-performers" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Performing
            </TabsTrigger>
            <TabsTrigger
              value="underperformers"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {activeTab === "underperformers" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Underperforming
            </TabsTrigger>
          </TabsList>
            <TabsContent value="top-performers" className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>
            {hasNoData && activeTab === "top-performers" ? (
              <EmptyState 
                cardName="performing courses" 
                className="h-full flex flex-col justify-center"
              />
            ) : (
              <CourseTabContent
                stats={{ firstStat: stats[0], secondStat: stats[1] }}
                courseData={courseData}
                onStatClick={handleStatClick}
                onCourseClick={handleCourseClick}
                selectedCourse={selectedCourse}
              />
            )}
          </TabsContent>
          
          <TabsContent value="underperformers" className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>
            {hasNoData && activeTab === "underperformers" ? (
              <EmptyState 
                cardName="underperforming courses" 
                className="h-full flex flex-col justify-center"
              />
            ) : (
              <CourseTabContent
                stats={{ firstStat: stats[0], secondStat: stats[1] }}
                courseData={courseData}
                onStatClick={handleStatClick}
                onCourseClick={handleCourseClick}
                selectedCourse={selectedCourse}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default CoursePerformanceCard;
