import React, { useState, useMemo } from 'react';
import { Card } from '../ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import CardHeader from './CardHeader';
import ViewReportButton from './ViewReportButton';
import InfoTooltip from '../ui/InfoTooltip';
import TrendIndicator from './common/TrendIndicator';
import deviceData from '@/Data/DeviceCard.json';
import { Gauge } from '@/components/ui/gauge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PRIMARY_COLOR = '#388fff';
const GRAY_COLOR = '#F1F3F5';
const SELECT_OFFSET = 6; // Adjusted for subtle bounce

const tooltips = {
  "Mobile App": "Number of total users from the mobile App",
  "Mobile Browser": "Number of total users from the mobile web browser",
  "Desktop": "Number of total users from desktop devices."
};

const CenterOverlay = ({ title, tooltip, value, percentage, trendValue, isPositiveTrend }) => {
  // Parse trend value to remove % sign if present
  const parsedTrendValue = typeof trendValue === 'string' ? trendValue : `${trendValue}%`;
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
      <div className="flex justify-center items-center space-x-1">
        <span className="text-base font-semibold text-[#388fff]">
          {title}
        </span>
        <div className="pointer-events-auto">
          <InfoTooltip
            tooltip={tooltip}
            delayDuration={0}
            iconProps={{
              className: 'w-3.5 h-3.5 text-[#8C9BAC]',
              stroke: '#8C9BAC',
            }}
          />
        </div>
      </div>
      <div className="mt-1 text-4xl font-bold text-[#4F5A69] ">
        {value}
      </div>
      <div className="mt-1 flex justify-center gap-2 items-center space-x-1">
        <span className="text-lg font-bold text-[#4F5A69]">
          {percentage}%
        </span>
        <TrendIndicator value={parsedTrendValue} isPositive={isPositiveTrend} />
      </div>
    </div>
  );
};

