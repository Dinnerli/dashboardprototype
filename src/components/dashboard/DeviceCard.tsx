import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { Card } from '../ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import CardHeader from './CardHeader';
import ViewReportButton from './ViewReportButton';
import InfoTooltip from '../ui/InfoTooltip';
import TrendIndicator from './common/TrendIndicator';
import deviceData from '@/Data/DeviceCard.json';

const PRIMARY_COLOR = '#388fff';
const GRAY_COLOR = '#F1F3F5';
const SELECT_OFFSET = 6; // Adjusted for subtle bounce

const tooltips = {
  "Mobile App": "Number of total users from the mobile App",
  "Mobile Browser": "Number of total users from the mobile web browser",
  "Desktop": "Number of total users from desktop devices."
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const offset = 2; // minimal movement to avoid misalignment
  const sx = cx + offset * cos;
  const sy = cy + offset * sin;

  return (
    <g>
      <Sector
        cx={sx}
        cy={sy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 15}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke='#ffffff'
        strokeWidth={5}
        cornerRadius={10}
        
      />
    </g>
  );
};


export const DeviceCard = () => {
  const stats = deviceData.DevicesCard.stats;
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const total = useMemo(
    () => stats.reduce((sum, entry) => sum + entry.value, 0),
    [stats]
  );
  const activeEntry = stats[activeIndex];
  const sharePercent = Math.round((activeEntry.value / total) * 100);
  const trendValue = parseInt(activeEntry.trend.replace('%', ''), 10);
  const isPositiveTrend = activeEntry.isRising;
  const tooltipText = tooltips[activeEntry.name] || `${activeEntry.name} accounts for ${sharePercent}% of total usage`;

  const onPieEnter = (_, index) => setActiveIndex(index);

  const chartSize = isMobile ? 240 : 330;
  const innerRadius = isMobile ? 50 : 100;
  const outerRadius = isMobile ? 80 : 150;
  return (
    <Card
      className={`
        w-auto h-full
        ${isMobile ? '' : 'min-h-[555px]'}
        p-6 animate-slide-in-up bg-white overflow-hidden relative
        [&_svg]:outline-none [&_svg]:focus:outline-none
        [&_path]:outline-none [&_path]:focus:outline-none
        [&_g]:outline-none [&_g]:focus:outline-none
      `}
      style={{ animationDelay: '0.4s' }}
    >
      <CardHeader
        title="Devices"
        rightContent={isMobile ? null : <ViewReportButton />}
      />   
      <div className='flex flex-col justify-between h-full'> 
      <div className="relative h-full outline-none focus:outline-none flex justify-center items-center mt-4">
        <PieChart 
          width={chartSize} 
          height={chartSize} 
          className="select-none outline-none focus:outline-none [&_*]:outline-none [&_*]:focus:outline-none"
          style={{ outline: 'none' }}
        >
          <Pie
  data={stats}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  innerRadius={innerRadius}
  outerRadius={outerRadius}
  cornerRadius={0}
  activeIndex={activeIndex}
  activeShape={renderActiveShape}
  onClick={onPieEnter}

  stroke="#ffffff"
  strokeWidth={5}
  className="outline-none focus:outline-none"
>

            {stats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? PRIMARY_COLOR : GRAY_COLOR}
              />
            ))}
          </Pie>
        </PieChart>        {/* Center overlay with value, share %, and trend indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
          <div className="flex justify-center items-center space-x-1">
            <span className="text-base font-semibold text-[#388fff]">
              {activeEntry.name}
            </span>
            <div className="pointer-events-auto">
              <InfoTooltip
                tooltip={tooltipText}
                delayDuration={0}
                iconProps={{
                  className: 'w-3.5 h-3.5 text-[#8C9BAC]',
                  stroke: '#8C9BAC',
                }}
              />
            </div>
          </div>
          <div className="mt-1 text-4xl font-bold text-[#4F5A69] ">
            {activeEntry.value}
          </div>
          <div className="mt-1 flex justify-center gap-2 items-center space-x-1">
            <span className="text-lg font-bold text-[#4F5A69]">
              {sharePercent}%
            </span>
            <TrendIndicator value={trendValue} isPositive={isPositiveTrend} />
          </div>
        </div>
      </div>
      </div>  
    </Card>
  );
};
