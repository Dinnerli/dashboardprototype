
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseTabContent from "./course-performance/CourseTabContent";
import { useCourseData } from "./course-performance/useCourseData";

const CoursePerformanceCard = () => {
  const { activeTab, setActiveTab, courseData, tabContents } = useCourseData();

  return (
    <Card className="w-full h-[555px] mt-6 animate-slide-in-up shadow-sm" style={{ animationDelay: '0.3s' }}>
      <div className="w-full h-full flex flex-col">
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
        <Tabs defaultValue="top-performers" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
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
          
          <TabsContent value="top-performers" className="mt-0 flex-1">
            <CourseTabContent 
              stats={tabContents["top-performers"].stats}
              courseData={courseData}
            />
          </TabsContent>
          
          <TabsContent value="underperformers" className="mt-0 flex-1">
            <CourseTabContent 
              stats={tabContents["underperformers"].stats}
              courseData={courseData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default CoursePerformanceCard;
