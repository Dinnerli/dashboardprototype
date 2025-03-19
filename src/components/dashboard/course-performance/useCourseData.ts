
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
  
  const tabContents = {
    "top-performers": {
      stats: {
        firstStat: {
          title: "Completed",
          value: "237",
          percentage: "40%",
          isActive: false
        },
        secondStat: {
          title: "Passed",
          value: "237",
          percentage: "40%",
          isActive: true
        }
      }
    },
    "underperformers": {
      stats: {
        firstStat: {
          title: "Incomplete",
          value: "124",
          percentage: "20%",
          isActive: true
        },
        secondStat: {
          title: "Failed",
          value: "89",
          percentage: "15%",
          isActive: false
        }
      }
    }
  };
  
  return {
    activeTab,
    setActiveTab,
    courseData,
    tabContents
  };
};
