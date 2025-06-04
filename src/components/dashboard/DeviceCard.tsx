import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Card } from '../ui/card';
import InfoTooltip from '../ui/InfoTooltip';
import CardHeader from './CardHeader';
import TrendIndicator from './common/TrendIndicator';
import ViewReportButton from './ViewReportButton';

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
  const COLORS = ['#388fff', '#CDD1D7'];

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

      <div className="flex flex-col justify-between">
        <Tabs
          defaultValue="desktop"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as 'desktop' | 'mobile')}
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
          <TabsContent value="desktop" className="m-0 overflow-y-auto h-full ">
            <div className="relative h-full outline-none focus:outline-none flex justify-center items-center ">
              <div className="relative">
          
               
              </div>
            </div>
          </TabsContent>

          {/* MOBILE TAB CONTENT */}
          <TabsContent value="mobile" className="m-0 overflow-y-auto">
            <div className="relative h-full outline-none focus:outline-none flex justify-center items-center ">
              <div className="relative">
                
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
