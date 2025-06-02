import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MarketingCertificationsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={`${isMobile ? 'w-full h-auto' : 'w-[455px] h-[555px]'} animate-slide-in-up`} style={{
      animationDelay: '0.4s'
    }}>
      <div className="flex px-6 py-6 justify-between items-center border-b border-[#CDD1D7]">
        <div className="flex items-center gap-2.5 flex-1">
          <span className="font-bold text-[22px] text-[#233143]">Rewards</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Filter icon */}
          <div className="flex items-center">
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.1975 7.57495L4.5 13.5" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* View Report link */}
          <div className="flex items-center border-b border-[#8C9BAC]">
            <span className="text-xs text-[#8C9BAC] px-2">View Report</span>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="flex px-5 items-center gap-5 w-full bg-white">
        <div className="flex p-5 flex-col justify-center items-center gap-2.5 border-b-4 border-[#338FFF]">
          <span className="text-[#338FFF] font-bold text-base">Certificates</span>
        </div>
        <div className="flex p-5 flex-col justify-center items-center gap-2.5">
          <span className="text-[#8C9BAC] font-bold text-base">Rank Lobby</span>
        </div>
      </div>

      {/* Certificate list */}
      <div className="flex flex-col w-full h-[400px] overflow-y-auto">
        {/* Certificate 1 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex h-[55px] p-2.5 justify-center items-center">
            <span className="w-[13px] text-[#4F5A69] text-center text-xs">1</span>
          </div>
          <div className="flex h-[55px] p-2.5 flex-col justify-center items-start flex-1">
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm leading-6">Marketing Certification</span>
            <span className="w-full text-[#8C9BAC] text-xs">End date: 18-03-26</span>
          </div>
          <div className="flex p-0 px-2.5 justify-end items-center gap-2.5">
            <div className="flex flex-col justify-center items-end">
              <span className="text-[#4F5A69] font-bold text-2xl">237</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="text-[#00D764] text-right text-sm">40%</span>
              <ArrowUp className="w-4 h-4 text-[#00D764]" />
            </div>
          </div>
        </div>

        {/* Certificate 2 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex h-[55px] p-2.5 justify-center items-center">
            <span className="w-[13px] text-[#4F5A69] text-center text-xs">2</span>
          </div>
          <div className="flex h-[55px] p-2.5 flex-col justify-center items-start flex-1">
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm leading-6">Marketing Certification</span>
            <span className="w-full text-[#8C9BAC] text-xs">End date: 18-03-26</span>
          </div>
          <div className="flex p-0 px-2.5 justify-end items-center gap-2.5">
            <div className="flex flex-col justify-center items-end">
              <span className="text-[#4F5A69] font-bold text-2xl">237</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="text-[#ED5158] text-right text-sm">40%</span>
              <ArrowDown className="w-4 h-4 text-[#ED5158]" />
            </div>
          </div>
        </div>

        {/* Certificate 3 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex h-[55px] p-2.5 justify-center items-center">
            <span className="w-[13px] text-[#4F5A69] text-center text-xs">3</span>
          </div>
          <div className="flex h-[55px] p-2.5 flex-col justify-center items-start flex-1">
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm leading-6">Marketing Certification</span>
            <span className="w-full text-[#8C9BAC] text-xs">End date: 18-03-26</span>
          </div>
          <div className="flex p-0 px-2.5 justify-end items-center gap-2.5">
            <div className="flex flex-col justify-center items-end">
              <span className="text-[#4F5A69] font-bold text-2xl">237</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="text-[#00D764] text-right text-sm">40%</span>
              <ArrowUp className="w-4 h-4 text-[#00D764]" />
            </div>
          </div>
        </div>

        {/* Certificate 4 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex h-[55px] p-2.5 justify-center items-center">
            <span className="w-[13px] text-[#4F5A69] text-center text-xs">4</span>
          </div>
          <div className="flex h-[55px] p-2.5 flex-col justify-center items-start flex-1">
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm leading-6">Marketing Certification</span>
            <span className="w-full text-[#8C9BAC] text-xs">End date: 18-03-26</span>
          </div>
          <div className="flex p-0 px-2.5 justify-end items-center gap-2.5">
            <div className="flex flex-col justify-center items-end">
              <span className="text-[#4F5A69] font-bold text-2xl">237</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="text-[#ED5158] text-right text-sm">40%</span>
              <ArrowDown className="w-4 h-4 text-[#ED5158]" />
            </div>
          </div>
        </div>

        {/* Certificate 5 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex h-[55px] p-2.5 justify-center items-center">
            <span className="w-[13px] text-[#4F5A69] text-center text-xs">5</span>
          </div>
          <div className="flex h-[55px] p-2.5 flex-col justify-center items-start flex-1">
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm leading-6">Marketing Certification</span>
            <span className="w-full text-[#8C9BAC] text-xs">End date: 18-03-26</span>
          </div>
          <div className="flex p-0 px-2.5 justify-end items-center gap-2.5">
            <div className="flex flex-col justify-center items-end">
              <span className="text-[#4F5A69] font-bold text-2xl">237</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="text-[#00D764] text-right text-sm">40%</span>
              <ArrowUp className="w-4 h-4 text-[#00D764]" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MarketingCertificationsCard;
