import React from "react";
import CourseBar from "./CourseBar";

type CourseChartProps = {
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
    };
  }>;
  onCourseClick?: (courseName: string) => void;
  selectedCourse?: string | null;
};

const CourseChart = ({ courseData, onCourseClick, selectedCourse }: CourseChartProps) => {
  // Generate percentage scale markers (0, 10, 20, etc.)
  const percentageMarkers = [];
  for (let i = 0; i <= 100; i += 10) {
    percentageMarkers.push(i);
  }

  return (
    <div className="w-full h-auto flex-1 flex flex-col font-poppins">
      {/* Course bars with more vertical spacing */}
      <div className="flex flex-col gap-6 mb-6 ">        {courseData.map((course, index) => (
          <CourseBar
            key={index}
            name={course.name}
            passedPercentage={course.passedPercentage}
            completedButNotPassedPercentage={course.completedButNotPassedPercentage}
            notCompletedPercentage={course.notCompletedPercentage}
            onClick={onCourseClick}
            isSelected={selectedCourse === course.name}
          />
        ))}
      </div>
      
      {/* Percentage scale line */}
<div className="flex items-center w-full">
  <div className="hidden sm:block w-[100px]"></div>
  <div className="flex-1 h-[1px] bg-[#CDD1D7]"></div>
</div>

{/* Percentage labels */}
<div className="flex w-full justify-between items-center pl-0 sm:pl-[100px]">
  {percentageMarkers.map((percentage, index) => (
    <div 
      key={index} 
      className="text-[#CDD1D7] text-[10px] font-medium"
    >
      {percentage}{index === percentageMarkers.length - 1 ? ' %' : ''}
    </div>
  ))}
</div>

    </div>
  );
};

export default CourseChart;
