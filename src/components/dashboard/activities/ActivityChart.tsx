
import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Data for the chart
const data = [
  { name: "Jan", active: 200, new: 370 },
  { name: "Feb", active: 210, new: 30 },
  { name: "Mar", active: 320, new: 420 },
  { name: "Apr", active: 30, new: 150 },
  { name: "May", active: 450, new: 240 },
  { name: "June", active: 150, new: 300 },
];

const ActivityChart = () => {
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
        data: [200, 280, 200, 300, 30, 450, 150],
        color: '#338FFF',
        type: 'area'
      },
      {
        name: 'New Users',
        data: [150, 320, 250, 390, 240, 350, 160],
        color: '#F2F3F5',
        type: 'area',
        visible: false
      }
    ],
    credits: {
      enabled: false
    }
  });

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
