import React, { useState, useEffect } from 'react';
import ViewReportButton from './ViewReportButton';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Info } from 'lucide-react';
import TrendIndicator from "./common/TrendIndicator";
import { useIsMobile } from '@/hooks/use-mobile';
import CardHeader from "./CardHeader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import competencyJsonData from '@/Data/CompetencyData.json';

// Transform the data for the radar chart
interface CompetencyItem {
  name: string;
  present: number;
  past: number;
  trend: number;
  rising: boolean;
}

const MAX_LABEL_LENGTH = 4;
const getTruncated = (name: string) =>
  name.length > MAX_LABEL_LENGTH ? name.slice(0, MAX_LABEL_LENGTH) + '...' : name;

const transformedData = competencyJsonData.competency.map(item => ({
  subject: getTruncated(item.name),
  present: item.present,
  past: item.past,
  fullMark: 100
}));

interface RadarChartClickData {
  activePayload?: Array<{ payload: { subject: string } }>;

}

const CompetencyCard = () => {
  const isMobile = useIsMobile();
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyItem>(competencyJsonData.competency[0]);

  const handleClick = (data: unknown) => {
    const d = data as RadarChartClickData;
    if (d && d.activePayload && d.activePayload[0]) {
      const subject = d.activePayload[0].payload.subject;
      const found = competencyJsonData.competency.find(item => getTruncated(item.name) === subject);
      if (found) {
        setSelectedCompetency(found);
      }
    }
  };

  interface PolarAngleAxisProps {
    payload: { value: string };
    x: number;
    y: number;
    cx: number;
    cy: number;
  }
  const renderPolarAngleAxis = ({ payload, x, y, cx, cy, ...rest }: PolarAngleAxisProps) => {
    // Find full item by truncated name
    const isActive = getTruncated(selectedCompetency.name) === payload.value;
    
    // Calculate distance from center and angle
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // Extend the distance to position labels outside the chart
    const labelDistance = distance + 15; // Increased distance for better spacing
    
    // Calculate new position
    const adjustedX = cx + Math.cos(angle) * labelDistance;
    const adjustedY = cy + Math.sin(angle) * labelDistance;
    
    // Determine text anchor based on horizontal position relative to center
    let textAnchor: "start" | "middle" | "end" = "middle";
    if (adjustedX > cx + 5) {
      textAnchor = "start";
    } else if (adjustedX < cx - 5) {
      textAnchor = "end";
    }

    return (
      <g>
        <text
          className={`cursor-pointer transition-colors ${isActive ? 'fill-blue-500 font-semibold text-xs' : 'fill-gray-500 text-xs font-medium'}`}
          x={adjustedX}
          y={adjustedY + 4} // Small vertical offset for better centering
          textAnchor={textAnchor}
          dominantBaseline="middle"
          onClick={() => {
            const found = competencyJsonData.competency.find(item => getTruncated(item.name) === payload.value);
            if (found) {
              setSelectedCompetency(found);
            }
          }}
        >
          {isActive ? selectedCompetency.name : payload.value}
        </text>
      </g>
    );
  };
  
  return (
  <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[555px]'} p-6 animate-slide-in-up bg-white overflow-hidden flex flex-col justify-between`}
    style={{ animationDelay: '0.4s' }}>
       <CardHeader title="Competency" rightContent={isMobile ? null : <ViewReportButton />} />

        {/* Highlight section */}
      <div className="px-2 pt-4 pb-3">
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-3">
          <span className="text-blue-500 font-semibold text-base mr-2">{selectedCompetency.name}</span>
          <Info className="h-4 w-4 text-gray-400" />
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[#4F5A69] font-bold text-2xl">{selectedCompetency.present}%</span>
            <TrendIndicator value={`${Math.abs(selectedCompetency.trend)}%`} isPositive={selectedCompetency.rising} />
          </div>
        </div>
      </div>
      
      {/* Radar chart */}
      <CardContent className="flex-1 flex items-center justify-center p-0">
        <div className="w-full h-[360px] px-4 overflow-visible relative"> {/* Increased height and set overflow-visible */}
          <ResponsiveContainer width="100%" height="100%" className="overflow-visible">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" // Reduce outer radius to prevent label cutoff
              data={transformedData}
              onClick={handleClick}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="subject"
                tick={renderPolarAngleAxis}
                fontSize={12}
              />
              <Tooltip />
              <Radar 
                name="Current" 
                dataKey="present" 
                stroke="#3b82f6" 
                fill="#93c5fd" 
                fillOpacity={0.3} 
              />
              <Radar
                name="Previous"
                dataKey="past"
                stroke="#8C9BAC"
                fill="none"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetencyCard;
