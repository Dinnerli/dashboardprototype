import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import learningActivitiesTooltips from "@/Data/LearningActivitiesTooltips.json";
import InfoTooltip from "@/components/ui/InfoTooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLearningActivity } from "@/hooks/useLearningActivity";
import {
  Activity,
  DataItem,
  TooltipData,
  DonutKey,
  activityKeyMap,
  donutKeys
} from "@/types/LearningActivities";
import EmptyState from "./EmptyState";
import LearningActivityCardSkeleton from "../Skeletons/LearningActivityCard.skeleton";

interface LearningActivityCardProps {
  title?: string;
  startDate: string;
  endDate: string;
  department?: string;
}

const LearningActivityCard = ({
  title = "Learning Activities",
  startDate,
  endDate,
  department = "All"
}: LearningActivityCardProps) => {
  const isMobile = useIsMobile();
  
  // Fetch learning activities data from API
  const { data: activities, loading, error } = useLearningActivity({
    startDate,
    endDate,
    department
  });  // Get tooltips data
  const tooltipsData = learningActivitiesTooltips as TooltipData;
  
  // State management - must be at the top before any conditional returns
  const [activeSegment, setActiveSegment] = useState<string>("courses");
  const [iltViltTab, setIltViltTab] = useState<'ILT' | 'VILT'>('ILT');
  const [segments, setSegments] = useState<Record<string, boolean>>({});
  const [hoveredArc, setHoveredArc] = useState<{
    category: string | null;
    metric: string | null;
  } | null>(null);

  // Update activeSegment when activities change
  useEffect(() => {
    if (activities && activities.length > 0) {
      const newInitialKey = activityKeyMap[activities[0]?.name] || "courses";
      setActiveSegment(newInitialKey);
    }
  }, [activities]);

  // Staggered animation effect
  useEffect(() => {
    // Staggered animation to reveal each segment
    const timers = donutKeys.map((key, idx) =>
      setTimeout(() => setSegments(prev => ({ ...prev, [key]: true })), 300 + idx * 300)
    );
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  // Handle loading state
  if (loading) {
    return <LearningActivityCardSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <Card className="w-full h-full flex flex-col justify-between animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
        <CardHeader title={title} rightContent={isMobile ? null : <ViewReportButton />} />
        <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 h-full'}>
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle empty data state
  if (!activities || activities.length === 0) {
    return (
      <Card className="w-full h-full flex flex-col justify-between animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
        <CardHeader title={title} rightContent={isMobile ? null : <ViewReportButton />} />
        <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 h-full'}>
          <EmptyState cardName="learning activities" />
        </CardContent>
      </Card>
    );  }

  // Helper to get tooltip for stats
  function getStatTooltip(activityName: string, statName: string): string | undefined {
    return tooltipsData[activityName]?.stats?.[statName] || undefined;
  }
  // Helper to get tooltip for data
  function getDataTooltip(activityName: string, dataName: string): string | undefined {
    return tooltipsData[activityName]?.data?.[dataName] || undefined;
  }
  // Find the active activity data
  let activeActivity: Activity;
  if (activeSegment === 'ilt_vilt') {
    activeActivity = activities.find(a => a.name === iltViltTab) || activities.find(a => a.name === 'ILT') || activities[0];
  } else {
    activeActivity = activities.find(a => activityKeyMap[a.name] === activeSegment) || activities[0];
  }

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
  }  // Donut chart expects three metrics: different for each activity type
  function getDonutData(activity: Activity): DataItem[] {
    // Handle Library specifically - it has different metrics
    if (activity.name === "Library") {
      const assigned = activity.data.find(d => d.name === "Assigned");
      const viewed = activity.data.find(d => d.name === "Viewed");
      // For Library, we need to create a third metric from stats since it only has 2 data items
      const itemsUploaded: DataItem = {
        name: "Items Uploaded",
        value: activity.stats.find(s => s.statName === "Items Uploaded")?.value || 0,
        trend: activity.stats.find(s => s.statName === "Items Uploaded")?.trend || "0%",
        isRising: activity.stats.find(s => s.statName === "Items Uploaded")?.isRising || false
      };
      return [assigned, viewed, itemsUploaded].filter(Boolean) as DataItem[];
    }
    
    // For other activities: Assigned, Completed, Enrolled/Passed
    const assigned = activity.data.find((d) => d.name === "Assigned") || activity.data[0];
    const completed = activity.data.find((d) => d.name === "Completed") || activity.data[1];
    // Use "Enrolled" for ILT/VILT, "Passed" for Courses/Quizzes, or fallback to third item
    let thirdMetric = activity.data.find((d) => d.name === "Enrolled");
    if (!thirdMetric) thirdMetric = activity.data.find((d) => d.name === "Passed");
    if (!thirdMetric) thirdMetric = activity.data[2];
      return [assigned, completed, thirdMetric].filter(Boolean) as DataItem[];
  }

  return (
    <Card className="w-full h-full flex flex-col justify-between animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
    
        <CardHeader title={title} rightContent={isMobile ? null : <ViewReportButton />} />
        <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0 h-full'}>
          <div className="flex flex-col gap-4 w-full h-full md:flex-row items-center justify-center">
            {/* Interactive Chart */}
            <div className={isMobile ? 'w-full mb-2 flex items-center justify-center' : 'flex-1 h-full max-w-sm flex items-center justify-center'}>
              <svg
                viewBox="0 0 300 300"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-h-80"
              >
                {donutKeys.map((key, idx) => {
                  let activity: Activity | undefined;
                  let label = '';
                  if (key === 'ilt_vilt') {
                    label = 'ILT/VILT';
                    // Use ILT for chart data, but could sum both if needed
                    activity = activities.find(a => a.name === 'ILT');
                  } else {
                    activity = activities.find(a => activityKeyMap[a.name] === key);
                    label = activity?.name || '';
                  }
                  if (!activity) return null; const arcWidth = 14;
                  const arcSpacing = 8;
                  const baseRadius = 120;
                  const r = baseRadius - idx * (arcWidth + arcSpacing);
                  const cx = 150, cy = 150;                  const donutData = getDonutData(activity);
                  const total = donutData.reduce((sum, d) => sum + (typeof d.value === 'number' ? d.value : 0), 0);
                  const assigned = donutData[0]?.value || 0;
                  const completed = donutData[1]?.value || 0;
                  const enrolled = donutData[2]?.value || 0;
                  
                  // Handle division by zero - when total is 0, show a placeholder arc structure
                  let assignedPct, completedPct, enrolledPct;
                  if (total > 0) {
                    assignedPct = assigned / total;
                    completedPct = completed / total;
                    enrolledPct = enrolled / total;
                  } else {
                    // When all values are 0, show a minimal arc structure
                    assignedPct = 0.01; // Very small arc just to show structure
                    completedPct = 0.01;
                    enrolledPct = 0.01;
                  }
                  const startAngle = 0;
                  const assignedEnd = startAngle + assignedPct * 270;
                  const completedEnd = assignedEnd + completedPct * 270;
                  const endAngle = startAngle + 270;
                  const isActive = activeSegment === key;
                  const colors = isActive ? arcColors.active : arcColors.inactive;
                  return (
                    <g key={key} className="cursor-pointer "
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
                        {label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Stats Section - updates based on selected segment */}
            <div className={`flex-1 flex flex-col ${isMobile ? 'gap-2.5 pb-4 justify-between w-full' : 'justify-between p-2.5'}`}>
              <div className={isMobile ? 'mb-3' : 'm-3'}>
                {activeSegment === 'ilt_vilt' ? (
                  <div className="flex gap-1">
                    <button
                      className={`px-3 py-1 rounded-md font-bold text-base ${iltViltTab === 'ILT' ? 'bg-[#F2F3F5] text-[#338FFF]' : ' text-[#B0B6BE]'}`}
                      onClick={() => setIltViltTab('ILT')}
                    >
                      ILT
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md font-bold text-base ${iltViltTab === 'VILT' ? 'bg-[#F2F3F5] text-[#338FFF]' : ' text-[#B0B6BE]'}`}
                      onClick={() => setIltViltTab('VILT')}
                    >
                      VILT
                    </button>
                  </div>
                ) : (
                  <h4 className={`text-xl font-bold text-[#338FFF] ${isMobile ? 'text-base' : ''}`}>{activeActivity.name}</h4>
                )}
              </div>              {/* First row: stats[] */}
              <div className={`flex flex-wrap gap-1 pb-6 ${isMobile ? 'justify-between' : 'justify-center p-2.5'}`}>
                <div className={`flex items-center justify-between w-full`}>
                  {activeActivity.stats.map((stat, idx) => (
                    <>
                      <div key={stat.statName} className="flex items-center gap-1 me-2">
                        {/* Icon rendering unchanged */}
                        {idx === 0 && (
                          <svg width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        )}
                        {idx === 1 && (
                          <svg width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        )}
                        {idx > 1 && (
                          <svg width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        )}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold truncate text-[#8C9BAC] ${isMobile ? 'text-sm' : 'text-base'}`}>{stat.statName}</span>
                            {getStatTooltip(activeActivity.name, stat.statName) && (
                              <InfoTooltip
                                tooltip={getStatTooltip(activeActivity.name, stat.statName)}
                                iconProps={{ className: `${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#8C9BAC]`, stroke: '#8C9BAC' }}
                              />
                            )}
                          </div>                          <div className="flex items-center gap-3">
                            <span className={`font-bold text-[#4F5A69] ${isMobile ? 'text-lg' : 'text-2xl'}`}>{stat.value}</span>
                            <div className="flex items-center">
                              <TrendIndicator value={stat.trend} isPositive={stat.isRising} />
                            </div>
                          </div>
                        </div>
                      </div>
                      {idx < activeActivity.stats.length - 1 && (
                        <div className="flex items-center justify-center">
                          <div className="h-[32px] w-px bg-[#F2F3F5]" />
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
              {/* Key metrics that update based on selection: Assigned, Completed, Enrolled/Viewed */}
              <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-6'}`}>
                {getDonutData(activeActivity).map((item, idx) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-[18px_1fr_auto_auto] items-center gap-x-2 p-2.5 rounded-lg transition-colors"
                  >
                    {/* Vertical colored line */}
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-0.5 h-6 ${idx === 0
                            ? "bg-[#CDE4FF]"
                            : idx === 1
                              ? "bg-[#338FFF]"
                              : "bg-[#003072]"
                          }`}
                      ></div>
                    </div>
                    {/* Status label with tooltip */}
                    <div className="flex items-center gap-1">
                      <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-[#8C9BAC]`}>{item.name}</span>
                      {getDataTooltip(activeActivity.name, item.name) && (
                        <InfoTooltip
                          tooltip={getDataTooltip(activeActivity.name, item.name)}
                          iconProps={{ className: `${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#8C9BAC]`, stroke: '#8C9BAC' }}
                        />
                      )}
                    </div>
                    {/* Value */}
                    <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-[#4F5A69] text-right min-w-[32px]`}>{item.value}</span>
                    {/* Trend */}
                    <div className="flex items-center justify-end min-w-[48px]">
                      <TrendIndicator value={item.trend} isPositive={item.isRising} />
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

export default LearningActivityCard;
