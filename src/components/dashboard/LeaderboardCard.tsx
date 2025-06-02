import { Card, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import React, { useState } from "react";
import { useMediaQuery } from '@mui/material';
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { useIsMobile } from "@/hooks/use-mobile";
import leaderboardData from "@/Data/LeaderBoard.json";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";


interface Leader {
  id: number;
  name: string;
  email: string;
  points: number;
  profileImage: string;
  position: number;
}

const LeaderboardCard = () => {

  const isMobile = useIsMobile();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Get all leaders
  const allLeaders: Leader[] = leaderboardData.Leaderboard;
  // Get only the first 5 leaders
  const leaders: Leader[] = allLeaders.slice(0, 5);

  // Filter leaders by search
  const filteredLeaders = showSearch && search
    ? allLeaders.filter(
        (leader) =>
          leader.name.toLowerCase().includes(search.toLowerCase()) ||
          leader.email.toLowerCase().includes(search.toLowerCase())
      )
    : leaders;
    return (
   <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[555px]'} p-6 animate-slide-in-up bg-white flex flex-col`} 
    style={{ animationDelay: '0.4s' }}>
      
      {/* Header - Fixed at top */}
       <CardHeader
  title="Leaderboard"
  rightContent={
    <div className="flex items-center gap-2">
      <button
        className={`rounded-lg p-2 transition ${showSearch ? 'bg-[#F5F6F8]' : 'bg-transparent'}`}
        onClick={() => setShowSearch((v) => !v)}
        aria-label="Search"
      >
        <Search className={`w-5 h-5 ${showSearch ? 'text-[#338FFF]' : 'text-black'}`} />
      </button>
      {!isMobile && <ViewReportButton />}
    </div>
  }
/>

{/* Search bar - Fixed below header when visible */}
{showSearch && (
<div className="relative flex items-center mt-2 mb-4 flex-shrink-0">
  <Input
    className="pl-4 pr-16 py-2 rounded-lg bg-[#F5F6F8] text-[#4F5A69] placeholder:text-[#8C9BAC] border-none focus:outline-none !focus:outline-none focus:ring-0 !focus:ring-0 focus:border-none transition w-full"
    placeholder="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  
  {/* Close Button - styled like your image */}
  <button
    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md transition"
    onClick={() => { setShowSearch(false); setSearch(""); }}
    aria-label="Close search"
  >
    <X className="w-2.5 h-2.5 text-white" />
  </button>

  {/* Search Icon */}
  <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C9BAC]" />
</div>
)}

{/* Leaders list - Scrollable content area */}
<div className="flex-1 overflow-y-auto min-h-0 minimal-scrollbar">
  <div className="py-2.5 flex flex-col gap-2.5 transition-all duration-300">
    {filteredLeaders.map((leader, index) => (
          <div 
            key={leader.id} 
            className={`flex py-2.5 sm:py-2.5 px-2 sm:px-3 md:px-4 items-center border-b hover:bg-[#F5F6F8] hover:rounded-lg border-[#F5F6F8] cursor-pointer transition-all duration-200`}
            onMouseEnter={() => setHoveredId(leader.id)}
            onMouseLeave={() => setHoveredId(null)}
          >{/* Avatar */}
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-200 mr-2 sm:mr-3 overflow-hidden flex items-center justify-center flex-shrink-0">
              <img 
                src={leader.profileImage} 
                alt={leader.name} 
                className="w-full h-full object-cover"
              />
            </div>
              {/* User info - using flex-1 to take available width */}
            <div className="flex flex-col flex-1 min-w-0 px-2 sm:px-3 py-0.5 sm:py-1.5">
              <span className={`text-sm sm:text-base font-semibold transition-colors duration-200 truncate ${hoveredId === leader.id ? 'text-[#338FFF]' : 'text-[#4F5A69]'}`}>{leader.name}</span>
              <span className="text-[10px] sm:text-xs text-[#8C9BAC] truncate">{leader.email}</span>
            </div>
              {/* Points - using ml-auto to push to right */}            <div className="flex flex-col items-end ml-auto">
              <span className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${hoveredId === leader.id ? 'text-[#338FFF]' : 'text-[#4F5A69]'}`}>{leader.points.toLocaleString()}</span>
              <span className="text-[10px] sm:text-xs font-medium text-[#8C9BAC]">Points</span>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded ml-2 relative">
              <svg width={isMobile ? 30 : 35} height={isMobile ? 30 : 35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6284 13.4807C19.4942 12.2024 20 10.6603 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 10.5545 4.44338 12.0055 5.21057 13.2333L2.05686 18.6957C1.88357 18.9958 1.87805 19.3643 2.04226 19.6695C2.20648 19.9747 2.51701 20.1731 2.86297 20.1939L5.85952 20.3738L7.51356 22.8789C7.70452 23.1681 8.03162 23.3379 8.37805 23.3275C8.72447 23.3171 9.04081 23.1281 9.2141 22.8279L12.0008 18.0013L14.634 22.5622C14.8073 22.8623 15.1236 23.0513 15.47 23.0617C15.8165 23.0721 16.1436 22.9024 16.3345 22.6132L17.9071 20.2314L20.7561 20.0604C21.102 20.0396 21.4126 19.8412 21.5768 19.536C21.741 19.2308 21.7355 18.8623 21.5622 18.5622L18.6284 13.4807ZM12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15ZM13.6355 16.8327L15.557 20.1609L16.5136 18.7122C16.687 18.4495 16.974 18.2838 17.2882 18.2649L19.0211 18.1609L17.2282 15.0554C16.2192 15.9273 14.9901 16.5513 13.6355 16.8327ZM4.59792 18.2944L6.57139 14.8763C7.61642 15.8422 8.91965 16.5328 10.3659 16.833L8.29107 20.4267L7.25305 18.8545C7.07962 18.5919 6.79264 18.4262 6.47845 18.4073L4.59792 18.2944Z" 
                  fill="#4F5A69"></path> 
                </g>
              </svg>
              
              <span className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] sm:text-[10px] font-semibold text-[#8C9BAC]">
                {leader.position}
              </span>            </div>
          </div>
        ))}
      </div>
    </div>
    </Card>
  );
};

export default LeaderboardCard;
