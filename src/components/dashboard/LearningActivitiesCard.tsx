
import { Card } from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";
import { useEffect, useState } from "react";

const LearningActivitiesCard = () => {
  // Animation state for the circle segments
  const [animate, setAnimate] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Progress data for the circles
  const circleData = [
    { id: 'library', name: 'Library', progress: 20, color: '#E5E7EA' },
    { id: 'exams', name: 'Exams', progress: 35, color: '#E5E7EA' },
    { id: 'ilt-vilt', name: 'ILT/VILT', progress: 50, color: '#E5E7EA' },
    { id: 'courses', name: 'Courses', progress: 65, colors: ['#003072', '#338FFF', '#CDE4FF'] }
  ];

  // Calculate stroke dasharray and dashoffset for circle segments
  const calculateCircleProps = (progress, index, isActive = false) => {
    const radius = 100 - index * 30; // Different radius for each circle
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference * (1 - (animate ? progress / 100 : 0));
    
    return {
      r: radius,
      strokeDasharray,
      strokeDashoffset,
      style: {
        transition: `stroke-dashoffset 1.5s ease-in-out ${index * 0.2}s`,
      }
    };
  };

  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6 border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="h3 text-[#233143] font-poppins">Learning Activities</h3>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex items-center h-[30px] gap-2.5">
              <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
                <span className="text-[10px] text-[#8C9BAC] font-poppins">Filter by:</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-[10px] text-[#8C9BAC] font-poppins">Last 60 Days</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-[10px] text-[#8C9BAC] font-poppins">All</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
                <span className="text-[10px] text-[#4F5A69] font-poppins text-center">View Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Chart - Updated to match the image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-[400px] h-[400px]">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background circles */}
                {circleData.map((item, index) => (
                  <circle
                    key={`bg-${item.id}`}
                    cx="200"
                    cy="200"
                    r={100 - index * 30}
                    stroke={item.color}
                    strokeWidth="20"
                    fill="none"
                    opacity={0.3}
                  />
                ))}
                
                {/* Progress circles */}
                {circleData.map((item, index) => {
                  if (item.id !== 'courses') {
                    const circleProps = calculateCircleProps(item.progress, index);
                    return (
                      <circle
                        key={`progress-${item.id}`}
                        cx="200"
                        cy="200"
                        r={circleProps.r}
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={circleProps.strokeDasharray}
                        strokeDashoffset={circleProps.strokeDashoffset}
                        fill="none"
                        transform="rotate(-90 200 200)"
                        style={circleProps.style}
                      />
                    );
                  }
                  return null;
                })}
                
                {/* Courses - special treatment with gradient */}
                {(() => {
                  const courseItem = circleData[3];
                  const circleProps = calculateCircleProps(courseItem.progress, 3, true);
                  
                  // Create 3 segments for the courses circle
                  const colors = courseItem.colors;
                  const segmentLengths = [0.3, 0.5, 0.2]; // Proportions of each segment
                  
                  return colors.map((color, i) => {
                    const segmentStart = segmentLengths.slice(0, i).reduce((a, b) => a + b, 0) * courseItem.progress;
                    const segmentEnd = segmentLengths.slice(0, i + 1).reduce((a, b) => a + b, 0) * courseItem.progress;
                    
                    const segmentLength = (segmentEnd - segmentStart) / 100 * circleProps.strokeDasharray;
                    const offset = (1 - segmentEnd / 100) * circleProps.strokeDasharray;
                    const dashArray = `${segmentLength} ${circleProps.strokeDasharray - segmentLength}`;
                    
                    return (
                      <circle
                        key={`course-segment-${i}`}
                        cx="200"
                        cy="200"
                        r={circleProps.r}
                        stroke={color}
                        strokeWidth="20"
                        strokeDasharray={dashArray}
                        strokeDashoffset={animate ? offset : circleProps.strokeDasharray}
                        fill="none"
                        transform="rotate(-90 200 200)"
                        style={{
                          transition: `stroke-dashoffset 1.5s ease-in-out ${0.6 + i * 0.2}s`,
                        }}
                      />
                    );
                  });
                })()}
                
                {/* Text labels */}
                {circleData.map((item, index) => {
                  const yPosition = 40 + index * 30;
                  const textColor = item.id === 'courses' ? '#338FFF' : '#8C9BAC';
                  const fontWeight = item.id === 'courses' ? '600' : 'normal';
                  
                  return (
                    <text 
                      key={`text-${item.id}`}
                      x="200" 
                      y={yPosition} 
                      textAnchor="middle" 
                      fill={textColor}
                      fontFamily="Poppins" 
                      fontSize="16"
                      fontWeight={fontWeight}
                      className={animate ? "animate-fade-in" : "opacity-0"}
                      style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                    >
                      {item.name}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="mb-4 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-[20px] font-bold text-[#338FFF] w-full">Courses</h4>
            </div>
            
            {/* First row */}
            <div className="flex flex-wrap gap-4 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#8C9BAC]">Uploads</span>
                      <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#4F5A69]">50</span>
                      <div className="flex items-center">
                        <span className="text-sm text-[#00D764]">40%</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-[#F2F3F5]"></div>
                
                <div className="flex items-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#8C9BAC]">Time Spent</span>
                      <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#4F5A69]">25</span>
                      <div className="flex items-center">
                        <span className="text-sm text-[#ED5158]">40%</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Other stats */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#CDE4FF]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Assigned</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">48</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#00D764]">25.3%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#338FFF]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Completed</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">63</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#00D764]">14%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#003072]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Passed</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">37</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#ED5158]">31%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LearningActivitiesCard;
