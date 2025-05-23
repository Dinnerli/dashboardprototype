import React from "react";
import ActivityStat from "./ActivityStat";
import CourseChart from "./CourseChart";

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
    };
  };
  courseData: Array<{
    name: string;
    completedPercentage: number;
    inProgressPercentage: number;
  }>;
  onStatClick: (statName: string) => void;
};

const CourseTabContent = ({ stats, courseData, onStatClick }: CourseTabContentProps) => {
  return (
    <div className="  h-full flex flex-col justify-center">
      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 py-2 mb-4">          
        <ActivityStat 
            title={stats.firstStat.title}
            value={stats.firstStat.value}
            percentage={stats.firstStat.percentage}
            isActive={stats.firstStat.isActive}
            tooltip={stats.firstStat.tooltip}
            isSelected={stats.firstStat.isSelected}
            isPositive={!stats.firstStat.rising}
            onClick={() => onStatClick(stats.firstStat.title)}
          />
          <ActivityStat 
            title={stats.secondStat.title}
            value={stats.secondStat.value}
            percentage={stats.secondStat.percentage}
            tooltip={stats.secondStat.tooltip}
            isActive={stats.secondStat.isActive}
            isSelected={stats.secondStat.isSelected}
            isPositive={!stats.secondStat.rising}
            onClick={() => onStatClick(stats.secondStat.title)}
          />

      </div>

      {/* Chart - taking remaining space */}
      <div className="flex-1 flex ">
        <CourseChart courseData={courseData} />
      </div>
    </div>
  );
};

export default CourseTabContent;
