import { Card, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import styles from "./AdminActivityCard.module.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { HalfGauge } from "../ui/halfGauge";
import { CenterOverlay } from "./CenterOverlay";
import { useAdminActivity } from "@/hooks/useAdminActivity";
import { useState } from "react";
import EmptyState from "./EmptyState";
import AdminActivityCardSkeleton from "../Skeletons/AdminActivityCard.skeleton";

const AdminActivityCard = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const isMobile = useIsMobile();
  
  // State to track which activity is selected
  const [selectedActivity, setSelectedActivity] = useState<'create' | 'edit' | 'delete'>('create');
  
  // Fetch admin activity data from API
  const { data: adminActivityData, loading, error, message } = useAdminActivity({ startDate, endDate });
    // Handle loading state
  if (loading) {
    return <AdminActivityCardSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
        style={{ animationDelay: '0.4s' }}>
        <CardHeader title="Admin Activity" rightContent={isMobile ? null : <ViewReportButton />} />
        <div className="flex items-center justify-center h-full">
          <span className="text-red-500">Error: {error}</span>
        </div>
      </Card>
    );
  }

  // Handle no data state
  if (!adminActivityData || adminActivityData.length === 0) {
    return (
      <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
        style={{ animationDelay: '0.4s' }}>
        <CardHeader title="Admin Activity" rightContent={isMobile ? null : <ViewReportButton target="admin_recent_admin_activities.php"/>} />
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">No data available</span>
        </div>
      </Card>
    );
  }

  // Map API data to expected format
  const createData = adminActivityData.find(item => item.name.toLowerCase() === 'added') || { name: 'Added', value: 0, trend: '0%', isRising: false };
  const editData = adminActivityData.find(item => item.name.toLowerCase() === 'edited') || { name: 'Edited', value: 0, trend: '0%', isRising: false };
  const deleteData = adminActivityData.find(item => item.name.toLowerCase() === 'deleted');

  // Only include activities that have data (exist in response)
  const availableActivities = adminActivityData.map(item => item.name.toLowerCase());
  const hasDeletedData = availableActivities.includes('deleted');
  
  // Calculate total value and percentages only for available activities
  const totalValue = adminActivityData.reduce((sum, item) => sum + item.value, 0);
  const createPercent = totalValue > 0 ? Math.round((createData.value / totalValue) * 100) : 0;
  const editPercent = totalValue > 0 ? Math.round((editData.value / totalValue) * 100) : 0;  const deletePercent = hasDeletedData && deleteData ? Math.round((deleteData.value / totalValue) * 100) : 0;

  // Check if all three values are 0 to show empty state
  const allValuesZero = createData.value === 0 && editData.value === 0 && (deleteData?.value || 0) === 0;

  // If selected activity is 'delete' but we don't have deleted data, switch to first available
  const currentSelectedActivity = (!hasDeletedData && selectedActivity === 'delete') 
    ? (availableActivities.includes('added') ? 'create' : 'edit')
    : selectedActivity;

  // Get data for the selected activity
  const getSelectedActivityData = () => {
    switch (currentSelectedActivity) {
      case 'create':
        return {
          title: 'Added',
          tooltip: 'Total number of create operations by administrators',
          value: createData.value,
          percentage: createPercent,
          trendValue: createData.trend,
          isPositiveTrend: createData.isRising,
        };
      case 'edit':
        return {
          title: 'Edited',
          tooltip: 'Total number of edit operations by administrators',
          value: editData.value,
          percentage: editPercent,
          trendValue: editData.trend,
          isPositiveTrend: editData.isRising,
        };
      case 'delete':
        return {
          title: 'Deleted',
          tooltip: 'Total number of delete operations by administrators',
          value: deleteData?.value || 0,
          percentage: deletePercent,
          trendValue: deleteData?.trend || '0%',
          isPositiveTrend: deleteData?.isRising || false,
        };
      default:
        return {
          title: 'Added',
          tooltip: 'Total number of create operations by administrators',
          value: createData.value,
          percentage: createPercent,
          trendValue: createData.trend,
          isPositiveTrend: createData.isRising,
        };
    }
  };
  const selectedData = getSelectedActivityData();

  // Show empty state if all values are 0
  if (allValuesZero) {
    return (
      <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
        style={{ animationDelay: '0.4s' }}>
        <CardHeader title="Admin Activity" rightContent={isMobile ? null : <ViewReportButton />} />
        <EmptyState cardName="admin activities" />
      </Card>
    );
  }

  return (
    <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Admin Activity" rightContent={isMobile ? null : <ViewReportButton />} />
      
      <div className="flex flex-col items-center justify-center relative h-full">  
        {/* Info Note - only show if message exists */}
        {message && (
          <div className="flex items-center justify-center mb-10 px-4">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                {message}
              </span>
            </div>
          </div>
        )}
        
        <div className="relative">          <HalfGauge
            value1={createData.value}
            value2={editData.value}
            value3={hasDeletedData && deleteData ? deleteData.value : undefined}
            color1="#1E4273"
            color2="#388fff"
            color3="#CDE4FF"
            gapPercent={9}
            size={isMobile ? 300 : 340}
            strokeWidth={8}
            onArc1Click={() => availableActivities.includes('added') && setSelectedActivity('create')}
            onArc2Click={() => availableActivities.includes('edited') && setSelectedActivity('edit')}
            onArc3Click={() => hasDeletedData && setSelectedActivity('delete')}
            activeArc={currentSelectedActivity === 'create' ? 1 : currentSelectedActivity === 'edit' ? 2 : 3}
          />
          <CenterOverlay
            title={selectedData.title}
            tooltip={selectedData.tooltip}
            value={selectedData.value}
            percentage={selectedData.percentage}
            trendValue={selectedData.trendValue}
            isPositiveTrend={selectedData.isPositiveTrend}
          />
          
          {/* Legends - only show legends for available activities */}
          <div className="flex justify-center gap-8 mt-0 md:translate-x-[-50%] absolute bottom-4 left-1/2 transform -translate-x-1/2">
            {availableActivities.includes('added') && (
              <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${currentSelectedActivity === 'create' ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
                onClick={() => setSelectedActivity('create')}
              >
                <div className="w-3 h-3 rounded-full bg-[#1E4273]"></div>
                <span className="text-sm text-[#4F5A69]">Added</span>
              </div>
            )}
            {availableActivities.includes('edited') && (
              <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${currentSelectedActivity === 'edit' ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
                onClick={() => setSelectedActivity('edit')}
              >
                <div className="w-3 h-3 rounded-full bg-[#388fff]"></div>
                <span className="text-sm text-[#4F5A69]">Edited</span>
              </div>
            )}
            {hasDeletedData && (
              <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${currentSelectedActivity === 'delete' ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
                onClick={() => setSelectedActivity('delete')}
              >
                <div className="w-3 h-3 rounded-full bg-[#CDE4FF]"></div>
                <span className="text-sm text-[#4F5A69]">Deleted</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
