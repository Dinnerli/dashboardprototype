
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, ArrowUp } from "lucide-react";

type CourseBarProps = {
  name: string;
  completedPercentage: number;
  inProgressPercentage: number;
};

const CourseBar = ({ name, completedPercentage, inProgressPercentage }: CourseBarProps) => {
  return (
    <div className="flex items-center gap-[5px] w-full">
      <div className="flex w-[100px] justify-end items-center gap-[5px]">
        <div className="w-[90px] text-right text-[10px] text-[#4F5A69] font-poppins">{name}</div>
        <div className="w-[4px] h-[1px] bg-[#4F5A69]"></div>
      </div>
      <div className="flex h-[10px] justify-end items-center flex-1">
        <div 
          className="h-full bg-[#338FFF]" 
          style={{ width: `${completedPercentage}%` }}
        ></div>
        <div 
          className="h-full bg-[#CDE4FF]" 
          style={{ width: `${inProgressPercentage}%` }}
        ></div>
        <div className="flex-1 h-full bg-transparent"></div>
      </div>
    </div>
  );
};

const StatIndicator = ({ value, isPositive }: { value: string, isPositive: boolean }) => {
  return (
    <div className="flex items-center justify-end">
      <span className="text-sm text-[#00D764]">
        {value}
      </span>
      <ArrowUp className="w-4 h-4 text-[#00D764]" stroke="#00D764" strokeWidth={1.5} />
    </div>
  );
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive
}: { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
}) => {
  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-lg">
      <div className="flex flex-col items-center justify-center p-2.5">
        <div 
          className={`w-0.5 h-[35px] ${isActive ? 'bg-[#338FFF]' : 'bg-[#CDE4FF]'}`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 px-2.5">
          <span className="text-base font-bold text-[#8C9BAC]">
            {title}
          </span>
          <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
        <div className="flex items-center px-2.5">
          <div>
            <span className="text-2xl font-bold text-[#4F5A69]">{value}</span>
          </div>
          <div className="w-[66px] flex justify-end items-center">
            <StatIndicator value={percentage} isPositive={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

const courseData = [
  { name: "UAT", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Legal", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Pricing 101", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Orientation", completedPercentage: 50, inProgressPercentage: 30 },
  { name: "Presentation Skills", completedPercentage: 50, inProgressPercentage: 30 },
];

const CoursePerformanceCard = () => {
  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6 border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="text-xl font-bold text-[#233143] font-poppins">Course Performance</h3>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex items-center h-[30px] gap-2.5">
              <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
                <span className="text-xs text-[#8C9BAC] font-poppins">Filter by:</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-xs text-[#8C9BAC] font-poppins">Last 60 Days</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-xs text-[#8C9BAC] font-poppins">All</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
                <span className="text-xs text-[#4F5A69] font-poppins text-center px-2">View Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-5 px-2.5 w-full bg-white overflow-x-auto">
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5 border-b-4 border-[#338FFF]">
            <span className="text-[#338FFF] text-base font-bold font-poppins">Top Performers</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
            <span className="text-[#8C9BAC] text-base font-bold font-poppins">Underperformers</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          {/* Stats Row */}
          <div className="flex items-center gap-5 p-2.5 h-20 w-full flex-wrap">
            <ActivityStat 
              title="Completed" 
              value="237" 
              percentage="40%" 
              isActive={false}
            />
            <ActivityStat 
              title="Passed" 
              value="237" 
              percentage="40%" 
              isActive={true}
            />
          </div>

          {/* Chart */}
          <div className="p-2.5 w-full">
            <div className="flex flex-col w-full">
              {/* Course bars */}
              <div className="flex flex-col pb-2.5 justify-between items-start flex-1 w-full gap-2">
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
              <div className="flex items-center gap-[5px] w-full">
                <div className="flex w-[100px] h-0 justify-end items-center gap-[5px]"></div>
                <div className="flex h-[10px] justify-end items-center flex-1">
                  <div className="h-[1px] flex-1 bg-[#CDD1D7]"></div>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="flex pl-[105px] justify-between items-center w-full">
                {["0", "10", "20", "40", "50", "60", "70", "80", "90", "100 %"].map((label, index) => (
                  <div key={index} className="text-[10px] text-[#CDD1D7] font-poppins">{label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoursePerformanceCard;
