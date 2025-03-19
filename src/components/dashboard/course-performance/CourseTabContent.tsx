
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
    };
    secondStat: {
      title: string;
      value: string;
      percentage: string;
      isActive: boolean;
    };
  };
  courseData: Array<{
    name: string;
    completedPercentage: number;
    inProgressPercentage: number;
  }>;
};

const CourseTabContent = ({ stats, courseData }: CourseTabContentProps) => {
  return (
    <div className="px-8 py-0 h-full flex flex-col">
      {/* Stats Row */}
      <div className="flex mb-2">
        <ActivityStat 
          title={stats.firstStat.title}
          value={stats.firstStat.value}
          percentage={stats.firstStat.percentage}
          isActive={stats.firstStat.isActive}
        />
        <ActivityStat 
          title={stats.secondStat.title}
          value={stats.secondStat.value}
          percentage={stats.secondStat.percentage}
          isActive={stats.secondStat.isActive}
        />
      </div>

      {/* Chart - taking remaining space without border */}
      <div className="flex-1 flex pt-0">
        <CourseChart courseData={courseData} />
      </div>
    </div>
  );
};

export default CourseTabContent;
