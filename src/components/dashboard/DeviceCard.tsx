import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeviceStats } from '@/hooks/useDeviceStats';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import InfoTooltip from '../ui/InfoTooltip';
import CardHeader from './CardHeader';
import TrendIndicator from './common/TrendIndicator';
import ViewReportButton from './ViewReportButton';
import { Gauge } from '../ui/gauge';
import DeviceCardSkeleton from '../Skeletons/DeviceCard.skeleton';

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

export const DeviceCard = ({ startDate, endDate, department }: { startDate: string; endDate: string; department: string }) => {
  const isMobile = useIsMobile();
  // Keep track of which tab is selected
  const [selectedTab, setSelectedTab] = useState<'desktop' |  'browser' | 'app'>('desktop');
  const { data: stats, loading, error, refetch } = useDeviceStats({ startDate, endDate, department });

  // Calculate total and percentages
  const totalValue = stats ? stats.reduce((sum, stat) => sum + stat.value, 0) : 0;
  const desktopData = stats?.find(stat => stat.name === 'Desktop');
  const mobileAppData = stats?.find(stat => stat.name === 'Mobile App');
  const mobileBrowserData = stats?.find(stat => stat.name === 'Mobile Browser');
  const desktopPercentage = totalValue && desktopData ? Math.round((desktopData.value / totalValue) * 100) : 0;
  const mobileAppPercentage = totalValue && mobileAppData ? Math.round((mobileAppData.value / totalValue) * 100) : 0;
  const mobileBrowserPercentage = totalValue && mobileBrowserData ? Math.round((mobileBrowserData.value / totalValue) * 100) : 0;

  return (
    <Card
      className={`
        w-auto h-full
        ${isMobile ? '' : 'min-h-[490px]'}
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

      <div className="flex flex-col justify-between">
        {loading ? (
          <DeviceCardSkeleton />
        ) : error ? (
          <div className="flex justify-center items-center h-40 text-red-500">{error}</div>
        ) : (
          <Tabs
            defaultValue="desktop"
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as 'desktop' | 'browser' | 'app')}
            className="w-full h-full flex flex-col justify-between"
          >
            <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0 mb-10">
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
                value="browser"
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
                {selectedTab === 'browser' && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>
                )}
                Mobile Browser
              </TabsTrigger>
              <TabsTrigger
                value="app"
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
                {selectedTab === 'app' && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>
                )}
                App
              </TabsTrigger>
            </TabsList>            {/* DESKTOP TAB CONTENT */}
            <TabsContent value="desktop" className="m-0 overflow-y-auto h-full ">
              <div className="relative h-full outline-none focus:outline-none flex justify-center items-center ">
                <div className="relative">
                  <Gauge 
                  value1={desktopPercentage} 
                  value2={mobileAppPercentage} 
                  value3={mobileBrowserPercentage}
                  color1='#388fff'
                  color2='#F2F3F5'
                  color3='#F2F3F5'
                  />
                  <CenterOverlay
                    title="Desktop"
                    tooltip={tooltips["Desktop"]}
                    value={desktopData?.value || 0}
                    percentage={desktopPercentage}
                    trendValue={desktopData?.trend || "0%"}
                    isPositiveTrend={desktopData?.isRising || false}
                  />
                </div>
              </div>
            </TabsContent>          {/* BROWSER TAB CONTENT */}
            <TabsContent value="browser" className="m-0 overflow-y-auto">
              <div className="relative h-full outline-none focus:outline-none flex justify-center items-center ">
                <div className="relative">
                  <Gauge 
                  value1={desktopPercentage} 
                  value2={mobileBrowserPercentage} 
                  value3={mobileAppPercentage}
                  color1='#F2F3F5'
                  color2='#388fff'
                  color3='#F2F3F5'
                  />
                  <CenterOverlay
                    title="Mobile Browser"
                    tooltip={tooltips["Mobile Browser"]}
                    value={mobileBrowserData?.value || 0}
                    percentage={mobileBrowserPercentage}
                    trendValue={mobileBrowserData?.trend || "0%"}
                    isPositiveTrend={mobileBrowserData?.isRising || false}
                  />
                </div>
              </div>
            </TabsContent>          {/* APP TAB CONTENT */}
            <TabsContent value="app" className="m-0 overflow-y-auto">
              <div className="relative h-full outline-none focus:outline-none flex justify-center items-center ">
                <div className="relative">
                    <Gauge 
                  value1={desktopPercentage} 
                  value2={mobileBrowserPercentage} 
                  value3={mobileAppPercentage}
               color1='#F2F3F5'
                  color2='#F2F3F5'
                     color3='#388fff'
                  
                  />
                  <CenterOverlay
                    title="Mobile App"
                    tooltip={tooltips["Mobile App"]}
                    value={mobileAppData?.value || 0}
                    percentage={mobileAppPercentage}
                    trendValue={mobileAppData?.trend || "0%"}
                    isPositiveTrend={mobileAppData?.isRising || false}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Card>
  );
};
