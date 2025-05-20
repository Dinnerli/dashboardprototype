
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Trophy, Medal } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";

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
    <Card className="w-full h-[450px] animate-slide-in-up shadow-sm overflow-hidden" style={{
      animationDelay: '0.4s'
    }}>
      <CardHeader title="Rewards" rightContent={<ViewReportButton />} />
      <div className="flex flex-col h-full">
       

        {/* Tabs section - converted to using shadcn Tabs */}
        <Tabs 
          defaultValue="certificates" 
          value={selectedTab} 
          onValueChange={(value) => setSelectedTab(value as 'certificates' | 'rank')}
          className="w-full"
        >
          <TabsList className="flex bg-white border-b border-[#F5F6F8] rounded-none px-4 h-auto">
            <TabsTrigger 
              value="certificates"
              className={`py-2 px-2 text-xs font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-[#338FFF] data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] transition-all duration-200`}
            >
              Certificates
            </TabsTrigger>
            <TabsTrigger 
              value="rank"
              className={`py-2 px-2 text-xs font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-[#338FFF] data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] transition-all duration-200`}
            >
              Rank Lobby
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="m-0  overflow-y-auto">
            {/* Certificate list */}
            <div className="flex flex-col w-full h-full">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={num} className="flex py-2 px-4 justify-between items-center border-b border-[#F5F6F8]">
                  <div className="flex h-9 justify-center items-center pr-2">
                    <span className="w-2 text-[#4F5A69] text-center text-xs">{num}</span>
                  </div>
                  <div className="flex h-9 flex-col justify-center items-start flex-1">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-xs">Marketing Certification</span>
                    <span className="w-full text-[#8C9BAC] text-[10px]">End date: 18-03-26</span>
                  </div>
                  <div className="flex justify-end items-center gap-1">
                    <div className="flex flex-col justify-center items-end">
                      <span className="text-[#4F5A69] font-bold text-base">237</span>
                    </div>
                    <div className="flex justify-end items-center">
                      {index % 2 === 0 ? (
                        <>
                          <span className="text-[#00D764] text-right text-[10px]">40%</span>
                          <ArrowUp className="w-3 h-3 text-[#00D764]" />
                        </>
                      ) : (
                        <>
                          <span className="text-[#ED5158] text-right text-[10px]">40%</span>
                          <ArrowDown className="w-3 h-3 text-[#ED5158]" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rank" className="m-0  overflow-hidden">
            {/* Rank Lobby content with two sections */}
            <div className="flex h-full">
              {/* Left section - Rank levels list */}
              <div className="w-1/2 flex flex-col h-full overflow-y-auto">
                {rankData.map((rank) => (
                  <div
                    key={rank.title}
                    onClick={() => setActiveRank(rank.title)}
                    className={cn(
                      "flex py-3 px-4 justify-between items-center border-b border-[#F5F6F8] cursor-pointer transition-all duration-200",
                      activeRank === rank.title ? "bg-[#F9FAFC]" : ""
                    )}
                  >
                    <div className="flex items-center">
                      {/* Colored indicator line */}
                      <div 
                        className="w-1 h-8 mr-3 rounded-sm" 
                        style={{ backgroundColor: rank.color }}
                      ></div>
                      
                      {/* Rank title and score */}
                      <div className="flex flex-col">
                        <span className="text-[#8C9BAC] text-xs">{rank.title}</span>
                        <span className="text-[#4F5A69] font-bold text-base">{rank.score}</span>
                      </div>
                    </div>

                    {/* Change indicator */}
                    <div className="flex justify-end items-center">
                      {rank.change > 0 ? (
                        <div className="flex items-center">
                          <span className="text-[#00D764] text-right text-[10px]">{Math.abs(rank.change)}%</span>
                          <ArrowUp className="w-3 h-3 text-[#00D764]" />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="text-[#ED5158] text-right text-[10px]">{Math.abs(rank.change)}%</span>
                          <ArrowDown className="w-3 h-3 text-[#ED5158]" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right section - Donut chart with medal */}
              <div className="w-1/2 flex items-center justify-center">
                <div className="relative w-40 h-40">
                  {/* SVG Donut chart with dynamic segments */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F5F6F8" strokeWidth="8" />
                    
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
