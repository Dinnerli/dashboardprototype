
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const RewardsCard = () => {
  return (
    <Card className="w-full h-[450px] animate-slide-in-up shadow-sm overflow-hidden" style={{
      animationDelay: '0.4s'
    }}>
      <div className="flex flex-col h-full">
        <div className="flex px-4 py-4 justify-between items-center border-b border-[#CDD1D7]">
          <div className="flex items-center">
            <span className="font-bold text-lg text-[#233143]">Rewards</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filter icon */}
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* View Report link */}
            <div className="flex items-center border-b border-[#8C9BAC]">
              <span className="text-xs text-[#8C9BAC]">View Report</span>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="flex px-4 items-center w-full bg-white border-b border-[#F2F3F5]">
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
            <div key={num} className="flex py-2 px-4 justify-between items-center border-b border-[#F2F3F5]">
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
