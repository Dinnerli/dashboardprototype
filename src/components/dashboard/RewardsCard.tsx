import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Trophy, Medal } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";
import TrendIndicator from "./common/TrendIndicator";
import { useIsMobile } from "@/hooks/use-mobile";

// Rank data for the Rank Lobby tab
type Rank = {
  title: string;
  score: number;
  change: number;
  color: string;
  brightColor: string;
};

const rankData: Rank[] = [
  { title: "Rookie", score: 237, change: 40, color: "#00D764", brightColor: "#00FF78" },
  { title: "Chaser", score: 237, change: 40, color: "#FFA1C0", brightColor: "#FF85AA" },
  { title: "Warrior", score: 237, change: 40, color: "#A37CFD", brightColor: "#B394FF" },
  { title: "Veteran", score: 237, change: -40, color: "#63B0FF", brightColor: "#52A0FF" },
  { title: "Elite", score: 237, change: 40, color: "#FFC554", brightColor: "#FFB42A" },
  { title: "Master", score: 237, change: -40, color: "#FF9A54", brightColor: "#FF8A3A" }
];

const RewardsCard = () => {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'rank'>('certificates');
  const [activeRank, setActiveRank] = useState<string>("Rookie");
  const isMobile = useIsMobile();

  // Function to get the medal icon based on rank
  const getMedalIcon = (rank: string) => {
    switch (rank) {
      case "Master":
      case "Elite":
        return <Trophy size={36} className="text-amber-400 drop-shadow-md" />;
      default:
        return <Medal size={36} className="text-blue-400 drop-shadow-md" />;
    }
  };

  // Calculate segment angles for the donut chart
  const segmentAngle = 360 / rankData.length;

  return (
   <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[555px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
    style={{ animationDelay: '0.4s' }}>
       <CardHeader title="Rewards" rightContent={isMobile ? null : <ViewReportButton />} />
   
   
   <div className="flex flex-col h-full">
       

        {/* Tabs section - converted to using shadcn Tabs */}
        <Tabs 
          defaultValue="certificates" 
          value={selectedTab} 
          onValueChange={(value) => setSelectedTab(value as 'certificates' | 'rank')}
          className="w-full"
        >
          <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
            <TabsTrigger 
              value="certificates"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {selectedTab === "certificates" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Certificates
            </TabsTrigger>
            <TabsTrigger 
              value="rank"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {selectedTab === "rank" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Rank Lobby
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="m-0 overflow-y-auto">
            {/* Certificate list */}
            <div className="flex flex-col w-full h-full">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={num} className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
                  <div className="flex h-full justify-center items-center pr-2">
                    <span className="w-2 p-2.5 text-[#4F5A69] text-center text-xs">{num}</span>
                  </div>
                  <div className="flex py-2.5 px-2.5  flex-col justify-center items-start flex-1">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm font-medium">Marketing Certification</span>
                    <span className="w-full text-[#8C9BAC] text-xs pt-1">End date: 18-03-26</span>
                  </div>
                  <div className="flex justify-end items-center px-2.5 gap-2">
                    <div className="flex flex-col justify-end items-end">
                      <span className="text-[#4F5A69] font-bold text-2xl">237</span>
                    </div>
                    <div className="flex justify-end items-end">
                      <TrendIndicator value="40%" isPositive={index % 2 === 0} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rank" className="mt-4  overflow-hidden">
            {/* Rank Lobby content with two sections */}
            <div className="flex h-full">
              {/* Left section - Rank levels list */}
              <div className="w-[40%] flex flex-col h-full overflow-y-auto gap-3">
                {rankData.map((rank) => (
                  <div
                    key={rank.title}
                    onClick={() => setActiveRank(rank.title)}
                    className={cn(
                      "flex px-2 py-1 justify-between items-center  cursor-pointer transition-all duration-200 rounded-md",
                      activeRank === rank.title ? "bg-[#F2F3F5]" : ""
                    )}
                  >
                    <div className="flex items-center">
                      {/* Colored indicator line */}
                      <div 
                        className="w-1 h-8 mr-3 rounded-sm" 
                        style={{ backgroundColor: rank.color }}
                      ></div>
                      
                      {/* Rank title and score */}
                      <div className="flex px-1 flex-col">
                        <span className={cn("text-[#8C9BAC] text-xs font-medium", activeRank === rank.title ? "text-[#338FFF]" : "")}>{rank.title}</span>
                        <span className="text-[#4F5A69] font-bold  text-xl">{rank.score}</span>
                      </div>
                    </div>

                    {/* Change indicator */}
                    <div className="flex justify-end items-end self-end">
                      <TrendIndicator value={Math.abs(rank.change) + '%'} isPositive={rank.change > 0} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right section - Donut chart with medal */}
              <div className="w-[60%] flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* SVG Donut chart with dynamic segments */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="transparent"  />
                    
                    {/* Render segments for each rank */}
                    {rankData.map((rank, index) => {
                      const startAngle = index * segmentAngle - 90; // Start at top
                      const endAngle = (index + 1) * segmentAngle - 90;
                      
                      // Convert angles to coordinates
                      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                      
                      // Large arc flag is 0 for arcs less than 180 degrees, 1 for arcs greater than 180
                      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                      
                      // Create path for segment
                      const path = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
                      
                      return (
                        <path 
                          key={rank.title}
                          d={path}
                          fill={activeRank === rank.title ? rank.brightColor : rank.color}
                          opacity={activeRank === rank.title ? 1 : 0.4}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                    
                    {/* Inner circle (white space) */}
                    <circle cx="50" cy="50" r="32" fill="white" />
                  </svg>
                  
                  {/* Medal icon in center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center">
                    {getMedalIcon(activeRank)}
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

export default RewardsCard;
