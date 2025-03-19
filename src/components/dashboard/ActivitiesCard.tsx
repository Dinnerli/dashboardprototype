
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, ArrowUp, ArrowDown } from "lucide-react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from "react";

// Updated data to better match the screenshot
const data = [
  { name: "Jan", active: 200, new: 370 },
  { name: "Feb", active: 210, new: 30 },
  { name: "Mar", active: 320, new: 420 },
  { name: "Apr", active: 30, new: 150 },
  { name: "May", active: 450, new: 240 },
  { name: "June", active: 150, new: 300 },
];

const StatIndicator = ({ value, isPositive }: { value: string, isPositive: boolean }) => {
  return (
    <div className="flex items-center justify-end">
      <span className={`text-sm ${isPositive ? 'text-[#00D764]' : 'text-[#ED5158]'}`}>
        {value}
      </span>
      {isPositive ? (
        <ArrowUp className="w-4 h-4 text-[#00D764]" stroke="#00D764" strokeWidth={1.5} />
      ) : (
        <ArrowDown className="w-4 h-4 text-[#ED5158]" stroke="#ED5158" strokeWidth={1.5} />
      )}
    </div>
  );
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive, 
  isPositive 
}: { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  isPositive: boolean;
}) => {
  return (
    <div className={`flex items-center gap-2.5 p-2.5 rounded-lg ${isActive ? 'bg-[#F2F3F5]' : ''}`}>
      <div className="flex flex-col items-center justify-center p-2.5">
        <div 
          className={`w-0.5 h-[35px] ${isActive ? 'bg-[#338FFF]' : 'bg-[#CDD1D7]'}`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 px-2.5">
          <span className={`text-base font-bold ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}>
            {title}
          </span>
          <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
        <div className="flex items-center px-2.5">
          <div>
            <span className="text-2xl font-bold text-[#4F5A69]">{value}</span>
          </div>
          <div className="w-[66px] flex justify-end items-center">
            <StatIndicator value={percentage} isPositive={isPositive} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivitiesCard = () => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      type: 'area',
      animation: {
        duration: 1000
      },
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Poppins, sans-serif'
      }
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: data.map(item => item.name),
      labels: {
        style: {
          color: '#CDD1D7',
          fontSize: '10px',
          fontFamily: 'Poppins, sans-serif'
        }
      },
      lineWidth: 0,
      tickWidth: 0
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        style: {
          color: '#CDD1D7',
          fontSize: '10px',
          fontFamily: 'Poppins, sans-serif'
        },
        formatter: function() {
          return this.value + '';
        }
      },
      gridLineColor: '#CDD1D7',
      gridLineDashStyle: 'Dot',
      gridLineWidth: 0.5,
      min: 0,
      max: 500,
      tickAmount: 5,
      tickPositions: [0, 100, 200, 300, 400, 500]
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 1,
      borderColor: '#CDD1D7',
      shadow: true,
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px'
      }
    },
    plotOptions: {
      area: {
        fillOpacity: 0.2,
        lineWidth: 2,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 4,
          states: {
            hover: {
              enabled: true
            }
          }
        },
        states: {
          hover: {
            lineWidth: 3
          }
        },
        animation: {
          duration: 1500
        }
      },
      series: {
        animation: {
          duration: 1500
        }
      }
    },
    series: [
      {
        name: 'Active Users',
        data: data.map(item => item.active),
        color: '#338FFF',
        type: 'area'
      },
      {
        name: 'New Users',
        data: data.map(item => item.new),
        color: '#CDD1D7',
        type: 'area'
      }
    ],
    credits: {
      enabled: false
    }
  });

  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6 border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="h3 text-[#233143] font-poppins">Activity Overview</h3>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex items-center h-[30px] gap-2.5">
              <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
                <span className="text-[10px] text-[#8C9BAC] font-poppins">Filter by:</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-[10px] text-[#8C9BAC] font-poppins">Last 60 Days</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
              <div className="flex items-center gap-1.5 rounded-[10px]">
                <span className="text-[10px] text-[#8C9BAC] font-poppins">All</span>
                <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
                <span className="text-[10px] text-[#4F5A69] font-poppins text-center">View Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Updated to have indicator on top and font size 16px */}
        <div className="flex items-center gap-5 px-2.5 w-full bg-white overflow-x-auto">
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
            <div className="h-1 w-full bg-[#338FFF]"></div>
            <span className="text-[16px] text-[#338FFF] font-bold font-poppins">User Activity</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
            <div className="h-1 w-full bg-transparent"></div>
            <span className="text-[16px] text-[#8C9BAC] font-bold font-poppins">Usage Activities</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
            <div className="h-1 w-full bg-transparent"></div>
            <span className="text-[16px] text-[#8C9BAC] font-bold font-poppins">Course Activities</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          {/* Stats Row */}
          <div className="flex items-center gap-5 p-2.5 h-20 w-full flex-wrap">
            <ActivityStat 
              title="Active Users" 
              value="237" 
              percentage="40%" 
              isActive={true}
              isPositive={true}
            />
            <ActivityStat 
              title="New Users" 
              value="8" 
              percentage="40%" 
              isActive={false}
              isPositive={false}
            />
          </div>

          {/* Chart - Replaced with Highcharts */}
          <div className="p-2.5 w-full">
            <div className="h-[287px] w-full animate-fade-in">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                containerProps={{ className: 'h-full w-full' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCard;
