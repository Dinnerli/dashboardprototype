
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, ArrowUp, ArrowDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Updated data to better match the screenshot
const data = [
  { name: "Jan", active: 200, new: 370 },
  { name: "Feb", active: 210, new: 30 },
  { name: "Mar", active: 320, new: 420 },
  { name: "Apr", active: 30, new: 150 },
  { name: "May", active: 450, new: 240 },
  { name: "June", active: 150, new: 300 },
];

const StatIndicator = ({ value, isPositive }: { value: string, isPositive: boolean }) => {
  return (
    <div className="flex items-center justify-end">
      <span className={`text-sm ${isPositive ? 'text-[#00D764]' : 'text-[#ED5158]'}`}>
        {value}
      </span>
      {isPositive ? (
        <ArrowUp className="w-4 h-4 text-[#00D764]" stroke="#00D764" strokeWidth={1.5} />
      ) : (
        <ArrowDown className="w-4 h-4 text-[#ED5158]" stroke="#ED5158" strokeWidth={1.5} />
      )}
    </div>
  );
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive, 
  isPositive 
}: { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  isPositive: boolean;
}) => {
  return (
    <div className={`flex items-center gap-2.5 p-2.5 rounded-lg ${isActive ? 'bg-[#F2F3F5]' : ''}`}>
      <div className="flex flex-col items-center justify-center p-2.5">
        <div 
          className={`w-0.5 h-[35px] ${isActive ? 'bg-[#338FFF]' : 'bg-[#CDD1D7]'}`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 px-2.5">
          <span className={`text-base font-bold ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}>
            {title}
          </span>
          <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
        <div className="flex items-center px-2.5">
          <div>
            <span className="text-2xl font-bold text-[#4F5A69]">{value}</span>
          </div>
          <div className="w-[66px] flex justify-end items-center">
            <StatIndicator value={percentage} isPositive={isPositive} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivitiesCard = () => {
  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6 border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="text-[22px] font-bold text-[#233143] font-poppins">Activity Overview</h3>
          </div>
          <div className="flex gap-2.5">
            <div className="flex items-center h-[30px] gap-2.5">
              <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
                <span className="text-xs text-[#8C9BAC] font-poppins">Filter by:</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-xs text-[#8C9BAC] font-poppins">Last 60 Days</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-xs text-[#8C9BAC] font-poppins">All</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
            </div>
            <div className="flex items-center p-2.5">
              <div className="flex items-center justify-center gap-1.5 px-0 py-1.5 border border-[#4F5A69]">
                <span className="text-xs text-[#4F5A69] font-poppins text-center">View Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-5 px-2.5 w-full bg-white overflow-x-auto">
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5 border-b-4 border-[#338FFF]">
            <span className="text-[#338FFF] text-base font-bold font-poppins">User Activity</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
            <span className="text-[#8C9BAC] text-base font-bold font-poppins">Usage Activities</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
            <span className="text-[#8C9BAC] text-base font-bold font-poppins">Course Activities</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          {/* Stats Row */}
          <div className="flex items-center gap-5 p-2.5 h-20 w-full flex-wrap">
            <ActivityStat 
              title="Active Users" 
              value="237" 
              percentage="40%" 
              isActive={true}
              isPositive={true}
            />
            <ActivityStat 
              title="New Users" 
              value="8" 
              percentage="40%" 
              isActive={false}
              isPositive={false}
            />
          </div>

          {/* Chart - Moved below the stats row */}
          <div className="p-2.5 w-full">
            <div className="h-[287px] relative w-full">
              {/* Y-axis labels */}
              <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none">
                {[500, 400, 300, 200, 100, 0].map((value, index) => (
                  <div key={index} className="flex justify-start items-center gap-1.5 h-[16.67%]">
                    <span className="text-[10px] text-[#CDD1D7] font-poppins w-8 text-right mr-1">{value}</span>
                    <div className="w-full h-[0.5px] bg-[#CDD1D7] opacity-70"></div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="absolute top-0 left-0 w-full h-full pl-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#338FFF" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#338FFF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CDD1D7" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#CDD1D7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#CDD1D7" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#CDD1D7' }}
                      padding={{ left: 30, right: 30 }}
                    />
                    <YAxis hide />
                    <Area 
                      type="monotone" 
                      dataKey="new" 
                      stroke="#CDD1D7" 
                      strokeWidth={2}
                      fill="url(#colorNew)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#338FFF" 
                      strokeWidth={2}
                      fill="url(#colorActive)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCard;
