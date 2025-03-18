
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ArrowUp } from "lucide-react";

const ActiveUsersCard = () => {
  return (
    <div className="flex flex-col p-[5px_10px_10px_10px] items-start flex-1 rounded-[10px] bg-[rgba(9,169,255,0.07)]">
      <div className="flex p-[5px_10px] items-center gap-[10px] w-full">
        <div className="text-black text-[14px] font-poppins font-medium leading-[24px]">
          Active users
        </div>
        <Info className="w-4 h-4" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex p-[0px_10px] items-center gap-[10px]">
          <div className="text-black text-[24px] font-['Inter'] font-bold">
            237
          </div>
        </div>
        <div className="flex p-[6px_10px] items-center gap-[10px]">
          <div className="text-[#019230] text-[14px] font-poppins font-semibold">
            8.4%
          </div>
          <ArrowUp className="w-4 h-4 text-[#019230]" stroke="#019230" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

const CompletedCard = () => {
  return (
    <div className="flex flex-col p-[5px_10px_10px_10px] items-start flex-1 rounded-[10px]">
      <div className="flex p-[5px_10px] items-center gap-[20px] w-full">
        <div className="text-black text-[14px] font-poppins font-medium leading-[24px]">
          Completed
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex p-[0px_10px] items-center gap-[10px]">
          <div className="text-black">
            <span className="text-[24px] font-['Inter'] font-bold">82</span>
            <span className="text-[16px] font-['Inter'] font-bold">%</span>
          </div>
        </div>
        <div className="flex p-[6px_10px] items-center gap-[10px]">
          <div className="text-[#019230] text-[14px] font-poppins font-bold">
            32.8%
          </div>
          <ArrowUp className="w-4 h-4 text-[#019230]" stroke="#019230" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

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
                <Button variant="ghost" size="sm" className="px-4">
                  View Report
                </Button>
              </div>
            </div>
            <div className="h-0.5 bg-slate-200 w-full"></div>
            
            <TabsContent value="user" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ActiveUsersCard />
                <CompletedCard />
                {/* Add more cards as needed */}
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ActiveUsersCard />
                <CompletedCard />
                {/* Add more cards as needed */}
              </div>
            </TabsContent>
            
            <TabsContent value="course" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ActiveUsersCard />
                <CompletedCard />
                {/* Add more cards as needed */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>;
};

export default ActivitiesCard;
