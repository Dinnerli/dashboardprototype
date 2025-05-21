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
    assigned: { value: 18, trend: 25.3, increasing: true },
    completed: { value: 93, trend: 14, increasing: true },
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

  // Color palettes for active/inactive arcs
  const arcColors = {
    active: ["#CDE4FF", "#338FFF", "#003072"], // assigned, completed, enrolled
    inactive: ["#E5E7EA", "#D1D5DB", "#B0B6BE"]
  };

  // Utility to describe an SVG arc segment
  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  // Add hoveredArc state to the component
  const [hoveredArc, setHoveredArc] = useState<{
    category: keyof typeof learningCategoryData | null;
    metric: "assigned" | "completed" | "enrolled" | null;
  } | null>(null);

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
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full h-auto"
            >
              {Object.entries(learningCategoryData).map(([key, cat], idx) => {
                // Arc geometry
                const arcWidth = 20;
                const arcSpacing = 18;
                const baseRadius = 160;
                const r = baseRadius - idx * (arcWidth + arcSpacing);
                const cx = 200, cy = 200;
                // Data breakdown
                const assigned = cat.assigned.value;
                const completed = cat.completed.value;
                const enrolled = cat.enrolled.value;
                const total = assigned + completed + enrolled;
                // Proportions
                const assignedPct = assigned / total;
                const completedPct = completed / total;
                const enrolledPct = enrolled / total;
                // Angles (270deg arc)
                const startAngle = 0;
                const assignedEnd = startAngle + assignedPct * 270;
                const completedEnd = assignedEnd + completedPct * 270;
                const endAngle = startAngle + 270;
                // Colors
                const isActive = activeSegment === key;
                const colors = isActive ? arcColors.active : arcColors.inactive;
                // Label font
                const labelFont = {
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 13,
                };
                // Helper to get label position at arc start
                function getLabelPos(angle: number, radius: number, offset: number = 0) {
                  const rad = (angle - 90) * Math.PI / 180.0;
                  return {
                    x: cx + (radius + offset) * Math.cos(rad),
                    y: cy + (radius + offset) * Math.sin(rad)
                  };
                }
             
                // Render three proportional segments
                return (
                  <g key={key} className="cursor-pointer"
                    onClick={() => handleSegmentClick(key as keyof typeof learningCategoryData)}
                  >
                    {/* Assigned Segment */}
                    <path
                      d={describeArc(cx, cy, r, startAngle, assignedEnd)}
                      stroke={colors[0]}
                      strokeWidth={arcWidth}
                      strokeLinecap="round"
                      fill="none"
                      className={`transition-all duration-400 ${segments[key as keyof typeof segments] ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Completed Segment */}
                    <path
                      d={describeArc(cx, cy, r, assignedEnd, completedEnd)}
                      stroke={colors[1]}
                      strokeWidth={arcWidth}
                      strokeLinecap="butt"
                      fill="none"
                      className={`transition-all duration-400 ${segments[key as keyof typeof segments] ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Enrolled Segment */}
                    <path
                      d={describeArc(cx, cy, r, completedEnd, endAngle)}
                      stroke={colors[2]}
                      strokeWidth={arcWidth}
                      strokeLinecap="butt"
                      fill="none"
                      className={`transition-all duration-400 ${segments[key as keyof typeof segments] ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Category label (centered above arc) */}
                    <text
                      x={cx - 50}
                      y={cy - r - 18}
                      textAnchor="middle"
                      fill={isActive ? "#338FFF" : "#8C9BAC"}
                      fontFamily="Poppins"
                      fontSize="16"
                      fontWeight="600"
                      className={`transition-all duration-500 ${segments[key as keyof typeof segments] ? 'opacity-100' : 'opacity-0'} cursor-pointer`}
                    >
                      {cat.title}
                    </text>
                  </g>
                );
              })}
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
                  <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#8C9BAC]">Uploads</span>
                      <Info className="w-3 h-3 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-[#4F5A69]">{activeData.uploads.value}</span>
                      <div className="flex items-center">
                        <span className={`text-xs ${activeData.uploads.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.uploads.trend}%</span>
                        {activeData.uploads.increasing ? (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#8C9BAC]">Time </span>
                      <Info className="w-3 h-3 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-[#4F5A69]">{activeData.timeSpent.value}</span>
                      <div className="flex items-center">
                        <span className={`text-xs ${activeData.timeSpent.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{activeData.timeSpent.trend}%</span>
                        {activeData.timeSpent.increasing ? (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              {/* Status rows: Assigned, Completed, Enrolled */}
              {[{
                label: "Assigned",
                color: "#CDE4FF",
                value: activeData.assigned.value,
                trend: activeData.assigned.trend,
                increasing: activeData.assigned.increasing
              }, {
                label: "Completed",
                color: "#338FFF",
                value: activeData.completed.value,
                trend: activeData.completed.trend,
                increasing: activeData.completed.increasing
              }, {
                label: "Enrolled",
                color: "#003072",
                value: activeData.enrolled.value,
                trend: activeData.enrolled.trend,
                increasing: activeData.enrolled.increasing
              }].map((item, idx) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[18px_1fr_auto_auto] items-center gap-x-2 p-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {/* Vertical colored line */}
                  <div className={`flex items-center justify-center`}>
                    <div
                      className={`w-0.5 h-[35px] ${
                        item.label === "Assigned"
                          ? "bg-[#CDE4FF]"
                          : item.label === "Completed"
                          ? "bg-[#338FFF]"
                          : "bg-[#003072]"
                      }`}
                    ></div>
                  </div>
                  {/* Status label */}
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#8C9BAC]">{item.label}</span>
                    <Info className="w-3 h-3 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  {/* Value */}
                  <span className="text-xl font-bold text-[#4F5A69] text-right min-w-[32px]">{item.value}</span>
                  {/* Trend */}
                  <div className="flex items-center justify-end min-w-[48px]">
                    <span className={`text-xs ${item.increasing ? "text-[#00D764]" : "text-[#ED5158]"}`}>{item.trend}%</span>
                    {item.increasing ? (
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighchartsCard;
