import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import learningActivities from "@/Data/LearningActivities.json";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface HighchartsCardProps {
  title?: string;
}

// Map activity names to keys for donut chart logic
const activityKeyMap: Record<string, string> = {
  "Courses": "courses",
  "ILT": "ilt",
  "VILT": "vilt",
  "Exams": "exams",
  "Library": "library"
};

type Activity = typeof learningActivities.activities[number];
type ActivityData = Activity["data"][number];

type DonutKey = "library" | "exams" | "ilt" | "vilt" | "courses";
const donutKeys: DonutKey[] = ["library", "exams", "ilt", "vilt", "courses"];

const HighchartsCard = ({
  title = "Learning Activities"
}: HighchartsCardProps) => {
  // Prepare activities data
  const activities: Activity[] = learningActivities.activities;
  // Find first available activity for initial state
  const initialKey = activityKeyMap[activities[0]?.name] || "courses";
  const [activeSegment, setActiveSegment] = useState<string>(initialKey);
  const [segments, setSegments] = useState<Record<string, boolean>>({});

  const isMobile = useIsMobile();
  // Find the active activity data
  const activeActivity = activities.find(a => activityKeyMap[a.name] === activeSegment) || activities[0];

  useEffect(() => {
    // Staggered animation to reveal each segment
    const timers = donutKeys.map((key, idx) =>
      setTimeout(() => setSegments(prev => ({ ...prev, [key]: true })), 300 + idx * 300)
    );
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

  // Donut chart expects three metrics: Assigned, Completed, Enrolled/Viewed
  function getDonutData(activity: Activity): ActivityData[] {
    const assigned = activity.data.find((d) => d.name === "Assigned") || activity.data[0];
    const completed = activity.data.find((d) => d.name === "Completed") || activity.data[1];
    // For Library Items, use "Viewed" as third metric, else "Enrolled"
    let thirdMetric = activity.data.find((d) => d.name === "Enrolled");
    if (!thirdMetric) thirdMetric = activity.data.find((d) => d.name === "Viewed");
    if (!thirdMetric) thirdMetric = activity.data[2];
    return [assigned, completed, thirdMetric];
  }
  // Add hoveredArc state to the component
  const [hoveredArc, setHoveredArc] = useState<{
    category: string | null;
    metric: string | null;
  } | null>(null);

  return (
    <Card className="w-full h-full px-6 animate-slide-in-up font-poppins" style={{ animationDelay: '0.4s' }}>
      <CardHeader title={title} rightContent={isMobile ? null : <ViewReportButton />} />
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Interactive Chart */}
          <div className="flex-1 h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {activities.map((activity, idx) => {
                const key = activityKeyMap[activity.name];
                if (!key) return null;
                const arcWidth = 18;
                const arcSpacing = 11;
                const baseRadius = 160;
                const r = baseRadius - idx * (arcWidth + arcSpacing);
                const cx = 200, cy = 200;
                const donutData = getDonutData(activity);
                const total = donutData.reduce((sum, d) => sum + (typeof d.value === 'number' ? d.value : 0), 0);
                const assigned = donutData[0]?.value || 0;
                const completed = donutData[1]?.value || 0;
                const enrolled = donutData[2]?.value || 0;
                const assignedPct = assigned / total;
                const completedPct = completed / total;
                const enrolledPct = enrolled / total;
                const startAngle = 0;
                const assignedEnd = startAngle + assignedPct * 270;
                const completedEnd = assignedEnd + completedPct * 270;
                const endAngle = startAngle + 270;
                const isActive = activeSegment === key;
                const colors = isActive ? arcColors.active : arcColors.inactive;
                return (
                  <g key={key} className="cursor-pointer"
                    onClick={() => setActiveSegment(key)}
                  >
                    {/* Assigned Segment */}
                    <path
                      d={describeArc(cx, cy, r, startAngle, assignedEnd)}
                      stroke={colors[0]}
                      strokeWidth={arcWidth}
                      strokeLinecap="round"
                      fill="none"
                      className={`transition-all duration-400 ${segments[key] ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Completed Segment */}
                    <path
                      d={describeArc(cx, cy, r, assignedEnd, completedEnd)}
                      stroke={colors[1]}
                      strokeWidth={arcWidth}
                      strokeLinecap="round"
                      fill="none"
                      className={`transition-all duration-400 ${segments[key] ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Enrolled/Viewed Segment */}
                    <path
                      d={describeArc(cx, cy, r, completedEnd, endAngle)}
                      stroke={colors[2]}
                      strokeWidth={arcWidth}
                      strokeLinecap="round"
                      fill="none"
                      className={`transition-all duration-400 ${segments[key] ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Category label (centered above arc) */}
                    <text
                      x={cx - 50}
                      y={cy - r}
                      textAnchor="middle"
                      fill={isActive ? "#338FFF" : "#8C9BAC"}
                      fontFamily="Poppins"
                      fontSize="16"
                      fontWeight="600"
                      className={`transition-all duration-500 ${segments[key] ? 'opacity-100' : 'opacity-0'} cursor-pointer`}
                    >
                      {activity.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Stats Section - updates based on selected segment */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="m-4">
              <h4 className="text-base font-bold text-[#338FFF]">{activeActivity.name}</h4>
            </div>
            {/* First row: stats[] */}
            <TooltipProvider>
              <div className="flex flex-wrap gap-4 ">
                <div className="flex items-center justify-center gap-3 w-full">
                  {activeActivity.stats.map((stat, idx) => (
                    <div key={stat.statName} className="flex items-center gap-2">
                      {/* Always show an icon: first is blue, second is yellow, rest blue */}
                      {idx === 0 && (
                        <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      )}
                      {idx > 1 && (
                        <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      )}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#8C9BAC]">{stat.statName}</span>
                          {stat.tooltip && (
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <span tabIndex={0} onClick={e => e.stopPropagation()}>
                                  <Info className="w-3.5 h-3.5 text-[#8C9BAC] cursor-help" stroke="#8C9BAC" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="center" className="max-w-[180px] text-center">
                                {stat.tooltip}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-[#4F5A69]">{stat.value}</span>
                          <div className="flex items-center">
                            <TrendIndicator value={stat.trendPercentage} isPositive={stat.isRising} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TooltipProvider>
            {/* Key metrics that update based on selection: Assigned, Completed, Enrolled/Viewed */}
            <TooltipProvider>
              <div className="flex flex-col gap-2">
                {getDonutData(activeActivity).map((item, idx) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-[18px_1fr_auto_auto] items-center gap-x-2 p-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {/* Vertical colored line */}
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-0.5 h-6 ${
                          idx === 0
                            ? "bg-[#CDE4FF]"
                            : idx === 1
                            ? "bg-[#338FFF]"
                            : "bg-[#003072]"
                        }`}
                      ></div>
                    </div>
                    {/* Status label with tooltip */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-[#8C9BAC]">{item.name}</span>
                      {item.tooltip && (
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <span tabIndex={0} onClick={e => e.stopPropagation()}>
                              <Info className="w-3 h-3 text-[#8C9BAC] cursor-help" stroke="#8C9BAC" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center" className="max-w-[180px] text-center">
                            {item.tooltip}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    {/* Value */}
                    <span className="text-xl font-bold text-[#4F5A69] text-right min-w-[32px]">{item.value}</span>
                    {/* Trend */}
                    <div className="flex items-center justify-end min-w-[48px]">
                      <TrendIndicator value={item.trend} isPositive={item.isRising} />
                    </div>
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighchartsCard;
