
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState, useRef } from "react";

interface HighchartsCardProps {
  title?: string;
}

const HighchartsCard = ({
  title = "Performance Metrics"
}: HighchartsCardProps) => {
  const [animate, setAnimate] = useState(false);
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Start with zero values
      color: '#338FFF'
    }, {
      type: 'spline',
      name: 'Engagement',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Start with zero values
      color: '#00D764'
    }],
    credits: {
      enabled: false
    },
    legend: {
      itemStyle: {
        fontFamily: 'Poppins'
      }
    },
    plotOptions: {
      series: {
        animation: {
          duration: 1500
        }
      }
    }
  });

  useEffect(() => {
    // Animate chart data after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
      setChartOptions({
        ...chartOptions,
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
        }]
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-[455px] h-[555px] shadow-sm animate-slide-in-up font-poppins" style={{ animationDelay: '0.4s' }}>
      <CardHeader className="flex justify-between items-center w-full p-[25px_10px] border-b border-[#CDD1D7]">
        <CardTitle className="text-[#233143] text-[22px] font-bold">{title}</CardTitle>
        <div className="flex gap-2.5">
          <div className="flex items-center p-2.5 gap-1.5">
            <span className="text-[#8C9BAC] text-xs border-b border-[#8C9BAC]">View Report</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
        />
      </CardContent>
    </Card>
  );
};

export default HighchartsCard;
