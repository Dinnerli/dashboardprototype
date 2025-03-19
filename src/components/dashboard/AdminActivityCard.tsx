
import { Card } from "@/components/ui/card";
import { Info, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const AdminActivityCard = () => {
  const [animatedBars, setAnimatedBars] = useState(Array(6).fill(0));

  useEffect(() => {
    // Animate bars one after another with a delay
    const animateCharts = () => {
      const newHeights = [];
      const interval = setInterval(() => {
        newHeights.push([50, 50, 50]); // Reduced heights for each bar section
        setAnimatedBars([...newHeights, ...Array(6 - newHeights.length).fill(0)]);
        
        if (newHeights.length === 6) {
          clearInterval(interval);
        }
      }, 150);
      
      return () => clearInterval(interval);
    };
    
    const timeout = setTimeout(animateCharts, 500); // Start animation after component mount
    return () => clearTimeout(timeout);
  }, []);

  return <Card className="w-full h-[555px] animate-slide-in-up shadow-sm overflow-hidden" style={{
    animationDelay: '0.4s'
  }}>
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-bold text-lg text-[#233143]">Admin Activity</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.1975 7.57495L4.5 13.5" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-[#8C9BAC] border-b border-[#8C9BAC]">View Report</span>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#CDD1D7]"></div>

      <div className="px-4 py-3 flex flex-col h-[480px]">
        {/* Stats section */}
        <div className="flex items-center justify-between w-full mb-2">
          {/* Course Assigned */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#003072]"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8C9BAC]">Course Assigned</span>
                  <Info className="w-2.5 h-2.5 text-[#8C9BAC]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-[10px] text-[#00D764]">40%</span>
                    <ArrowUp className="w-3 h-3 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Creation */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#F2F3F5]"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8C9BAC]">User Creation</span>
                  <Info className="w-2.5 h-2.5 text-[#8C9BAC]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-[10px] text-[#00D764]">40%</span>
                    <ArrowUp className="w-3 h-3 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Group Assigned */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#CDE4FF]"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8C9BAC]">Group Assigned</span>
                  <Info className="w-2.5 h-2.5 text-[#8C9BAC]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-[10px] text-[#00D764]">40%</span>
                    <ArrowUp className="w-3 h-3 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart section */}
        <div className="w-full h-[360px] mt-3">
          <div className="w-full flex flex-col">
            {/* Bar chart with animation */}
            <div className="flex justify-between items-end h-[230px] mb-2">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="flex items-end justify-center h-full">
                  <div className="w-6 flex flex-col items-center">
                    <div 
                      className="w-[8px] rounded-full bg-[#CDE4FF] transition-all duration-1000 ease-out"
                      style={{ 
                        height: animatedBars[index] ? `${animatedBars[index][0]}px` : '0px',
                        marginTop: 'auto'
                      }}
                    ></div>
                    <div 
                      className="w-[8px] rounded-full bg-[#338FFF] transition-all duration-1000 ease-out"
                      style={{ 
                        height: animatedBars[index] ? `${animatedBars[index][1]}px` : '0px',
                        transitionDelay: '0.2s'
                      }}
                    ></div>
                    <div 
                      className="w-[8px] rounded-full bg-[#003072] transition-all duration-1000 ease-out"
                      style={{ 
                        height: animatedBars[index] ? `${animatedBars[index][2]}px` : '0px',
                        transitionDelay: '0.4s'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart x-axis */}
            <div className="h-px w-full bg-[#CDD1D7] mb-1"></div>
            <div className="flex justify-between w-full">
              <span className="text-[9px] text-[#CDD1D7]">Oct</span>
              <span className="text-[9px] text-[#CDD1D7]">Nov</span>
              <span className="text-[9px] text-[#CDD1D7]">Dec</span>
              <span className="text-[9px] text-[#CDD1D7]">Jan</span>
              <span className="text-[9px] text-[#CDD1D7]">Feb</span>
              <span className="text-[9px] text-[#CDD1D7]">Mar</span>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};

export default AdminActivityCard;
