import { useState } from "react";
import coursePerformance from "../../../Data/CoursePerformance.json";

// Build hooks for course performance data from JSON
export const useCourseData = () => {
  const [activeTab, setActiveTab] = useState("top-performers");
  
  // Get the first course name to set as default selected
  const getFirstCourseName = () => {
    return coursePerformance.coursePerformance.performing[0]?.courseName || null;
  };
  
  const [selectedCourse, setSelectedCourse] = useState<string | null>(getFirstCourseName());

  // Create tabs from the new JSON structure
  const tabs = [
    {
      id: "top-performers",
      name: "Top Performers",
      stats: getStatsForTab("performing"),
      data: coursePerformance.coursePerformance.performing.map((course) => {
        // Ensure data consistency: completed and passed cannot exceed all
        const all = course.all;
        const completed = Math.min(course.completed.value, all);
        const passed = Math.min(course.pass.value, completed);
        
        return {
          name: course.courseName,
          passedPercentage: (passed / all) * 100,
          completedButNotPassedPercentage: ((completed - passed) / all) * 100,
          notCompletedPercentage: ((all - completed) / all) * 100,
          rawData: course, // Keep original data for stat display
        };
      })
    },
    {
      id: "underperformers",
      name: "Underperformers", 
      stats: getStatsForTab("underperforming"),
      data: coursePerformance.coursePerformance.underperforming.map((course) => {
        // Ensure data consistency: completed and passed cannot exceed all
        const all = course.all;
        const completed = Math.min(course.completed.value, all);
        const passed = Math.min(course.pass.value, completed);
        
        return {
          name: course.courseName,
          passedPercentage: (passed / all) * 100,
          completedButNotPassedPercentage: ((completed - passed) / all) * 100,
          notCompletedPercentage: ((all - completed) / all) * 100,
          rawData: course, // Keep original data for stat display
        };
      })
    }
  ];

  function getStatsForTab(type: "performing" | "underperforming") {
    const data = coursePerformance.coursePerformance[type];
    
    // Calculate totals across all courses
    const totalAll = data.reduce((sum, course) => sum + course.all, 0);
    const totalCompleted = data.reduce((sum, course) => sum + course.completed.value, 0);
    const totalPassed = data.reduce((sum, course) => sum + course.pass.value, 0);
    
    // Calculate average trends
    const avgCompletedTrend = data.reduce((sum, course) => {
      const trend = parseFloat(course.completed.trend.replace('%', ''));
      return sum + trend;
    }, 0) / data.length;
    
    const avgPassedTrend = data.reduce((sum, course) => {
      const trend = parseFloat(course.pass.trend.replace('%', ''));
      return sum + trend;
    }, 0) / data.length;

    const mostCompletedRising = data.filter(course => course.completed.rising).length > data.length / 2;
    const mostPassedRising = data.filter(course => course.pass.rising).length > data.length / 2;

    return [
      {
        title: "Completed",
        value: totalCompleted.toString(),
        percentage: `${avgCompletedTrend.toFixed(1)}%`,
        isActive: selectedCourse === null,
        isSelected: false,
        tooltip: "Total completed courses across all learners",
        rising: mostCompletedRising,
      },
      {
        title: "Passed", 
        value: totalPassed.toString(),
        percentage: `${avgPassedTrend.toFixed(1)}%`,
        isActive: selectedCourse === null,
        isSelected: false,
        tooltip: "Total passed courses across all learners",
        rising: mostPassedRising,
      }
    ];
  }

  const handleStatClick = (statName: string) => {
    // For now, just toggle selection - not changing the behavior much
    setSelectedCourse(null);
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
        return {
          ...tab,
          stats: [
            {
              title: "Completed",
              value: course.completed.value.toString(),
              percentage: course.completed.trend,
              isActive: true,
              isSelected: true,
              tooltip: `Completed: ${course.completed.value} out of ${course.all}`,
              rising: course.completed.rising,
            },
            {
              title: "Passed",
              value: course.pass.value.toString(), 
              percentage: course.pass.trend,
              isActive: true,
              isSelected: true,
              tooltip: `Passed: ${course.pass.value} out of ${course.all}`,
              rising: course.pass.rising,
            }
          ]
        };
      }
    }
    return tab;
  });
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // When switching tabs, select the first course of the new tab
    if (newTab === "top-performers") {
      setSelectedCourse(coursePerformance.coursePerformance.performing[0]?.courseName || null);
    } else if (newTab === "underperformers") {
      setSelectedCourse(coursePerformance.coursePerformance.underperforming[0]?.courseName || null);
    }
  };

  return { 
    tabs: updatedTabs, 
    activeTab, 
    setActiveTab: handleTabChange, 
    handleStatClick,
    handleCourseClick,
    selectedCourse
  };
};
