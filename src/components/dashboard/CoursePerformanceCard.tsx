
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, ArrowUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

type CourseBarProps = {
  name: string;
  completedPercentage: number;
  inProgressPercentage: number;
};

const CourseBar = ({ name, completedPercentage, inProgressPercentage }: CourseBarProps) => {
  return (
    <div className="flex items-center gap-2 my-3 w-full">
      <div className="flex min-w-[120px] justify-end items-center gap-1">
        <div className="w-full text-right text-xs text-[#4F5A69] font-poppins">{name}</div>
        <div className="w-[4px] h-[1px] bg-[#4F5A69]"></div>
      </div>
      <div className="flex h-[8px] justify-start items-center flex-1">
        <div 
          className="h-full bg-[#338FFF] rounded-l-sm" 
          style={{ width: `${completedPercentage}%` }}
        ></div>
        <div 
          className="h-full bg-[#CDE4FF] rounded-r-sm" 
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
    <div className="flex flex-col items-start gap-1 relative p-6 border-r border-[#E5E7EB] w-1/2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base text-[#8C9BAC] font-medium">
          {title}
        </span>
        <Info className="w-4 h-4 text-[#8C9BAC]" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-[#4F5A69]">{value}</span>
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
  const [activeTab, setActiveTab] = useState("top-performers");

  return (
    <Card className="w-full mt-6 animate-slide-in-up shadow-sm" style={{ animationDelay: '0.3s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-8 py-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-[#233143] font-poppins">Course Performance</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8C9BAC]">Filter by:</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-[#8C9BAC]">Last 60 Days</span>
                <ChevronDown className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-[#8C9BAC]">All</span>
                <ChevronDown className="w-4 h-4 text-[#8C9BAC]" />
              </div>
            </div>
            <div className="cursor-pointer">
              <span className="text-xs text-[#4F5A69] hover:text-[#338FFF] transition-colors">View Report</span>
            </div>
          </div>
        </div>

        {/* Tabs with top indicator */}
        <Tabs defaultValue="top-performers" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex h-auto w-full bg-white rounded-none p-0">
            <TabsTrigger 
              value="top-performers"
              className="flex-1 px-8 py-4 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-sm font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0"
            >
              {activeTab === "top-performers" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Top Performers
            </TabsTrigger>
            <TabsTrigger 
              value="underperformers"
              className="flex-1 px-8 py-4 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-sm font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0"
            >
              {activeTab === "underperformers" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Underperformers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="top-performers" className="mt-0">
            <div className="px-8 py-0">
              {/* Stats Row - Updated layout to match design */}
              <div className="flex mb-4 border-b border-[#E5E7EB]">
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

              {/* Chart - Updated layout and spacing */}
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
            </div>
          </TabsContent>
          
          <TabsContent value="underperformers" className="mt-0">
            <div className="px-8 py-0">
              {/* Stats Row for Underperformers - Updated layout to match design */}
              <div className="flex mb-4 border-b border-[#E5E7EB]">
                <ActivityStat 
                  title="Incomplete" 
                  value="124" 
                  percentage="20%" 
                  isActive={true}
                />
                <ActivityStat 
                  title="Failed" 
                  value="89" 
                  percentage="15%" 
                  isActive={false}
                />
              </div>

              {/* Chart - Same structure but with updated spacing */}
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default CoursePerformanceCard;
