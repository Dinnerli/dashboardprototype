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
import { useState } from "react";

const AdminActivityCard = () => {
  const isMobile = useIsMobile();
  
  // Extract data from JSON
  const { create, edit, delete: deleteData } = adminActivityData.adminActivity;
  
  // State to track which activity is selected
  const [selectedActivity, setSelectedActivity] = useState<'create' | 'edit' | 'delete'>('create');
  
  // Calculate total value and percentages
  const totalValue = create.value + edit.value + deleteData.value;
  const createPercent = Math.round((create.value / totalValue) * 100);
  const editPercent = Math.round((edit.value / totalValue) * 100);
  const deletePercent = Math.round((deleteData.value / totalValue) * 100);

  // Get data for the selected activity
  const getSelectedActivityData = () => {
    switch (selectedActivity) {
      case 'create':
        return {
          title: 'Create',
          tooltip: 'Total number of create operations by administrators',
          value: create.value,
          percentage: createPercent,
          trendValue: create.trend,
          isPositiveTrend: create.isRising,
        };
      case 'edit':
        return {
          title: 'Edit',
          tooltip: 'Total number of edit operations by administrators',
          value: edit.value,
          percentage: editPercent,
          trendValue: edit.trend,
          isPositiveTrend: edit.isRising,
        };
      case 'delete':
        return {
          title: 'Delete',
          tooltip: 'Total number of delete operations by administrators',
          value: deleteData.value,
          percentage: deletePercent,
          trendValue: deleteData.trend,
          isPositiveTrend: deleteData.isRising,
        };
      default:
        return {
          title: 'Create',
          tooltip: 'Total number of create operations by administrators',
          value: create.value,
          percentage: createPercent,
          trendValue: create.trend,
          isPositiveTrend: create.isRising,
        };
    }
  };

  const selectedData = getSelectedActivityData();

  return (
    <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Admin Activity" rightContent={isMobile ? null : <ViewReportButton />} />      
      <div className="flex flex-col items-center justify-center relative h-full">        <div className="relative ">
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
            onArc1Click={() => setSelectedActivity('create')}
            onArc2Click={() => setSelectedActivity('edit')}
            onArc3Click={() => setSelectedActivity('delete')}
            activeArc={selectedActivity === 'create' ? 1 : selectedActivity === 'edit' ? 2 : 3}
          />
          <CenterOverlay
            title={selectedData.title}
            tooltip={selectedData.tooltip}
            value={selectedData.value}
            percentage={selectedData.percentage}
            trendValue={selectedData.trendValue}
            isPositiveTrend={selectedData.isPositiveTrend}
          />
        </div>
          {/* Legends */}
        <div className="flex justify-center gap-8 mt-0 pt-0">
          <div 
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${selectedActivity === 'create' ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
            onClick={() => setSelectedActivity('create')}
          >
            <div className="w-3 h-3 rounded-full bg-[#1E4273]"></div>
            <span className="text-sm text-[#4F5A69]">Create</span>
          </div>
          <div 
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${selectedActivity === 'edit' ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
            onClick={() => setSelectedActivity('edit')}
          >
            <div className="w-3 h-3 rounded-full bg-[#388fff]"></div>
            <span className="text-sm text-[#4F5A69]">Edit</span>
          </div>
          <div 
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${selectedActivity === 'delete' ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
            onClick={() => setSelectedActivity('delete')}
          >
            <div className="w-3 h-3 rounded-full bg-[#CDE4FF]"></div>
            <span className="text-sm text-[#4F5A69]">Delete</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
