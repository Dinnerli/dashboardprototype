import React from "react";
import ActivityStat from "./ActivityStat";
import CourseChart from "./CourseChart";
import { useIsMobile } from "@/hooks/use-mobile";

type CourseTabContentProps = {
  stats: {
    firstStat: {
      title: string;
      value: string;
      percentage: string;
      isActive: boolean;
      isSelected: boolean;
      tooltip: string;
      rising: boolean;
    };
    secondStat: {
      title: string;
      value: string;
      percentage: string;
      isActive: boolean;
      isSelected: boolean;
      tooltip: string;
      rising: boolean;
    };  };
  courseData: Array<{
    name: string;
    passedPercentage: number;
    completedButNotPassedPercentage: number;
    notCompletedPercentage: number;
    rawData?: {
      courseName: string;
      all: number;
      completed: { value: number; rising: boolean; trend: string };
      pass: { value: number; rising: boolean; trend: string };
    };  }>;
  onStatClick: (statName: string) => void;
  onCourseClick?: (courseName: string) => void;
  selectedCourse?: string | null;
};

const CourseTabContent = ({ stats, courseData, onStatClick, onCourseClick, selectedCourse }: CourseTabContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div >
      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row justify-between gap-6 py-2 mb-4">
        <ActivityStat
          title={stats.firstStat.title}
          value={stats.firstStat.value}
          percentage={stats.firstStat.percentage}
          isActive={stats.firstStat.isActive}
          tooltip={stats.firstStat.tooltip}
          isSelected={stats.firstStat.isSelected}
          isPositive={stats.firstStat.rising}
          onClick={() => onStatClick(stats.firstStat.title)}
        />
        <ActivityStat 
          title={stats.secondStat.title}
          value={stats.secondStat.value}
          percentage={stats.secondStat.percentage}
          tooltip={stats.secondStat.tooltip}
          isActive={stats.secondStat.isActive}
          isSelected={stats.secondStat.isSelected}
          isPositive={stats.secondStat.rising}
          onClick={() => onStatClick(stats.secondStat.title)}
        />
      </div>

      {/* Chart - taking remaining space */}
      <div className="flex-1 flex p-2.5">
        <CourseChart 
          courseData={courseData} 
          onCourseClick={onCourseClick}
          selectedCourse={selectedCourse}
        />
      </div>
    </div>
  );
};

export default CourseTabContent;
