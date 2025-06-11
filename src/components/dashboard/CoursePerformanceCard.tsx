import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import CardHeader from "./CardHeader";
import CourseTabContent from "./course-performance/CourseTabContent";
import { useCourseData } from "./course-performance/useCourseData";
import ViewReportButton from "./ViewReportButton";

const CoursePerformanceCard = () => {
  const { tabs, activeTab, setActiveTab, handleStatClick, handleCourseClick, selectedCourse } = useCourseData();
  const isMobile = useIsMobile();  return (
    <Card className={`w-full h-full ${isMobile ? '' : 'min-h-[490px]'} animate-slide-in-up p-4 sm:p-5 md:p-6`} style={{ animationDelay: '0.2s' }}>
<div className="h-full flex flex-col ">
     <CardHeader title="Course Performance" rightContent={isMobile ? null : <ViewReportButton />} />        {/* Tabs with top indicator */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
            <TabsTrigger
              value="top-performers"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {activeTab === "top-performers" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Performing
            </TabsTrigger>
            <TabsTrigger
              value="underperformers"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {activeTab === "underperformers" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Underperforming
            </TabsTrigger>
          </TabsList>            {activeTab === "top-performers" && (
            <TabsContent value="top-performers" className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>
              <CourseTabContent
                stats={{ firstStat: tabs[0]?.stats[0], secondStat: tabs[0]?.stats[1] }}
                courseData={tabs[0]?.data || []}
                onStatClick={handleStatClick}
                onCourseClick={handleCourseClick}
                selectedCourse={selectedCourse}
              />
            </TabsContent>
          )}
          
          {activeTab === "underperformers" && (
            <TabsContent value="underperformers" className={isMobile ? 'p-0 pt-2' : 'p-0 flex flex-col justify-between'}>
              <CourseTabContent
                stats={{ firstStat: tabs[1]?.stats[0], secondStat: tabs[1]?.stats[1] }}
                courseData={tabs[1]?.data || []}
                onStatClick={handleStatClick}
                onCourseClick={handleCourseClick}
                selectedCourse={selectedCourse}
              />
            </TabsContent>
          )}
        </Tabs>

   </div>
    </Card>
  );
};

export default CoursePerformanceCard;
