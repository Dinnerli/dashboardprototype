
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, ArrowUp } from "lucide-react";

type CourseBarProps = {
  name: string;
  completedPercentage: number;
  inProgressPercentage: number;
};

const CourseBar = ({ name, completedPercentage, inProgressPercentage }: CourseBarProps) => {
  return (
    <div className="flex items-center gap-2 my-2 w-full">
      <div className="flex min-w-[120px] justify-end items-center gap-1">
        <div className="w-full text-right text-xs text-[#4F5A69] font-poppins">{name}</div>
        <div className="w-[4px] h-[1px] bg-[#4F5A69]"></div>
      </div>
      <div className="flex h-[8px] justify-start items-center flex-1">
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
      <span className="text-sm md:text-base text-[#00D764]">
        {value}
      </span>
      <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-[#00D764]" stroke="#00D764" strokeWidth={1.5} />
    </div>
  );
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive,
  icon
}: { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 p-4 relative">
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#338FFF]" />
      )}
      <div className="md:min-w-[140px] flex items-center gap-2">
        <span className="text-sm md:text-base font-medium text-[#8C9BAC]">
          {title}
        </span>
        <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl md:text-2xl font-bold text-[#4F5A69]">{value}</span>
        <StatIndicator value={percentage} isPositive={true} />
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
    <Card className="w-full mt-6 animate-slide-in-up overflow-hidden" style={{ animationDelay: '0.3s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-8 py-6 border-b border-[#E5E7EB]">
          <h3 className="text-xl md:text-2xl font-bold text-[#233143] font-poppins">Course Performance</h3>
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#8C9BAC]">Filter by:</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#8C9BAC]">Last 60 Days</span>
                <ChevronDown className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#8C9BAC]">All</span>
                <ChevronDown className="w-4 h-4 text-[#8C9BAC]" />
              </div>
            </div>
            <div className="cursor-pointer">
              <span className="text-[#4F5A69] border-b border-[#4F5A69] hover:text-[#338FFF] hover:border-[#338FFF] transition-colors">View Report</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center w-full bg-white border-b border-[#E5E7EB]">
          <div className="px-8 py-4 border-b-2 border-[#338FFF]">
            <span className="text-[#338FFF] text-sm md:text-base font-semibold">Top Performers</span>
          </div>
          <div className="px-8 py-4">
            <span className="text-[#8C9BAC] text-sm md:text-base font-semibold">Underperformers</span>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Stats Row */}
          <div className="flex flex-col md:flex-row md:gap-8 mb-6 border-b border-[#E5E7EB]">
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
          <div className="py-4">
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
              <div className="flex ml-[120px] justify-between items-center w-calc[100%-120px] mt-2 text-xs text-[#8C9BAC]">
                {["0", "10", "20", "40", "50", "60", "70", "80", "90", "100 %"].map((label, index) => (
                  <div key={index}>{label}</div>
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
