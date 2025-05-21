import { Card, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import styles from "./AdminActivityCard.module.css";

const AdminActivityCard = () => {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  
  // Data object for each month with 3 percentages (should sum to 1 or 100%)
  const barData = [
    { light: 0.35, medium: 0.33, dark: 0.32 }, // Oct
    { light: 0.30, medium: 0.40, dark: 0.30 }, // Nov
    { light: 0.25, medium: 0.45, dark: 0.30 }, // Dec
    { light: 0.40, medium: 0.30, dark: 0.30 }, // Jan
    { light: 0.32, medium: 0.38, dark: 0.30 }, // Feb
    { light: 0.28, medium: 0.36, dark: 0.36 }, // Mar
  ];

  return (
    <Card className="w-full h-full  animate-slide-in-up bg-white overflow-hidden" style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Admin Activity" rightContent={<ViewReportButton />} />
      <div className="flex flex-col ">
        {/* Stats section - not clickable, color line instead of dot, no space below */}
        <div className="flex justify-between items-center p-2 pb-0">
          {/* Course Assigned */}
          <div className="flex items-start rounded-lg p-2">
            <div className="flex flex-col justify-center items-center mr-2">
              <div className="w-1 h-8 rounded bg-[#003072]" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_4px] items-center gap-1">
                <span className="font-poppins text-[10px] text-[#8C9BAC]">Course Assigned</span>
                <Info className="w-[8px] h-[8px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_4px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[16px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-1">
                  <TrendIndicator value="40%" isPositive={true} />
                </div>
              </div>
            </div>
          </div>
          {/* User Creation */}
          <div className="flex items-start rounded-lg p-2">
            <div className="flex flex-col justify-center items-center mr-2">
              <div className="w-1 h-8 rounded bg-[#F5F6F8]" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_4px] items-center gap-1">
                <span className="font-poppins text-[10px] text-[#8C9BAC]">User Creation</span>
                <Info className="w-[8px] h-[8px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_4px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[16px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-1">
                  <TrendIndicator value="40%" isPositive={true} />
                </div>
              </div>
            </div>
          </div>
          {/* Group Assigned */}
          <div className="flex items-start rounded-lg p-2">
            <div className="flex flex-col justify-center items-center mr-2">
              <div className="w-1 h-8 rounded bg-[#CDE4FF]" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_4px] items-center gap-1">
                <span className="font-poppins text-[10px] text-[#8C9BAC]">Group Assigned</span>
                <Info className="w-[8px] h-[8px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_4px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[16px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-1">
                  <TrendIndicator value="40%" isPositive={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chart - three stacked bars per month, matching the design, using Tailwind for spacing */}
        <div className="flex-1 px-4 pb-4 flex items-end">
          <div className="w-full h-[200px] flex items-end justify-between">
            {months.map((month, index) => {
              const { light, medium, dark } = barData[index];
              return (
                <div key={month} className="flex flex-col items-center justify-end h-full">
                  <div className={styles["admin-activity-bar"]}>
                    <div className={styles["admin-activity-bar-light"]} style={{ height: `${128 * light}px` }}></div>
                    <div className={styles["admin-activity-bar-medium"]} style={{ height: `${128 * medium}px` }}></div>
                    <div className={styles["admin-activity-bar-dark"]} style={{ height: `${128 * dark}px` }}></div>
                  </div>
                  <span className="text-[10px] text-[#8C9BAC] mt-2">{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
