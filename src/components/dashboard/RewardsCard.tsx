
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Trophy, Medal } from "lucide-react";
import { useState } from "react";
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
      <div className="flex flex-col h-full">
        <div className="flex px-4 py-4 justify-between items-center border-b border-[#CDD1D7]">
          <div className="flex items-center">
            <CardTitle>Rewards</CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Updated Filter icon */}
            <div className="flex items-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.04993 1.57495H13.9499C14.7749 1.57495 15.4499 2.24995 15.4499 3.07495V4.72495C15.4499 5.32495 15.0749 6.07495 14.6999 6.44995L11.4749 9.29995C11.0249 9.67495 10.7249 10.425 10.7249 11.025V14.25C10.7249 14.7 10.4249 15.3 10.0499 15.525L8.99993 16.2C8.02493 16.8 6.67493 16.125 6.67493 14.925V10.95C6.67493 10.425 6.37493 9.74995 6.07493 9.37495L3.22493 6.37495C2.84993 5.99995 2.54993 5.32495 2.54993 4.87495V3.14995C2.54993 2.24995 3.22493 1.57495 4.04993 1.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.1975 1.57495L4.5 7.49995" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* View Report link */}
            <a href="/reports/rewards" className="text-xs text-[#8C9BAC] border-b border-[#8C9BAC] hover:text-[#338FFF] hover:border-[#338FFF] transition-all duration-200 cursor-pointer">
              View Report
            </a>
          </div>
        </div>

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

          <TabsContent value="certificates" className="m-0 h-[calc(100%-88px)] overflow-y-auto">
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

          <TabsContent value="rank" className="m-0 h-[calc(100%-88px)] overflow-hidden">
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
                    <circle cx="50" cy="50" r="26" fill="white" />
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
