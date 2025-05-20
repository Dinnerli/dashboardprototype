import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";

const RewardsCard = () => {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'rank'>('certificates');

  return (
    <Card className="w-full h-[450px] animate-slide-in-up shadow-sm overflow-hidden" style={{
      animationDelay: '0.4s'
    }}>
      <CardHeader title="Rewards" rightContent={<ViewReportButton />} />
      <div className="flex flex-col h-full">
        {/* Tabs section */}
        <div className="flex px-4 items-center w-full bg-white border-b border-[#F5F6F8]">
          <div 
            className={`flex py-2 px-2 flex-col justify-center items-center cursor-pointer transition-all duration-200 ${
              selectedTab === 'certificates' ? 'border-b-2 border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedTab('certificates')}
          >
            <span className={`font-semibold text-xs transition-colors duration-200 ${
              selectedTab === 'certificates' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
            }`}>Certificates</span>
          </div>
          <div 
            className={`flex py-2 px-2 flex-col justify-center items-center cursor-pointer transition-all duration-200 ${
              selectedTab === 'rank' ? 'border-b-2 border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedTab('rank')}
          >
            <span className={`font-semibold text-xs transition-colors duration-200 ${
              selectedTab === 'rank' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
            }`}>Rank Lobby</span>
          </div>
        </div>

        {/* Certificate list */}
        <div className="flex flex-col w-full overflow-y-auto h-[calc(100%-88px)]">
          {[1, 2, 3, 4, 5].map((num, index) => (
            <div key={num} className="flex py-2 px-4 justify-between items-center border-b border-[#F5F6F8]">
              <div className="flex h-9 justify-center items-center pr-2">
                <span className="w-2 text-[#4F5A69] text-center text-xs">{num}</span>
              </div>
              <div className="flex h-9 flex-col justify-center items-start flex-1">
                <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-xs">Marketing Certification</span>
                <span className="w-full text-[#8C9BAC] text-[10px]">End date: 18-03-26</span>
              </div>
              <div className="flex justify-end items-center gap-1">
                <div className="flex flex-col justify-center items-end">
                  <span className="text-[#4F5A69] font-bold text-base">237</span>
                </div>
                <div className="flex justify-end items-center">
                  {index % 2 === 0 ? (
                    <>
                      <span className="text-[#00D764] text-right text-[10px]">40%</span>
                      <ArrowUp className="w-3 h-3 text-[#00D764]" />
                    </>
                  ) : (
                    <>
                      <span className="text-[#ED5158] text-right text-[10px]">40%</span>
                      <ArrowDown className="w-3 h-3 text-[#ED5158]" />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RewardsCard;
