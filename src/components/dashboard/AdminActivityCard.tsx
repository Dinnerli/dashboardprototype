import { Card, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import styles from "./AdminActivityCard.module.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { HalfGauge } from "../ui/halfGauge";
import { CenterOverlay } from "./CenterOverlay";
import adminActivityData from "@/Data/AdminActivity.json";

const AdminActivityCard = () => {
  const isMobile = useIsMobile();
  
  // Extract data from JSON
  const { create, edit, delete: deleteData } = adminActivityData.adminActivity;
  
  // Calculate total value and percentages
  const totalValue = create.value + edit.value + deleteData.value;  const createPercent = Math.round((create.value / totalValue) * 100);
  const editPercent = Math.round((edit.value / totalValue) * 100);
  const deletePercent = Math.round((deleteData.value / totalValue) * 100);

  return (
    <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Admin Activity" rightContent={isMobile ? null : <ViewReportButton />} />      
      <div className="flex flex-col items-center justify-center relative h-full">
        <div className="relative ">
          <HalfGauge
            value1={create.value}
            value2={edit.value}
            value3={deleteData.value}
            color1="#1E4273"
            color2="#388fff"
            color3="#CDE4FF"
            gapPercent={9}
            size={isMobile ? 300 : 340}
            strokeWidth={8}
        
          />
          <CenterOverlay
            title="Create"
            tooltip="Total number of create operations by administrators"
            value={totalValue}
            percentage={createPercent}
            trendValue={create.trend}
            isPositiveTrend={create.isRising}
          />
        </div>
        
        {/* Legends */}
        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1E4273]"></div>
            <span className="text-sm text-[#4F5A69] ">Create</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#388fff]"></div>
            <span className="text-sm text-[#4F5A69] ">Edit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#CDE4FF]"></div>
            <span className="text-sm text-[#4F5A69] ">Delete</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
