import { useState } from "react";

// Mock course data - this could be fetched from an API in a real application
const courseData = [
  { name: "UAT", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Legal", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Pricing 101", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Orientation", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Presentation Skills", completedPercentage: 50, inProgressPercentage: 30 },
];

export const useCourseData = () => {
  const [activeTab, setActiveTab] = useState("top-performers");
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  
  const handleStatClick = (statName: string) => {
    setSelectedStat(selectedStat === statName ? null : statName);
  };
  
  const tabContents = {
    "top-performers": {
      stats: {
        firstStat: {
          title: "Completed",
          value: "237",
          percentage: "40%",
          isActive: false,
          isSelected: selectedStat === "Completed"
        },
        secondStat: {
          title: "Passed",
          value: "237",
          percentage: "40%",
          isActive: true,
          isSelected: selectedStat === "Passed"
        }
      }
    },
    "underperformers": {
      stats: {
        firstStat: {
          title: "Incomplete",
          value: "124",
          percentage: "20%",
          isActive: true,
          isSelected: selectedStat === "Incomplete"
        },
        secondStat: {
          title: "Failed",
          value: "89",
          percentage: "15%",
          isActive: false,
          isSelected: selectedStat === "Failed"
        }
      }
    }
  };
  
  return {
    activeTab,
    setActiveTab,
    courseData,
    tabContents,
    selectedStat,
    handleStatClick
  };
};
