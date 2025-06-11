import { useState } from "react";
import { useCoursePerforming, CoursePerformance } from "../../../hooks/useCoursePerforming";
import { useCourseUnderperforming, CourseUnderperforming } from "../../../hooks/useCourseUnderperforming";

interface UseCourseDataParams {
  startDate: string;
  endDate: string;
}

// Build hooks for course performance data from API
export const useCourseData = ({ startDate, endDate }: UseCourseDataParams) => {
  const [activeTab, setActiveTab] = useState("top-performers");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Fetch data from APIs based on active tab
  const performingEnabled = activeTab === "top-performers";
  const underperformingEnabled = activeTab === "underperformers";

  const { 
    data: performingData, 
    loading: performingLoading, 
    error: performingError 
  } = useCoursePerforming({ 
    startDate, 
    endDate, 
    enabled: performingEnabled 
  });

  const { 
    data: underperformingData, 
    loading: underperformingLoading, 
    error: underperformingError 
  } = useCourseUnderperforming({ 
    startDate, 
    endDate, 
    enabled: underperformingEnabled 
  });

  // Determine overall loading and error states
  const loading = (performingEnabled && performingLoading) || (underperformingEnabled && underperformingLoading);
  const error = (performingEnabled && performingError) || (underperformingEnabled && underperformingError);

  // Helper function to transform API data to chart format
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

  const transformUnderperformingData = (data: CourseUnderperforming[]) => {
    return data.map((course) => {
      const all = course.all.value;
      const completed = Math.min(course.completed.value, all);
      const failed = Math.min(course.failed.value, completed);
      
      return {
        name: course.title,
        passedPercentage: all > 0 ? ((completed - failed) / all) * 100 : 0, // Passed = completed - failed
        completedButNotPassedPercentage: all > 0 ? (failed / all) * 100 : 0, // Failed courses
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

  // Calculate stats for tabs
  const getStatsForPerforming = (data: CoursePerformance[]) => {
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

  const getStatsForUnderperforming = (data: CourseUnderperforming[]) => {
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
  };

  // Create tabs from the API data
  const tabs = [
    {
      id: "top-performers",
      name: "Top Performers",
      stats: getStatsForPerforming(performingData || []),
      data: transformPerformingData(performingData || [])
    },
    {
      id: "underperformers",
      name: "Underperformers", 
      stats: getStatsForUnderperforming(underperformingData || []),
      data: transformUnderperformingData(underperformingData || [])
    }
  ];

  const handleStatClick = (statName: string) => {
    // Always ensure a course is selected when clicking stats
    if (!selectedCourse) {
      const currentTabData = activeTab === "top-performers" ? performingData : underperformingData;
      const firstCourse = currentTabData?.[0]?.title;
      if (firstCourse) {
        setSelectedCourse(firstCourse);
      }
    }
    // If a course is already selected, keep it selected
  };

  const handleCourseClick = (courseName: string) => {
    setSelectedCourse(courseName);
  };

  // Update stats to show selected course data if a course is selected
  const updatedTabs = tabs.map(tab => {
    if (selectedCourse) {
      const selectedCourseData = tab.data.find(course => course.name === selectedCourse);
      if (selectedCourseData && tab.id === activeTab) {
        const course = selectedCourseData.rawData;
        
        if (activeTab === "top-performers") {
          return {
            ...tab,
            stats: [
              {
                title: "Completed",
                value: course.completed.value.toString(),
                percentage: course.completed.trend,
                isActive: true,
                isSelected: true,
                tooltip: `Percentage of learners who finished all course components`,
                rising: course.completed.rising,
              },
              {
                title: "Passed",
                value: course.pass.value.toString(), 
                percentage: course.pass.trend,
                isActive: true,
                isSelected: true,
                tooltip: `Percentage learners who met the passing criteria for the course`,
                rising: course.pass.rising,
              }
            ]
          };        } else {
          // For underperforming, we need to handle the failed stat
          const courseRawData = selectedCourseData.rawData as typeof selectedCourseData.rawData & { failed?: { value: number; trend: string; rising: boolean } };
          const failedStat = courseRawData.failed || { value: 0, trend: "0%", rising: false };
          return {
            ...tab,
            stats: [
              {
                title: "Completed",
                value: course.completed.value.toString(),
                percentage: course.completed.trend,
                isActive: true,
                isSelected: true,
                tooltip: `Percentage of learners who finished all course components`,
                rising: course.completed.rising,
              },
              {
                title: "Failed",
                value: failedStat.value.toString(), 
                percentage: failedStat.trend,
                isActive: true,
                isSelected: true,
                tooltip: `Percentage learners who failed the course`,
                rising: failedStat.rising,
              }
            ]
          };
        }
      }
    }
    return tab;
  });

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // When switching tabs, select the first course of the new tab
    if (newTab === "top-performers") {
      setSelectedCourse(performingData?.[0]?.title || null);
    } else if (newTab === "underperformers") {
      setSelectedCourse(underperformingData?.[0]?.title || null);
    }
  };

  return { 
    tabs: updatedTabs, 
    activeTab, 
    setActiveTab: handleTabChange, 
    handleStatClick,
    handleCourseClick,
    selectedCourse,
    loading,
    error
  };
};
