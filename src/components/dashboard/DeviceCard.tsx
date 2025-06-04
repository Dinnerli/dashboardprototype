import React, { useState } from 'react';
import { Card } from '../ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import CardHeader from './CardHeader';
import ViewReportButton from './ViewReportButton';
import InfoTooltip from '../ui/InfoTooltip';
import TrendIndicator from './common/TrendIndicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gauge } from '../ui/gauge'
import styles from './DeviceCard.module.css';

const tooltips = {
  "Mobile App": "Number of total users from the mobile App",
  "Mobile Browser": "Number of total users from the mobile web browser",
  "Desktop": "Number of total users from desktop devices."
};

// CenterOverlay stays the same; it will be placed on top of the PieChart
const CenterOverlay = ({
  title,
  tooltip,
  value,
  percentage,
  trendValue,
  isPositiveTrend
}: {
  title: string;
  tooltip: string;
  value: number;
  percentage: number;
  trendValue: string;
  isPositiveTrend: boolean;
}) => {
  // Ensure trendValue is a string with “%” if necessary
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
      <div className="mt-1 text-4xl font-bold text-[#4F5A69]">
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
  const isMobile = useIsMobile();
  // Keep track of which tab is selected
  const [selectedTab, setSelectedTab] = useState<'desktop' | 'mobile'>('desktop');

  // Hard-code data for the pie chart:
  // Desktop = 70, Mobile = 30
  const pieData = [
    { name: 'Desktop', value: 70 },
    { name: 'Mobile', value: 30 }
  ];

  // Define colors for each slice:
  const COLORS = ['#388fff', '#F2F3F5'];

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

      <div className="flex flex-col justify-between h-full">
        <Tabs
          defaultValue="desktop"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as 'desktop' | 'mobile')}
          className="w-full"
        >
          <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
            <TabsTrigger
              value="desktop"
              className="
                px-3 py-2 sm:px-5 sm:py-3
                rounded-none
                data-[state=active]:shadow-none
                data-[state=active]:bg-white
                relative
                text-xs sm:text-sm md:text-base font-semibold
                data-[state=active]:text-[#338FFF]
                data-[state=inactive]:text-[#8C9BAC]
                focus-visible:outline-none focus-visible:ring-0
              "
            >
              {selectedTab === 'desktop' && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>
              )}
              Desktop
            </TabsTrigger>

            <TabsTrigger
              value="mobile"
              className="
                px-3 py-2 sm:px-5 sm:py-3
                rounded-none
                data-[state=active]:shadow-none
                data-[state=active]:bg-white
                relative
                text-xs sm:text-sm md:text-base font-semibold
                data-[state=active]:text-[#338FFF]
                data-[state=inactive]:text-[#8C9BAC]
                focus-visible:outline-none focus-visible:ring-0
              "
            >
              {selectedTab === 'mobile' && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>
              )}
              Mobile
            </TabsTrigger>
          </TabsList>

          {/* DESKTOP TAB CONTENT */}
          <TabsContent value="desktop" className="m-0 overflow-y-auto">
            <div className="relative h-full outline-none focus:outline-none flex justify-center items-center mt-4">
              <div className="relative">
                {/* Gauge replaces custom SVG */}
                <div className={`flex items-center justify-center w-[260px] h-[260px] relative ${styles['device-gauge-container'] || ''}`}> 
                  <Gauge
                    value={70}
                    size={260}
                    strokeWidth={13}
                    gapPercent={7}
                    primary="#388fff"
                    secondary="#F2F3F5"
                    showValue={false}
                    className={{ svgClassName: styles['device-gauge-svg'], primaryClassName: styles['device-gauge-fg'], secondaryClassName: styles['device-gauge-bg'] }}
                  />
                  {/* Overlay SVG for arc click */}
                  <svg
                    width={260}
                    height={260}
                    viewBox="0 0 100 100"
                    className={styles['device-gauge-mobile-arc-svg']}
                  >
                    {/* Desktop arc (70%) */}
                    <path
                      d="M50,10 A40,40 0 1,1 19.021,69.021"
                      fill="none"
                      stroke="transparent"
                      strokeWidth={13}
                      className={styles['device-gauge-mobile-arc-path']}
                      onClick={() => setSelectedTab('desktop')}
                    />
                    {/* Mobile arc (30%) */}
                    <path
                      d="M19.021,69.021 A40,40 0 0,1 50,10"
                      fill="none"
                      stroke="transparent"
                      strokeWidth={13}
                      className={styles['device-gauge-mobile-arc-path']}
                      onClick={() => setSelectedTab('mobile')}
                    />
                  </svg>
                  {/* Center overlay stays on top */}
                  <CenterOverlay
                    title="Desktop"
                    tooltip={tooltips['Desktop']}
                    value={700} // hard-coded as number
                    percentage={70} // hard-coded percentage
                    trendValue="15%"
                    isPositiveTrend={true}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* MOBILE TAB CONTENT */}
          <TabsContent value="mobile" className="m-0 overflow-y-auto">
            <div className="relative h-full outline-none focus:outline-none flex justify-center items-center mt-4">
              <div className="relative">
                {/* Gauge replaces custom SVG */}
                <div className={`flex items-center justify-center w-[260px] h-[260px] relative ${styles['device-gauge-container'] || ''}`}> 
                  <Gauge
                    value={70}
                    size={260}
                    strokeWidth={13}
                    gapPercent={7}
                    primary="#F2F3F5"
                    secondary="#388fff"
                    showValue={false}
                    className={{ svgClassName: styles['device-gauge-svg'], primaryClassName: styles['device-gauge-fg'], secondaryClassName: styles['device-gauge-bg'] }}
                  />
                  {/* Overlay SVG for arc click */}
                  <svg
                    width={260}
                    height={260}
                    viewBox="0 0 100 100"
                    className={styles['device-gauge-mobile-arc-svg']}
                  >
                    {/* Desktop arc (70%) */}
                    <path
                      d="M50,10 A40,40 0 1,1 19.021,69.021"
                      fill="none"
                      stroke="transparent"
                      strokeWidth={13}
                      className={styles['device-gauge-mobile-arc-path']}
                      onClick={() => setSelectedTab('desktop')}
                    />
                    {/* Mobile arc (30%) */}
                    <path
                      d="M19.021,69.021 A40,40 0 0,1 50,10"
                      fill="none"
                      stroke="transparent"
                      strokeWidth={13}
                      className={styles['device-gauge-mobile-arc-path']}
                      onClick={() => setSelectedTab('mobile')}
                    />
                  </svg>
                  {/* Center overlay stays on top */}
                  <CenterOverlay
                    title="Mobile"
                    tooltip={tooltips['Mobile']}
                    value={300} // hard-coded as number
                    percentage={30} // hard-coded percentage
                    trendValue="15%"
                    isPositiveTrend={true}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
