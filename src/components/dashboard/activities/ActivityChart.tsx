
import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TabType } from "./ActivityTabs";

// Data for different chart types
const chartData = {
  user: {
    active: [200, 210, 320, 30, 450, 150],
    new: [370, 30, 420, 150, 240, 300]
  },
  usage: {
    active: [350, 280, 220, 300, 180, 410],
    new: [120, 250, 300, 280, 390, 270]
  },
  course: {
    active: [180, 290, 310, 250, 400, 290],
    new: [80, 180, 240, 320, 260, 350]
  }
};

interface ActivityChartProps {
  chartType: TabType;
}

const ActivityChart = ({ chartType }: ActivityChartProps) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      type: 'area',
      animation: {
        duration: 1000
      },
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Poppins, sans-serif'
      },
      spacing: [10, 10, 10, 10]
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
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
        align: 'right',
        x: -10,
        formatter: function() {
          return this.value + '';
        }
      },
      gridLineColor: '#CDD1D7',
      gridLineDashStyle: 'Dot',
      gridLineWidth: 0.5,
      min: 0,
      max: 500,
      tickAmount: 6,
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
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgba(51, 143, 255, 0.8)'],
            [1, 'rgba(205, 228, 255, 0)']
          ]
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
        data: chartData[chartType].active,
        color: '#338FFF',
        type: 'area'
      },
      {
        name: 'New Users',
        data: chartData[chartType].new,
        color: '#F2F3F5',
        type: 'area',
        visible: false
      }
    ],
    credits: {
      enabled: false
    }
  });

  // Update chart data when chartType changes
  useEffect(() => {
    setChartOptions(prevOptions => {
      const newOptions = { ...prevOptions };
      if (newOptions.series && Array.isArray(newOptions.series) && newOptions.series.length >= 2) {
        // Need to cast series to any to modify data
        const activeSeries = newOptions.series[0] as any;
        const newUsersSeries = newOptions.series[1] as any;
        
        // Update series data
        if (activeSeries) {
          activeSeries.data = chartData[chartType].active;
        }
        
        if (newUsersSeries) {
          newUsersSeries.data = chartData[chartType].new;
        }
      
        // Update series name based on tab
        if (chartType === 'user') {
          if (activeSeries) activeSeries.name = 'Active Users';
          if (newUsersSeries) newUsersSeries.name = 'New Users';
        } else if (chartType === 'usage') {
          if (activeSeries) activeSeries.name = 'Total Usage';
          if (newUsersSeries) newUsersSeries.name = 'Avg. Time';
        } else if (chartType === 'course') {
          if (activeSeries) activeSeries.name = 'Completed';
          if (newUsersSeries) newUsersSeries.name = 'In Progress';
        }
      }
      return newOptions;
    });
  }, [chartType]);

  return (
    <div className="p-2.5 w-full">
      <div className="h-[287px] w-full animate-fade-in">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ className: 'h-full w-full' }}
        />
      </div>
    </div>
  );
};

export default ActivityChart;
