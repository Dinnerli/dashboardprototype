
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

const LeaderboardCard = () => {
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
    <Card className="w-full h-full animate-slide-in-up shadow-sm overflow-hidden flex flex-col" style={{ animationDelay: '0.4s' }}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#E5E7EA]">
        <h3 className="font-bold text-lg text-[#233143]">Leaderboard</h3>
        <div className="flex items-center gap-2">
          {/* User icon */}
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#8C9BAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#8C9BAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Filter icon */}
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.4 2.1H18.6C19.7 2.1 20.6 3 20.6 4.1V6.3C20.6 7.1 20.1 8.1 19.6 8.6L14.3 13.2C13.7 13.7 13.3 14.7 13.3 15.5V19.5C13.3 20.1 12.9 20.9 12.4 21.2L11 22.1C9.6 22.9 7.8 21.9 7.8 20.2V15.4C7.8 14.7 7.4 13.8 7 13.3L2.9 9C2.4 8.5 2 7.6 2 7V4.2C2 3 2.9 2.1 4 2.1H5.5H5.4Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* View Report link */}
          <div className="flex items-center border-b border-[#8C9BAC]">
            <span className="text-xs text-[#8C9BAC]">View Report</span>
          </div>
        </div>
      </div>
      
      {/* Leaders list - using flex-1 to take remaining space */}
      <div className="flex-1 overflow-y-auto">
        {leaders.map((leader, index) => (
          <div key={leader.id} className="flex py-3 px-4 items-center border-b border-[#F2F3F5]">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
              <img 
                src={`https://i.pravatar.cc/150?img=${leader.id + 10}`} 
                alt={leader.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* User info - using flex-1 to take available width */}
            <div className="flex flex-col flex-1">
              <span className="text-xs font-semibold text-[#4F5A69]">{leader.name}</span>
              <span className="text-[10px] text-[#8C9BAC]">{leader.email}</span>
            </div>
            
            {/* Points - using ml-auto to push to right */}
            <div className="flex items-center ml-auto">
              <span className="text-base font-semibold text-[#4F5A69] mr-3">{leader.points} <span className="text-[10px] font-normal">Points</span></span>
              <div className="w-6 h-6 flex items-center justify-center bg-[#F8F9FA] rounded">
                <Award size={14} className="text-[#8C9BAC]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeaderboardCard;
