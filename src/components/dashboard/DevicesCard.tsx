
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const DevicesCard = () => {
  return (
    <Card className="w-full h-[555px] shadow-sm animate-slide-in-up bg-white" style={{ animationDelay: '0.4s' }}>
      <div className="flex flex-col h-full p-8">
        {/* Header section */}
        <div className="flex justify-between items-center w-full pb-5 border-b border-[#E5E7EA]">
          <div className="flex items-center">
            <h3 className="font-bold text-[22px] text-[#233143]">Devices</h3>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filter icon */}
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4 2.1H18.6C19.7 2.1 20.6 3 20.6 4.1V6.3C20.6 7.1 20.1 8.1 19.6 8.6L14.3 13.2C13.7 13.7 13.3 14.7 13.3 15.5V19.5C13.3 20.1 12.9 20.9 12.4 21.2L11 22.1C9.6 22.9 7.8 21.9 7.8 20.2V15.4C7.8 14.7 7.4 13.8 7 13.3L2.9 9C2.4 8.5 2 7.6 2 7V4.2C2 3 2.9 2.1 4 2.1H5.5H5.4Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* View Report link */}
            <a href="#" className="text-[#8C9BAC] text-sm border-b border-[#8C9BAC] hover:text-blue-500 transition-colors">
              View Report
            </a>
          </div>
        </div>

        {/* Content section with more padding */}
        <div className="flex flex-col h-full pt-8">
          {/* Device options section */}
          <div className="flex gap-6 mb-8">
            {/* Desktop Option */}
            <div className="bg-[#F8F9FA] rounded-lg p-6 flex-1">
              <div className="flex items-start gap-3">
                {/* Blue vertical indicator */}
                <div className="w-1 h-14 bg-[#338FFF] rounded-full self-center"></div>
                
                <div className="flex-1">
                  {/* Title row */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[#338FFF]">Desktop</span>
                    <Info size={16} className="text-[#8C9BAC]" />
                  </div>
                  
                  {/* Stats row */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-3xl text-[#233143]">77%</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#00D764] font-medium">40%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 6.38004L8.00001 2.33337L3.95334 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Option */}
            <div className="bg-[#F8F9FA] rounded-lg p-6 flex-1">
              <div className="flex items-start gap-3">
                {/* No indicator for inactive */}
                <div className="w-1 h-14 bg-transparent rounded-full self-center"></div>
                
                <div className="flex-1">
                  {/* Title row */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[#8C9BAC]">Mobile</span>
                    <Info size={16} className="text-[#8C9BAC]" />
                  </div>
                  
                  {/* Stats row */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-3xl text-[#233143]">23%</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#ED5158] font-medium">40%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div className="flex justify-center items-center flex-1">
            <div className="w-64 h-64 relative">
              {/* Background circle */}
              <div className="w-full h-full rounded-full bg-[#F8F9FA] absolute"></div>
              
              {/* Blue donut segment (approximately 77% coverage) */}
              <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#F8F9FA"
                  strokeWidth="15"
                />
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
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DevicesCard;
