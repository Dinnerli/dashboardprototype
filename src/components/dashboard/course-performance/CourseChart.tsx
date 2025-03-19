
import React from "react";
import CourseBar from "./CourseBar";

type CourseChartProps = {
  courseData: Array<{
    name: string;
    completedPercentage: number;
    inProgressPercentage: number;
  }>;
};

const CourseChart = ({ courseData }: CourseChartProps) => {
  return (
    <div className="py-4 pb-8">
      <div className="flex flex-col w-full">
        {/* Course bars */}
        <div className="flex flex-col justify-between items-start w-full">
          {courseData.map((course, index) => (
            <CourseBar 
              key={index}
              name={course.name}
              completedPercentage={course.completedPercentage}
              inProgressPercentage={course.inProgressPercentage}
            />
          ))}
        </div>
        
        {/* Separator line */}
        <div className="flex items-center gap-[5px] w-full mt-2">
          <div className="min-w-[120px]"></div>
          <div className="flex h-[1px] flex-1 bg-[#E5E7EB]"></div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex ml-[120px] justify-between w-[calc(100%-120px)] mt-2 text-xs text-[#8C9BAC]">
          <div>0</div>
          <div>10</div>
          <div>20</div>
          <div>40</div>
          <div>50</div>
          <div>60</div>
          <div>70</div>
          <div>80</div>
          <div>90</div>
          <div>100 %</div>
        </div>
      </div>
    </div>
  );
};

export default CourseChart;