export const DeviceCard = () => {
  const stats = deviceData.DevicesCard.stats;
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'desktop' | 'mobile'>('desktop');

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

  const chartSize = isMobile ? 330 : 330;
  const innerRadius = isMobile ? 100 : 100;
  const outerRadius = isMobile ? 140 : 150;
  const desktopStats = useMemo(() => {
    const desktop = stats.find((entry) => entry.name === "Desktop");
    const mobileApp = stats.find((entry) => entry.name === "Mobile App");
    const mobileBrowser = stats.find((entry) => entry.name === "Mobile Browser");

    return [
      { name: "Desktop", value: desktop?.value || 0, trend: desktop?.trend || "0%", isRising: desktop?.isRising || false },
      { name: "Mobile (App + Browser)", value: (mobileApp?.value || 0) + (mobileBrowser?.value || 0), trend: "15%", isRising: true },
    ];
  }, [stats]);

  const mobileStats = useMemo(() => {
    const desktop = stats.find((entry) => entry.name === "Desktop");
    const mobileApp = stats.find((entry) => entry.name === "Mobile App");
    const mobileBrowser = stats.find((entry) => entry.name === "Mobile Browser");

    return [
      { name: "Desktop", value: desktop?.value || 0, trend: desktop?.trend || "0%", isRising: desktop?.isRising || false },
      { name: "Mobile App", value: mobileApp?.value || 0, trend: mobileApp?.trend || "0%", isRising: mobileApp?.isRising || false },
      { name: "Mobile Browser", value: mobileBrowser?.value || 0, trend: mobileBrowser?.trend || "0%", isRising: mobileBrowser?.isRising || false },
    ];
  }, [stats]);

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
      <div className='flex flex-col justify-between h-full'>      <Tabs 
        defaultValue="desktop" 
        value={selectedTab} 
        onValueChange={(value) => setSelectedTab(value as 'desktop' | 'mobile')}
        className="w-full"
      >
        <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
          <TabsTrigger 
            value="desktop"
            className="px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0"
          >
            {selectedTab === "desktop" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
            Desktop
          </TabsTrigger>
          <TabsTrigger 
            value="mobile"
            className="px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0"
          >
            {selectedTab === "mobile" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
            Mobile
          </TabsTrigger>
        </TabsList><TabsContent value="desktop" className="m-0 overflow-y-auto">
          <div className="relative h-full outline-none focus:outline-none flex justify-center items-center mt-4">
            <Gauge 
              value={desktopStats[0].value / (desktopStats[0].value + desktopStats[1].value) * 100} 
              size={chartSize} 
              primary={PRIMARY_COLOR} 
              secondary={GRAY_COLOR} 
              showValue={false} 
            />

            <CenterOverlay 
              title="Desktop"
              tooltip={tooltips["Desktop"]}
              value={desktopStats[0].value}
              percentage={Math.round(desktopStats[0].value / (desktopStats[0].value + desktopStats[1].value) * 100)}
              trendValue={desktopStats[0].trend}
              isPositiveTrend={desktopStats[0].isRising}
            />
          </div>
        </TabsContent>        <TabsContent value="mobile" className="m-0 overflow-y-auto">
          <div className="relative h-full outline-none focus:outline-none flex justify-center items-center mt-4">
            {/* Three-segment gauge: Desktop (gray), Mobile App (blue), Mobile Browser (light gray) */}
            <svg width={chartSize} height={chartSize} className="outline-none focus:outline-none">
              <defs>
                <mask id="gaugeMask">
                  <rect width="100%" height="100%" fill="black" />
                  <circle 
                    cx={chartSize / 2} 
                    cy={chartSize / 2} 
                    r={innerRadius} 
                    fill="white" 
                  />
                </mask>
              </defs>
              
              {/* Background circle */}
              <circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={outerRadius}
                fill="none"
                stroke="#F1F3F5"
                strokeWidth={outerRadius - innerRadius}
                mask="url(#gaugeMask)"
                className="outline-none focus:outline-none"
              />
              
              {/* Desktop segment (gray) */}
              <circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={outerRadius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth={outerRadius - innerRadius}
                strokeDasharray={`${(mobileStats[0].value / total) * (2 * Math.PI * outerRadius * 0.9)} ${2 * Math.PI * outerRadius}`}
                strokeDashoffset={2 * Math.PI * outerRadius * 0.05}
                transform={`rotate(-90 ${chartSize / 2} ${chartSize / 2})`}
                mask="url(#gaugeMask)"
                strokeLinecap="round"
                className="outline-none focus:outline-none"
              />
              
              {/* Mobile App segment (blue - highlighted) */}
              <circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={outerRadius}
                fill="none"
                stroke={PRIMARY_COLOR}
                strokeWidth={outerRadius - innerRadius}
                strokeDasharray={`${(mobileStats[1].value / total) * (2 * Math.PI * outerRadius * 0.9)} ${2 * Math.PI * outerRadius}`}
                strokeDashoffset={2 * Math.PI * outerRadius * 0.05 - (mobileStats[0].value / total) * (2 * Math.PI * outerRadius * 0.9)}
                transform={`rotate(-90 ${chartSize / 2} ${chartSize / 2})`}
                mask="url(#gaugeMask)"
                strokeLinecap="round"
                className="outline-none focus:outline-none"
              />
              
              {/* Mobile Browser segment (light gray) */}
              <circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={outerRadius}
                fill="none"
                stroke="#D1D5DB"
                strokeWidth={outerRadius - innerRadius}
                strokeDasharray={`${(mobileStats[2].value / total) * (2 * Math.PI * outerRadius * 0.9)} ${2 * Math.PI * outerRadius}`}
                strokeDashoffset={2 * Math.PI * outerRadius * 0.05 - ((mobileStats[0].value + mobileStats[1].value) / total) * (2 * Math.PI * outerRadius * 0.9)}
                transform={`rotate(-90 ${chartSize / 2} ${chartSize / 2})`}
                mask="url(#gaugeMask)"
                strokeLinecap="round"
                className="outline-none focus:outline-none"
              />
            </svg>

            <CenterOverlay 
              title="Mobile App"
              tooltip={tooltips["Mobile App"]}
              value={mobileStats[1].value}
              percentage={Math.round(mobileStats[1].value / total * 100)}
              trendValue={mobileStats[1].trend}
              isPositiveTrend={mobileStats[1].isRising}
            />
          </div>
        </TabsContent>
      </Tabs>
      </div>  
    </Card>
  );
};
