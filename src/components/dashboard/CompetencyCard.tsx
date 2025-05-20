
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ViewReportButton from './ViewReportButton';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

// Mock data for the radar chart
const competencyData = [
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Soft-skills', A: 65, fullMark: 100 },
  { subject: 'Creativity', A: 75, fullMark: 100 },
  { subject: 'Technical', A: 70, fullMark: 100 },
  { subject: 'Leadership', A: 60, fullMark: 100 },
];

const CompetencyCard = () => {
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <CardHeader className="pb-2 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#233143]">Competency</h3>
          <ViewReportButton />
        </div>
      </CardHeader>
      
      {/* Highlight section */}
      <div className="px-6 pt-4 pb-3">
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-3">
          <span className="text-blue-500 font-medium mr-2">Communication</span>
          <Info className="h-4 w-4 text-gray-400" />
          <div className="ml-auto flex items-center gap-2">
            <span className="text-gray-800 font-bold text-xl">80%</span>
            <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-0.5 rounded-md">40% ↑</span>
          </div>
        </div>
      </div>
      
      {/* Radar chart */}
      <CardContent className="flex-1 flex items-center justify-center py-2">
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={competencyData}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
              />
              <Radar 
                name="Competency" 
                dataKey="A" 
                stroke="#3b82f6" 
                fill="#93c5fd" 
                fillOpacity={0.3} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetencyCard;
