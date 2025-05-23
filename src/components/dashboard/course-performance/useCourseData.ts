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
    }));
    const data = tab.data.map((course) => ({
      name: course.name,
      completedPercentage: course.value1,
      inProgressPercentage: course.value2 - course.value1,
    }));
    return { id, name: tab.name, stats, data };
  });

  const handleStatClick = (statName: string) => {
    setSelectedStat(selectedStat === statName ? null : statName);
  };

  return { tabs, activeTab, setActiveTab, handleStatClick };
};
