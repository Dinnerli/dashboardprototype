import { Card, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import StatButton from "./activities/StatButton";

const DevicesCard = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | null>(null);

  // Device stats data
  const deviceStats = [
    {
      key: 'desktop',
      title: 'Desktop',
      value: '77%',
      percentage: '40%',
      isPositive: true
    },
    {
      key: 'mobile',
      title: 'Mobile',
      value: '23%',
      percentage: '40%',
      isPositive: false
    }
  ];

  // For mobile, split into browser/app
  const mobileBrowser = 14; // percent
  const mobileApp = 9; // percent
  const mobileTotal = mobileBrowser + mobileApp; // 23

  // Colors
  const desktopColor = '#338FFF';
  const mobileBrowserColor = '#338FFF';
  const mobileAppColor = '#003072';
  const bgColor = '#F8F9FA';

  // Donut chart config
  const donutSize = 251.2; // circumference for r=40
  const desktopOffset = donutSize * (1 - 0.77); // 77% arc
  const mobileBrowserOffset = donutSize * (1 - mobileBrowser / 100);
  const mobileAppOffset = donutSize * (1 - (mobileApp / 100));
  const mobileStart = donutSize * (1 - (mobileTotal / 100));

  return (
    <Card className="w-auto h-full px-4 pb-4  animate-slide-in-up bg-white overflow-hidden" style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Devices" rightContent={<ViewReportButton />} />
      <div className="flex flex-col h-full">
        {/* Device options section - reduced padding */}
        <div className="flex gap-2 px-4 py-3">
          {deviceStats.map((stat) => (
            <div
              key={stat.key}
              className={`flex-1`}
            >
              <StatButton
                title={stat.title}
                value={stat.value}
                percentage={stat.percentage}
                isActive={selectedDevice === stat.key}
                isPositive={stat.isPositive}
                onClick={() => setSelectedDevice(stat.key as 'desktop' | 'mobile')}
              />
            </div>
          ))}
        </div>
        {/* Color indicator legend for mobile (above chart) */}
        {selectedDevice === 'mobile' && (
          <div className="flex justify-center gap-4 pb-2">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#338FFF]"></span>
              <span className="text-xs text-[#233143]">Browser</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#003072]"></span>
              <span className="text-xs text-[#233143]">App</span>
            </div>
          </div>
        )}
        {/* Circle Graph */}
        <div className="flex justify-center items-center flex-1 px-4 pb-4">
          <div className="w-48 h-48 relative">
            {/* White circle background to ensure the middle is white */}
            <div className="w-full h-full rounded-full bg-white absolute"></div>
            {/* Light gray background circle */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={bgColor}
                strokeWidth="15"
              />
            </svg>
            {/* Donut segments */}
            {selectedDevice === 'mobile' ? (
              <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                {/* Browser segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={mobileBrowserColor}
                  strokeWidth="15"
                  strokeDasharray={`${donutSize * (mobileBrowser / mobileTotal)} ${donutSize}`}
                  strokeDashoffset={mobileStart}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                {/* App segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={mobileAppColor}
                  strokeWidth="15"
                  strokeDasharray={`${donutSize * (mobileApp / mobileTotal)} ${donutSize}`}
                  strokeDashoffset={mobileStart + donutSize * (mobileBrowser / mobileTotal)}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                {/* Desktop segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={desktopColor}
                  strokeWidth="15"
                  strokeDasharray={`${donutSize} ${donutSize}`}
                  strokeDashoffset={desktopOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            )}
            {/* White center circle to create donut hole */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] bg-white rounded-full"></div>
          </div>
        </div>
        {/* Color indicator legend for mobile */}
        {selectedDevice === 'mobile' && (
          <div className="flex justify-center gap-4 pb-2">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#338FFF]"></span>
              <span className="text-xs text-[#233143]">Browser</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#003072]"></span>
              <span className="text-xs text-[#233143]">App</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DevicesCard;
