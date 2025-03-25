import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const RewardsCard = () => {
  return (
    <Card className="w-full h-[450px] animate-slide-in-up shadow-sm overflow-hidden" style={{
      animationDelay: '0.4s'
    }}>
      <div className="flex flex-col h-full">
        <div className="flex px-4 py-4 justify-between items-center border-b border-[#CDD1D7]">
          <div className="flex items-center">
            <CardTitle>Rewards</CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Updated Filter icon */}
            <div className="flex items-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.04993 1.57495H13.9499C14.7749 1.57495 15.4499 2.24995 15.4499 3.07495V4.72495C15.4499 5.32495 15.0749 6.07495 14.6999 6.44995L11.4749 9.29995C11.0249 9.67495 10.7249 10.425 10.7249 11.025V14.25C10.7249 14.7 10.4249 15.3 10.0499 15.525L8.99993 16.2C8.02493 16.8 6.67493 16.125 6.67493 14.925V10.95C6.67493 10.425 6.37493 9.74995 6.07493 9.37495L3.22493 6.37495C2.84993 5.99995 2.54993 5.32495 2.54993 4.87495V3.14995C2.54993 2.24995 3.22493 1.57495 4.04993 1.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.1975 1.57495L4.5 7.49995" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* View Report link */}
            <div className="flex items-center border-b border-[#8C9BAC]">
              <span className="text-xs text-[#8C9BAC]">View Report</span>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="flex px-4 items-center w-full bg-white border-b border-[#F5F6F8]">
          <div className="flex py-2 px-2 flex-col justify-center items-center border-b-2 border-[#338FFF]">
            <span className="text-[#338FFF] font-semibold text-xs">Certificates</span>
          </div>
          <div className="flex py-2 px-2 flex-col justify-center items-center">
            <span className="text-[#8C9BAC] font-semibold text-xs">Rank Lobby</span>
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
