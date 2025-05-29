import { useState } from "react";
import coursePerformance from "../../../Data/CoursePerformance.json";

// Build hooks for course performance data from JSON
export const useCourseData = () => {
  const rawTabs = coursePerformance.coursePerformers.tabs;
  const [activeTab, setActiveTab] = useState(
    rawTabs[0]?.name.toLowerCase().replace(/\s+/g, "-") || ""
  );
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  // Map JSON tabs to internal structure
  const tabs = rawTabs.map((tab) => {
    const id = tab.name.toLowerCase().replace(/\s+/g, "-");
    const stats = tab.stats.map((stat, idx) => ({
      title: stat.name,
      value: String(stat.value),
      percentage: `${stat.trend}%`,
      isPositive: stat.rising,
      isActive:
        id === "top-performers" ? idx === 1 : idx === 0,
      isSelected: selectedStat === stat.name,
      tooltip: stat.tooltip,
      rising: stat.rising,
    }));    const data = tab.data.map((course) => {
      // Ensure data consistency: completed and passed cannot exceed all
      const all = Math.max(course.all, course.completed, course.passed);
      const completed = Math.min(course.completed, all);
      const passed = Math.min(course.passed, completed);
      
      return {
        name: course.name,
        passedPercentage: (passed / all) * 100,
        completedButNotPassedPercentage: ((completed - passed) / all) * 100,
        notCompletedPercentage: ((all - completed) / all) * 100,
      };
    });
    return { id, name: tab.name, stats, data };
  });

  const handleStatClick = (statName: string) => {
    setSelectedStat(selectedStat === statName ? null : statName);
  };

  return { tabs, activeTab, setActiveTab, handleStatClick };
};
