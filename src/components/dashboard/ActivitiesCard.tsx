
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ActivitiesCard = () => {
  return <Card className="w-full mt-6 animate-slide-in-up" style={{
    animationDelay: '0.2s'
  }}>
      <CardHeader className="p-6 flex flex-row items-center justify-between border-b border-[#E5E7EA]">
        <h3 className="text-xl font-bold">Activities</h3>
        <Select defaultValue="average">
          <SelectTrigger className="w-auto min-w-[120px] border-none shadow-none bg-white p-2 h-auto focus:ring-0">
            <SelectValue placeholder="Average" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <Tabs defaultValue="user" className="w-full">
            <div className="flex flex-row items-center justify-between mb-1">
              <TabsList className="bg-transparent p-0 h-auto space-x-6">
                <TabsTrigger 
                  value="user" 
                  className="relative p-0 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base font-bold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-1 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-black data-[state=active]:after:w-full"
                >
                  User Activities
                </TabsTrigger>
                <TabsTrigger 
                  value="usage" 
                  className="relative p-0 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base font-bold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-1 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-black data-[state=active]:after:w-full"
                >
                  Usage Activities
                </TabsTrigger>
                <TabsTrigger 
                  value="course" 
                  className="relative p-0 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base font-bold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-1 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-black data-[state=active]:after:w-full"
                >
                  Course Activities
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="px-4">
                  View All
                </Button>
                <Button variant="outline" size="sm" className="px-4">
                  Export
                </Button>
              </div>
            </div>
            <div className="h-0.5 bg-slate-200 w-full"></div>
            
            <TabsContent value="user" className="mt-4">
              {/* User Activities content will go here */}
              <div className="h-48 flex items-center justify-center text-gray-400">
                No activity data to display
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-4">
              {/* Usage Activities content will go here */}
              <div className="h-48 flex items-center justify-center text-gray-400">
                No usage activity data to display
              </div>
            </TabsContent>
            
            <TabsContent value="course" className="mt-4">
              {/* Course Activities content will go here */}
              <div className="h-48 flex items-center justify-center text-gray-400">
                No course activity data to display
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>;
};

export default ActivitiesCard;
