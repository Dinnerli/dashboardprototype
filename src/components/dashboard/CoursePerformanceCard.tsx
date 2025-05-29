import { Card, CardContent } from "@/components/ui/card";
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
    <Card   className="w-full h-full animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
<div className="h-full flex flex-col ">
     <CardHeader title="Course Performance" rightContent={isMobile ? null : <ViewReportButton />} />
        {/* Tabs with top indicator */}
        <Tabs value={activeTab} onValueChange={setActiveTab} >
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
              <TabsContent  value={tab.id} className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'} >
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
