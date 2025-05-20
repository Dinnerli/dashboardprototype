
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";

interface HighchartsCardProps {
  title?: string;
}

// Mock data for each learning category
const learningCategoryData = {
  library: {
    title: "Library",
    uploads: { value: 50, trend: 40, increasing: true },
    timeSpent: { value: 25, trend: 40, increasing: false },
    assigned: { value: 48, trend: 25.3, increasing: true },
    completed: { value: 63, trend: 14, increasing: true },
    enrolled: { value: 37, trend: 31, increasing: false }
  },
  exams: {
    title: "Exams",
    uploads: { value: 42, trend: 15, increasing: true },
    timeSpent: { value: 18, trend: 22, increasing: false },
    assigned: { value: 36, trend: 12.5, increasing: true },
    completed: { value: 29, trend: 8, increasing: true },
    enrolled: { value: 22, trend: 18, increasing: false }
  },
  iltvilt: {
    title: "ILT/VILT",
    uploads: { value: 35, trend: 28, increasing: true },
    timeSpent: { value: 40, trend: 15, increasing: true },
    assigned: { value: 55, trend: 33, increasing: true },
    completed: { value: 47, trend: 9, increasing: false },
    enrolled: { value: 50, trend: 22, increasing: true }
  },
  courses: {
    title: "Courses",
    uploads: { value: 65, trend: 32, increasing: true },
    timeSpent: { value: 30, trend: 18, increasing: false },
    assigned: { value: 72, trend: 45, increasing: true },
    completed: { value: 58, trend: 27, increasing: true },
    enrolled: { value: 43, trend: 12, increasing: false }
  }
};

