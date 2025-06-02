import { Card, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from '@mui/material';
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { useIsMobile } from "@/hooks/use-mobile";

const LeaderboardCard = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const leaders = [
    { 
      id: 1, 
      name: "James de Silva", 
      email: "james@getkayup.com", 
      points: 237, 
      position: 1
    },
    { 
      id: 2, 
      name: "Lakshika Matthegoda", 
      email: "lakshika@getkayup.com", 
      points: 237, 
      position: 2
    },
    { 
      id: 3, 
      name: "Nuwan Gajanyaka", 
      email: "nuwan@getkayup.com", 
      points: 237, 
      position: 3
    },
    { 
      id: 4, 
      name: "Hansika Didugoda", 
      email: "hansika@getkayup.com", 
      points: 237, 
      position: 4
    },
    { 
      id: 5, 
      name: "James de Silva", 
      email: "james@getkayup.com", 
      points: 237, 
      position: 5
    }
  ];
  
  return (
   <Card className="w-auto h-full min-h-[555px] p-6 animate-slide-in-up bg-white overflow-hidden" 
    style={{ animationDelay: '0.4s' }}>
       <CardHeader title="Activity Overview" rightContent={useIsMobile ? null : <ViewReportButton />} />
    
      {/* Leaders list - using flex-1 to take remaining space */}
      <div className="flex-1 overflow-y-auto">
        {leaders.map((leader, index) => (
          <div 
            key={leader.id} 
            className={`flex py-2 sm:py-3 px-2 sm:px-3 md:px-4 items-center border-b border-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#F8F9FA] ${
              selectedUser === leader.id ? 'bg-[#F5F6F8] border-l-4 border-l-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedUser(selectedUser === leader.id ? null : leader.id)}
          >
            {/* Avatar */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 mr-2 sm:mr-3 overflow-hidden">
              <img 
                src={`https://i.pravatar.cc/150?img=${leader.id + 10}`} 
                alt={leader.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* User info - using flex-1 to take available width */}
            <div className="flex flex-col flex-1">
              <span className={`text-xs font-semibold transition-colors duration-200 ${
                selectedUser === leader.id ? 'text-[#338FFF]' : 'text-[#4F5A69]'
              }`}>{leader.name}</span>
              <span className="text-[9px] sm:text-[10px] text-[#8C9BAC]">{leader.email}</span>
            </div>
            
            {/* Points - using ml-auto to push to right */}
            <div className="flex items-center ml-auto">
              <span className="text-sm sm:text-base font-semibold text-[#4F5A69] mr-2 sm:mr-3">
                {leader.points} <span className="text-[9px] sm:text-[10px] font-normal">Points</span>
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-[#F8F9FA] rounded">
                <Award size={isMobile ? 12 : 14} className="text-[#8C9BAC]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeaderboardCard;
