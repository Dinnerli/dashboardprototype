import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from "react";
interface HighchartsCardProps {
  title?: string;
}
const HighchartsCard = ({
  title = "Performance Metrics"
}: HighchartsCardProps) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    title: {
      text: 'Monthly Performance',
      style: {
        fontFamily: 'Poppins',
        fontSize: '14px'
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Completion Rate (%)'
      }
    },
    series: [{
      type: 'spline',
      name: 'Course Completion',
      data: [43, 52, 57, 69, 72, 75, 80, 65, 60, 63, 68, 76],
      color: '#338FFF'
    }, {
      type: 'spline',
      name: 'Engagement',
      data: [30, 35, 40, 55, 59, 68, 62, 50, 45, 60, 65, 70],
      color: '#00D764'
    }],
    credits: {
      enabled: false
    },
    legend: {
      itemStyle: {
        fontFamily: 'Poppins'
      }
    }
  });
  return <Card className="w-[455px] h-[555px] shadow-sm animate-slide-in-up font-poppins" style={{
    animationDelay: '0.4s'
  }}>
      
      <CardContent className="p-6">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </CardContent>
    </Card>;
};
export default HighchartsCard;