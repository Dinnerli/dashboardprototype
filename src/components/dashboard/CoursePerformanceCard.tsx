import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseTabContent from "./course-performance/CourseTabContent";
import { useCourseData } from "./course-performance/useCourseData";
import FilterDropdown from "./common/FilterDropdown";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { useIsMobile } from "@/hooks/use-mobile";

const CoursePerformanceCard = () => {
  const { tabs, activeTab, setActiveTab, handleStatClick } = useCourseData();
  const timeOptions = ["Last 60 Days", "Last 30 Days", "Last 15 Days", "Last 7 Days"];
  const typeOptions = ["All", "Completed", "In Progress", "Not Started"];
  const isMobile = useIsMobile();
  return (
    <Card  className={`w-full pb-6 h-full animate-slide-in-up ${isMobile ? 'px-4 pb-6 sm:px-5 md:px-6' : 'px-6'} font-poppins`}
      style={{ animationDelay: isMobile ? '0.2s' : '0.4s' }}
   >
      <div className="w-full">
       <CardHeader title="Course Performance" rightContent={isMobile ? null : <ViewReportButton />} />

        {/* Tabs with top indicator */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
              >
                {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0 flex-1 px-0">
              <CourseTabContent
                stats={{ firstStat: tab.stats[0], secondStat: tab.stats[1] }}
                courseData={tab.data}
                onStatClick={handleStatClick}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
};

export default CoursePerformanceCard;
