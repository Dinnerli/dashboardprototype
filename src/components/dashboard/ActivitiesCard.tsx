
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ActivitiesCard = () => {
  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="p-6 flex flex-row items-center justify-between border-b border-[#E5E7EA]">
        <h3 className="text-xl font-bold">Activities</h3>
        <Select defaultValue="average">
          <SelectTrigger className="w-auto min-w-[120px] border-none shadow-none bg-white p-2 h-auto focus:ring-0">
            <SelectValue placeholder="Average" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <h4 className="font-bold text-base">User Activities</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="px-4">
                  View All
                </Button>
                <Button variant="outline" size="sm" className="px-4">
                  Export
                </Button>
              </div>
            </div>
            <Separator className="h-0.5 bg-black w-full" />
          </div>
          
          {/* Activities content will go here */}
          <div className="h-48 flex items-center justify-center text-gray-400">
            No activity data to display
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitiesCard;