const HighchartsCard = ({
  title = "Learning Activities"
}: HighchartsCardProps) => {
  // State for tracking which segment is active
  const [activeSegment, setActiveSegment] = useState<"library" | "exams" | "iltvilt" | "courses">("courses");
  
  // Control segment visibility states
  const [segments, setSegments] = useState({
    library: false,
    exams: false,
    iltvilt: false,
    courses: false
  });
  
  // Get the active data based on selected segment
  const activeData = learningCategoryData[activeSegment];

  // Click handler for segment selection
  const handleSegmentClick = (segment: "library" | "exams" | "iltvilt" | "courses") => {
    setActiveSegment(segment);
  };

  useEffect(() => {
    // Staggered animation to reveal each segment
    const timers = [
      setTimeout(() => setSegments(prev => ({ ...prev, library: true })), 300),
      setTimeout(() => setSegments(prev => ({ ...prev, exams: true })), 600),
      setTimeout(() => setSegments(prev => ({ ...prev, iltvilt: true })), 900),
      setTimeout(() => setSegments(prev => ({ ...prev, courses: true })), 1200)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <Card className="w-full h-[555px] shadow-sm animate-slide-in-up font-poppins px-6" style={{
      animationDelay: '0.4s'
    }}>
      <CardHeader title={title} rightContent={<ViewReportButton />}/>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Interactive Chart */}
          <div className="flex-1 flex justify-center items-center">
            <svg 
              width="400" 
              height="400" 
              viewBox="0 0 400 401" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="max-w-full h-auto"
            >
              {/* Library Ring - Outermost */}
              <path 
                d="M199.882 13.2917C236.927 13.2917 273.141 24.2659 303.943 44.8266C334.745 65.3872 358.752 94.6109 372.928 128.802C387.105 162.993 390.814 200.616 383.587 236.913C376.36 273.21 358.521 306.551 332.326 332.72C306.131 358.888 272.757 376.71 236.423 383.929C200.09 391.149 162.429 387.444 128.204 373.281C93.9788 359.119 64.726 335.136 44.1448 304.364C23.5637 273.593 12.5785 237.416 12.5786 200.408" 
                stroke={activeSegment === "library" ? "#338FFF" : "#E5E7EA"}
                strokeWidth="20" 
                strokeLinecap="round"
                style={{
                  opacity: segments.library ? "1" : "0",
                  strokeDasharray: "1000",
                  strokeDashoffset: segments.library ? "0" : "1000",
                  transition: "stroke-dashoffset 1.2s ease-out, opacity 0.3s ease-in, stroke 0.3s ease-in-out",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("library")}
              />
              <text 
                fill={activeSegment === "library" ? "#338FFF" : "#8C9BAC"}
                fontFamily="Poppins" 
                fontSize="16" 
                fontWeight="600" 
                letterSpacing="0em" 
                style={{ 
                  whiteSpace: "pre",
                  opacity: segments.library ? "1" : "0",
                  transition: "opacity 0.5s ease-out, fill 0.3s ease-in-out",
                  transitionDelay: "0.2s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("library")}
              >
                <tspan x="125.023" y="18.6">Library</tspan>
              </text>
              
              {/* Exams Ring */}
              <path 
                d="M199.882 46.0371C230.444 46.0371 260.32 55.0908 285.732 72.0534C311.144 89.0159 330.95 113.125 342.645 141.333C354.341 169.541 357.401 200.58 351.439 230.525C345.476 260.47 330.759 287.976 309.148 309.565C287.537 331.154 260.004 345.857 230.028 351.813C200.053 357.77 168.983 354.713 140.748 343.028C112.512 331.344 88.3782 311.558 71.3988 286.172C54.4193 260.786 45.3566 230.94 45.3567 200.408" 
                stroke={activeSegment === "exams" ? "#338FFF" : "#E5E7EA"}
                strokeWidth="20" 
                strokeLinecap="round"
                style={{
                  opacity: segments.exams ? "1" : "0",
                  strokeDasharray: "900",
                  strokeDashoffset: segments.exams ? "0" : "900",
                  transition: "stroke-dashoffset 1.1s ease-out, opacity 0.3s ease-in, stroke 0.3s ease-in-out",
                  transitionDelay: "0.2s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("exams")}
              />
              <text 
                fill={activeSegment === "exams" ? "#338FFF" : "#8C9BAC"}
                fontFamily="Poppins" 
                fontSize="16" 
                fontWeight="600" 
                letterSpacing="0em" 
                style={{ 
                  whiteSpace: "pre",
                  opacity: segments.exams ? "1" : "0",
                  transition: "opacity 0.5s ease-out, fill 0.3s ease-in-out",
                  transitionDelay: "0.4s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("exams")}
              >
                <tspan x="127.648" y="51.1">Exams</tspan>
              </text>
              
              {/* ILT/VILT Ring */}
              <path 
                d="M199.881 78.7825C223.961 78.7825 247.499 85.9157 267.521 99.2801C287.542 112.645 303.147 131.64 312.361 153.864C321.576 176.088 323.987 200.543 319.289 224.136C314.592 247.729 302.996 269.401 285.97 286.411C268.943 303.42 247.25 315.004 223.633 319.697C200.016 324.39 175.537 321.981 153.291 312.776C131.044 303.57 112.03 287.981 98.652 267.98C85.2743 247.978 78.134 224.463 78.134 200.408" 
                stroke={activeSegment === "iltvilt" ? "#338FFF" : "#E5E7EA"}
                strokeWidth="20" 
                strokeLinecap="round"
                style={{
                  opacity: segments.iltvilt ? "1" : "0",
                  strokeDasharray: "800",
                  strokeDashoffset: segments.iltvilt ? "0" : "800",
                  transition: "stroke-dashoffset 1s ease-out, opacity 0.3s ease-in, stroke 0.3s ease-in-out",
                  transitionDelay: "0.4s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("iltvilt")}
              />
              <text 
                fill={activeSegment === "iltvilt" ? "#338FFF" : "#8C9BAC"}
                fontFamily="Poppins" 
                fontSize="16" 
                fontWeight="600" 
                letterSpacing="0em" 
                style={{ 
                  whiteSpace: "pre",
                  opacity: segments.iltvilt ? "1" : "0",
                  transition: "opacity 0.5s ease-out, fill 0.3s ease-in-out",
                  transitionDelay: "0.6s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("iltvilt")}
              >
                <tspan x="119.913" y="83.6">ILT/VILT</tspan>
              </text>
              
              {/* Courses Ring - Split into three sections for progressive reveal */}
              <path 
                d="M199.883 111.528C217.48 111.528 234.681 116.741 249.312 126.507C263.943 136.273 275.346 150.154 282.08 166.395C288.814 182.636 290.576 200.507 287.143 217.748C283.71 234.989 275.237 250.826 262.794 263.256C250.352 275.686 234.499 284.151 217.24 287.581" 
                stroke={activeSegment === "courses" ? "#338FFF" : "#E5E7EA"}
                strokeWidth="20" 
                strokeLinecap="round"
                style={{
                  opacity: segments.courses ? "1" : "0",
                  strokeDasharray: "400",
                  strokeDashoffset: segments.courses ? "0" : "400",
                  transition: "stroke-dashoffset 0.9s ease-out, opacity 0.3s ease-in, stroke 0.3s ease-in-out",
                  transitionDelay: "0.6s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("courses")}
              />
              <path 
                d="M199.883 111.528C217.48 111.528 234.681 116.741 249.312 126.507C263.943 136.273 275.346 150.154 282.08 166.395" 
                stroke={activeSegment === "courses" ? "#CDE4FF" : "#E5E7EA"}
                strokeWidth="20" 
                strokeLinecap="round"
                style={{
                  opacity: segments.courses ? "1" : "0",
                  strokeDasharray: "200",
                  strokeDashoffset: segments.courses ? "0" : "200",
                  transition: "stroke-dashoffset 0.7s ease-out, opacity 0.3s ease-in, stroke 0.3s ease-in-out",
                  transitionDelay: "0.8s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("courses")}
              />
              <path 
                d="M199.883 111.528C217.48 111.528 234.681 116.741 249.312 126.507C263.943 136.273 275.346 150.154 282.08 166.395C288.814 182.636 290.576 200.507 287.143 217.748C283.71 234.989 275.236 250.826 262.794 263.256C250.351 275.686 234.498 284.151 217.24 287.581C199.982 291.01 182.093 289.25 165.836 282.523C149.579 275.796 135.684 264.404 125.908 249.787C116.132 235.171 110.914 217.987 110.914 200.408" 
                stroke={activeSegment === "courses" ? "#003072" : "#E5E7EA"}
                strokeWidth="20" 
                strokeLinecap="round"
                style={{
                  opacity: segments.courses ? "1" : "0",
                  strokeDasharray: "700",
                  strokeDashoffset: segments.courses ? "0" : "700",
                  transition: "stroke-dashoffset 1s ease-out, opacity 0.3s ease-in, stroke 0.3s ease-in-out",
                  transitionDelay: "0.8s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("courses")}
              />
              <text 
                fill={activeSegment === "courses" ? "#338FFF" : "#8C9BAC"}
                fontFamily="Poppins" 
                fontSize="16" 
                fontWeight="600" 
                letterSpacing="0em" 
                style={{ 
                  whiteSpace: "pre",
                  opacity: segments.courses ? "1" : "0",
                  transition: "opacity 0.5s ease-out, fill 0.3s ease-in-out",
                  transitionDelay: "1s",
                  cursor: "pointer"
                }}
                onClick={() => handleSegmentClick("courses")}
              >
                <tspan x="114.288" y="121.1">Courses</tspan>
              </text>
            </svg>
          </div>

          {/* Stats Section - updates based on selected segment */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="mb-4">
              <h4 className="text-[20px] font-bold text-[#338FFF]">{activeData.title}</h4>
            </div>
            
            {/* First row */}
            <div className="flex flex-wrap gap-4">
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
                      <span className="text-2xl font-bold text-[#4F5A69]">{activeData.uploads.value}</span>
                      <div className="flex items-center">
                        <span className={`text-sm ${activeData.uploads.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.uploads.trend}%</span>
                        {activeData.uploads.increasing ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-[#F5F6F8]"></div>
                
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
                      <span className="text-2xl font-bold text-[#4F5A69]">{activeData.timeSpent.value}</span>
                      <div className="flex items-center">
                        <span className={`text-sm ${activeData.timeSpent.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.timeSpent.trend}%</span>
                        {activeData.timeSpent.increasing ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key metrics that update based on selection */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#CDE4FF]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Assigned</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">{activeData.assigned.value}</span>
                    <div className="flex items-center">
                      <span className={`text-sm ${activeData.assigned.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.assigned.trend}%</span>
                      {activeData.assigned.increasing ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#338FFF]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Completed</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">{activeData.completed.value}</span>
                    <div className="flex items-center">
                      <span className={`text-sm ${activeData.completed.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.completed.trend}%</span>
                      {activeData.completed.increasing ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#003072]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Enrolled</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">{activeData.enrolled.value}</span>
                    <div className="flex items-center">
                      <span className={`text-sm ${activeData.enrolled.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.enrolled.trend}%</span>
                      {activeData.enrolled.increasing ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighchartsCard;
