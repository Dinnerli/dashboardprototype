
import { Card } from "@/components/ui/card";
import { Info, ArrowUp } from "lucide-react";

const AdminActivityCard = () => {
  return (
    <Card className="w-full animate-slide-in-up shadow-sm" style={{ animationDelay: '0.4s' }}>
      <div className="px-6 py-6 flex justify-between items-center border-b border-[#CDD1D7]">
        <div className="flex items-center gap-2.5 flex-1">
          <span className="font-bold text-[22px] text-[#233143]">Admin Activity</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.1975 7.57495L4.5 13.5" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-[#8C9BAC] border-b border-[#8C9BAC] px-2">View Report</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 flex flex-col h-[431px]">
        {/* Stats section - rearranged to the top */}
        <div className="flex items-center justify-between w-full py-4">
          {/* Course Assigned */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="13" r="5" fill="#003072"/>
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8C9BAC]">Course Assigned</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.99998 0.833292C7.29165 0.833292 9.16665 2.70829 9.16665 4.99996C9.16665 7.29163 7.29165 9.16663 4.99998 9.16663C2.70831 9.16663 0.833313 7.29163 0.833313 4.99996C0.833313 2.70829 2.70831 0.833292 4.99998 0.833292Z" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 6.66663V4.58329" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.99768 3.33337H5.00142" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-sm text-[#00D764]">40%</span>
                    <ArrowUp className="w-4 h-4 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Creation */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="13" r="5" fill="#F2F3F5"/>
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8C9BAC]">User Creation</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.99998 0.833292C7.29165 0.833292 9.16665 2.70829 9.16665 4.99996C9.16665 7.29163 7.29165 9.16663 4.99998 9.16663C2.70831 9.16663 0.833313 7.29163 0.833313 4.99996C0.833313 2.70829 2.70831 0.833292 4.99998 0.833292Z" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 6.66663V4.58329" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.99768 3.33337H5.00142" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-sm text-[#00D764]">40%</span>
                    <ArrowUp className="w-4 h-4 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Group Assigned */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="13" r="5" fill="#CDE4FF"/>
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8C9BAC]">Group Assigned</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.99998 0.833292C7.29165 0.833292 9.16665 2.70829 9.16665 4.99996C9.16665 7.29163 7.29165 9.16663 4.99998 9.16663C2.70831 9.16663 0.833313 7.29163 0.833313 4.99996C0.833313 2.70829 2.70831 0.833292 4.99998 0.833292Z" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 6.66663V4.58329" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.99768 3.33337H5.00142" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-sm text-[#00D764]">40%</span>
                    <ArrowUp className="w-4 h-4 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart section - now below the stats with proper padding */}
        <div className="flex items-center justify-center w-full px-5 mt-4 flex-1">
          <div className="w-full h-full flex flex-col">
            {/* Bar chart with fixed height */}
            <div className="flex justify-between items-end gap-2 pb-2 h-[200px]">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-0.5 w-10 h-full">
                  <div className="flex-1 w-full flex flex-col items-center gap-0.5 justify-end">
                    <div className="w-full rounded-2xl bg-[#CDE4FF] h-[30%]"></div>
                    <div className="w-full rounded-2xl bg-[#338FFF] h-[30%]"></div>
                    <div className="w-full rounded-2xl bg-[#003072] h-[30%]"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart x-axis */}
            <div className="h-px w-full bg-[#CDD1D7]"></div>
            <div className="flex justify-between w-full pt-1">
              <span className="text-[10px] text-[#CDD1D7]">Oct</span>
              <span className="text-[10px] text-[#CDD1D7]">Nov</span>
              <span className="text-[10px] text-[#CDD1D7]">Dec</span>
              <span className="text-[10px] text-[#CDD1D7]">Jan</span>
              <span className="text-[10px] text-[#CDD1D7]">Feb</span>
              <span className="text-[10px] text-[#CDD1D7]">Mar</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
