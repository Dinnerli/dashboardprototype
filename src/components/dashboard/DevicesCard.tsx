import { Card } from "@/components/ui/card";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import StatButton from "./activities/StatButton";
import { useIsMobile } from "@/hooks/use-mobile";
import deviceData from "@/Data/DeviceCard.json";

const DevicesCard = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile'>("desktop");
  const isMobile = useIsMobile();
  // Extract data from JSON
  const stats = deviceData.DevicesCard.stats;
  const desktopStat = stats.find((s) => s.name.toLowerCase() === "desktop");
  const mobileStat = stats.find((s) => s.name.toLowerCase() === "mobile");
  const desktopValue = desktopStat?.value || 0;
  const mobileValue = mobileStat?.value || 0;

  // For mobile, split into browser/app
  const mobileBrowser = mobileStat?.subValues?.browser?.value || 0;
  const mobileApp = mobileStat?.subValues?.app?.value || 0;
  
  // Total includes all three: desktop, mobile browser, mobile app
  const total = desktopValue + mobileBrowser + mobileApp;
  const desktopPercent = total ? (desktopValue / total) * 100 : 0;
  const browserPercent = total ? (mobileBrowser / total) * 100 : 0;
  const appPercent = total ? (mobileApp / total) * 100 : 0;
  const mobilePercent = browserPercent + appPercent;

  // Colors
  const desktopColor = '#338FFF';
  const mobileBrowserColor = '#00B6F0'; // distinct blue for browser
  const mobileAppColor = '#003072'; // dark blue for app
  const grayColor = '#E5E7EB';
  const bgColor = '#F8F9FA';
  // Donut chart config
  const donutSize = 251.2; // circumference for r=40
  // Calculate arc lengths for all 3 segments
  const desktopArc = donutSize * (desktopPercent / 100);
  const browserArc = donutSize * (browserPercent / 100);
  const appArc = donutSize * (appPercent / 100);

  return (
    <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[555px]'} p-6 animate-slide-in-up bg-white overflow-hidden`}
      style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Devices" rightContent={isMobile ? null : <ViewReportButton />} />
      <div className="flex flex-col h-full">
        {/* Device options section */}
        <div className={isMobile ? 'flex flex-col gap-2 py-4' : 'flex flex-row py-6'}>
          <div className={isMobile ? 'w-full' : 'flex-1 flex justify-between'}>            <StatButton
              title="Desktop"
              value={desktopPercent.toFixed(0) + '%'}
              percentage={desktopStat?.trend || '0%'}
              isActive={selectedDevice === 'desktop'}
              isPositive={!!desktopStat?.isRising}
              onClick={() => setSelectedDevice('desktop')}
              tooltip={'Percentage of total users from desktop devices.'}
            />
          </div>
          <div className={isMobile ? 'w-full' : 'flex-1 flex justify-between'}>            <StatButton
              title="Mobile"
              value={mobilePercent.toFixed(0) + '%'}
              percentage={mobileStat?.trend || '0%'}
              isActive={selectedDevice === 'mobile'}
              isPositive={!!mobileStat?.isRising}
              onClick={() => setSelectedDevice('mobile')}
              tooltip={'Percentage of total users from mobile devices (browser + app)'
              }
            />
          </div>
        </div>
        {/* Chart section */}
        <div className="flex flex-col items-center justify-center flex-1 px-12 py-8">
          <div className="flex justify-center items-center w-full mb-6">
            <div className="w-full max-w-md aspect-square relative">
              {/* White circle background */}
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
              </svg>              {/* Donut segments */}
              {selectedDevice === 'desktop' ? (
                <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                  {/* Desktop segment colored */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={desktopColor}
                    strokeWidth="15"
                    strokeDasharray={`${desktopArc} ${donutSize}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Browser segment gray */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={grayColor}
                    strokeWidth="15"
                    strokeDasharray={`${browserArc} ${donutSize}`}
                    strokeDashoffset={-desktopArc}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  {/* App segment gray */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={grayColor}
                    strokeWidth="15"
                    strokeDasharray={`${appArc} ${donutSize}`}
                    strokeDashoffset={-(desktopArc + browserArc)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                  {/* Desktop segment gray */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={grayColor}
                    strokeWidth="15"
                    strokeDasharray={`${desktopArc} ${donutSize}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Browser segment colored */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={mobileBrowserColor}
                    strokeWidth="15"
                    strokeDasharray={`${browserArc} ${donutSize}`}
                    strokeDashoffset={-desktopArc}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  {/* App segment colored */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={mobileAppColor}
                    strokeWidth="15"
                    strokeDasharray={`${appArc} ${donutSize}`}
                    strokeDashoffset={-(desktopArc + browserArc)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              )}
              {/* White center circle to create donut hole */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] bg-white rounded-full"></div>
            </div>
          </div>          {/* Color indicators */}
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <span className={`inline-block w-3 h-3 rounded-full ${selectedDevice === 'desktop' ? 'bg-[#338FFF]' : 'bg-gray-300'}`}></span>
              <span className="text-xs text-[#233143]">Desktop</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`inline-block w-3 h-3 rounded-full ${selectedDevice === 'mobile' ? 'bg-[#00B6F0]' : 'bg-gray-300'}`}></span>
              <span className="text-xs text-[#233143]">Browser</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`inline-block w-3 h-3 rounded-full ${selectedDevice === 'mobile' ? 'bg-[#003072]' : 'bg-gray-300'}`}></span>
              <span className="text-xs text-[#233143]">App</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DevicesCard;
