import { Card, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";

const DevicesCard = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | null>(null);

  return (
    <Card className="w-full h-[450px] shadow-sm animate-slide-in-up bg-white overflow-hidden" style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Devices" rightContent={<ViewReportButton />} />
      <div className="flex flex-col h-full">
        {/* Device options section - reduced padding */}
        <div className="flex gap-2 px-4 py-3">
          {/* Desktop Option */}
          <div 
            className={`bg-[#F8F9FA] rounded-lg p-3 flex-1 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedDevice === 'desktop' ? 'shadow-md border border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedDevice('desktop')}
          >
            <div className="flex items-start gap-2">
              {/* Blue vertical indicator - only show when selected */}
              <div className={`w-1 h-10 rounded-full self-center transition-colors duration-200 ${
                selectedDevice === 'desktop' ? 'bg-[#338FFF]' : 'bg-transparent'
              }`}></div>
              
              <div className="flex-1">
                {/* Title row */}
                <div className="flex items-center gap-1">
                  <span className={`font-semibold text-sm transition-colors duration-200 ${
                    selectedDevice === 'desktop' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
                  }`}>Desktop</span>
                  <Info size={12} className="text-[#8C9BAC]" />
                </div>
                
                {/* Stats row */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#233143]">77%</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#00D764] text-xs font-medium">40%</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0467 6.38004L8.00001 2.33337L3.95334 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Option */}
          <div 
            className={`bg-[#F8F9FA] rounded-lg p-3 flex-1 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedDevice === 'mobile' ? 'shadow-md border border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedDevice('mobile')}
          >
            <div className="flex items-start gap-2">
              {/* Blue vertical indicator - only show when selected */}
              <div className={`w-1 h-10 rounded-full self-center transition-colors duration-200 ${
                selectedDevice === 'mobile' ? 'bg-[#338FFF]' : 'bg-transparent'
              }`}></div>
              
              <div className="flex-1">
                {/* Title row */}
                <div className="flex items-center gap-1">
                  <span className={`font-semibold text-sm transition-colors duration-200 ${
                    selectedDevice === 'mobile' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
                  }`}>Mobile</span>
                  <Info size={12} className="text-[#8C9BAC]" />
                </div>
                
                {/* Stats row */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#233143]">23%</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#ED5158] text-xs font-medium">40%</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0467 9.61996L8.00001 13.6666L3.95334 9.61996" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
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
                stroke="#F8F9FA"
                strokeWidth="15"
              />
            </svg>
            
            {/* Blue donut segment (approximately 77% coverage) */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#338FFF"
                strokeWidth="15"
                strokeDasharray="251.2 251.2"
                strokeDashoffset="58"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="animate-[dash_1.5s_ease-in-out]"
              />
            </svg>
            
            {/* White center circle to create donut hole */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DevicesCard;
