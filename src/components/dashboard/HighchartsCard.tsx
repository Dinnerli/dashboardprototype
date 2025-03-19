
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface HighchartsCardProps {
  title?: string;
}

const HighchartsCard = ({
  title = "Performance Metrics"
}: HighchartsCardProps) => {
  return (
    <Card className="w-full h-[555px] shadow-sm animate-slide-in-up font-poppins" style={{
      animationDelay: '0.4s'
    }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Chart data will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighchartsCard;
