import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";
import TrendIndicator from "./common/TrendIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import rewardsData from "@/Data/RewardsCard.json";
import styles from './RewardsCard.module.css';


type RankLobbyItem = {
  name: string;
  trend: number;
  rising: boolean;
  image: string;
};

// Fixed colors for rank segments
const rankColors = [
  "#00D764", // Blue
  "#ED5158", // Pink
  "#338FFF", // Purple
  "#FDB533", // Green
  "#003072", // Amber
  "#A22DDC"  // Deep Orange
];

// Helper function to get color with opacity
const getColorWithOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const RewardsCard = () => {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'rank'>('certificates');
  const [activeRank, setActiveRank] = useState<string>(rewardsData.rankLobby[0].name);
  const isMobile = useIsMobile();

  // Function to get the image for the rank
  const getRankImage = (rank: RankLobbyItem) => {
    return <img src={rank.image} alt={rank.name} className="w-36 h-36 object-contain drop-shadow-md" />;
  };

  // Calculate segment angles for the donut chart
  const segmentAngle = 360 / rewardsData.rankLobby.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
  };

  // Function to get rank indicator color with opacity
  const getRankIndicatorColor = (index: number, isActive: boolean) => {
    return isActive ? rankColors[index] : getColorWithOpacity(rankColors[index], 0.2);
  };

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
              {rewardsData.certificates.map((cert, index) => (
                <div key={cert.name} className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
                  <div className="flex h-full justify-center items-center pr-2">
                    <span className="w-2 p-2.5 text-[#4F5A69] text-center text-xs">{index + 1}</span>
                  </div>
                  <div className="flex py-2.5 px-2.5  flex-col justify-center items-start flex-1">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm font-medium">
                      {cert.name}
                    </span>
                    <span className="w-full text-[#8C9BAC] text-xs pt-1">
                      End date: {formatDate(cert.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-end items-center px-2.5 gap-2">
                    <div className="flex flex-col justify-end items-end">
                      <span className="text-[#4F5A69] font-bold text-2xl">{cert.value}</span>
                    </div>
                    <div className="flex justify-end items-end">
                      <TrendIndicator value={`${Math.abs(cert.trend)}%`} isPositive={cert.rising} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rank" className="mt-4 overflow-hidden">
            <div className="flex h-full">
              {/* Left section - Rank levels list */}
              <div className="w-[42%] flex flex-col h-full overflow-y-auto gap-2">
                {rewardsData.rankLobby.map((rank, index) => (
                  <div
                    key={rank.name}
                    onClick={() => setActiveRank(rank.name)}
                    className={cn(
                      "flex px-2 py-1 justify-between items-center cursor-pointer transition-all duration-200 rounded-md",
                      activeRank === rank.name ? "bg-[#F2F3F5]" : ""
                    )}
                  >
                    <div className="flex items-center">
                      {/* Colored indicator line */}
                      <div 
                        className="w-0.5 h-8 mr-3 rounded-sm transition-colors duration-300"
                        style={{ backgroundColor: getRankIndicatorColor(index, activeRank === rank.name) }}
                      />
                      
                      {/* Rank title and value */}
                      <div className="flex px-1 flex-col">
                        <span className={cn(
                          "text-[#8C9BAC] text-xs font-medium",
                          activeRank === rank.name ? "text-[#338FFF]" : ""
                        )}>
                          {rank.name}
                        </span>
                        <span className="text-[#4F5A69] font-bold text-xl mt-0.25">{Math.abs(rank.trend)}</span>
                      </div>
                    </div>

                    {/* Change indicator */}
                    <div className="flex justify-end items-end self-end">
                      <TrendIndicator value={`${Math.abs(rank.trend)}%`} isPositive={rank.rising} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right section - Donut chart with rank image */}
              <div className="w-[58%] flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* SVG Donut chart with dynamic segments */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="transparent" />
                    
                    {rewardsData.rankLobby.map((rank, index) => {
                      const startAngle = index * segmentAngle - 90;
                      const endAngle = (index + 1) * segmentAngle - 90;
                      
                      // Convert angles to coordinates
                      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                      
                      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                      const path = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
                      
                      return (
                        <path 
                          key={rank.name}
                          d={path}
                          fill={activeRank === rank.name ? rankColors[index] : getColorWithOpacity(rankColors[index], 0.2)}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                    
                    {/* Inner circle (white space) */}
                    <circle cx="50" cy="50" r="32" fill="white" />
                  </svg>
                  
                  {/* Rank image in center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center">
                    {getRankImage(rewardsData.rankLobby.find(r => r.name === activeRank)!)}
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
