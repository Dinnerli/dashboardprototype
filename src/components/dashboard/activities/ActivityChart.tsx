import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TabType } from "./ActivityTabs";

interface ActivityChartProps {
  chartType: TabType;
  selectedStat: string | null;
  chartSeries: Highcharts.SeriesOptionsType[];
}

const ActivityChart = ({ chartType, selectedStat, chartSeries }: ActivityChartProps) => {
  // Build chart options using the provided chartSeries
  const chartOptions = {
    chart: {
      type: 'areaspline',
      animation: true,
      backgroundColor: 'transparent',
      style: { fontFamily: 'Poppins, sans-serif' },
      spacing: [15, 10, 15, 10],
      marginTop: 30,
      marginBottom: 30
    },
    title: { text: undefined },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          color: '#CDD1D7',
          fontSize: '10px',
          fontFamily: 'Poppins, sans-serif'
        }
      },
      lineWidth: 0,
      tickWidth: 0,
      startOnTick: true,
      endOnTick: false,
      alignTicks: false,
      min: 0,
      minPadding: 0,
      tickmarkPlacement: 'on',
    },
    yAxis: {
      title: { text: null },
      labels: {
        style: {
          color: '#CDD1D7',
          fontSize: '10px',
          fontFamily: 'Poppins, sans-serif'
        },
        align: 'right',
        x: -10,
        formatter: function() { return this.value + ''; }
      },
      gridLineColor: '#CDD1D7',
      gridLineDashStyle: 'Dot',
      gridLineWidth: 0.7,
      min: 0,
      max: 400,
      tickAmount: 6,
      tickPositions: [0, 100, 200, 300, 400]
    },
    legend: { enabled: false },
    tooltip: {
      shared: false,
      shadow: false,
      backgroundColor: '#F2F3F5',
      borderWidth: 0,
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '11px',
        color: '#222',
        borderRadius: 28,
      },
      formatter: function() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        let monthLabel = this.x;
        if (typeof this.index === 'number' && months[this.index]) {
          monthLabel = months[this.index];
        }
        return `<span class="font-medium">${monthLabel}</span>: ${this.y}`;
      }
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2,
        lineWidth: 1,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 4,
          states: { hover: { enabled: true } }
        },
        states: { hover: { lineWidth: 1 } },
        animation: { duration: 1000, easing: 'easeOutBounce' },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(51, 143, 255, 0.8)'],
            [1, 'rgba(205, 228, 255, 0)']
          ]
        },
        pointPlacement: 'on',
      },
      series: {
        animation: { duration: 1000, easing: 'easeOutBounce' }
      }
    },
    credits: { enabled: false },
    series: chartSeries
  };

  return (
    <div className="p-2.5 w-full ">
      <div className="w-full h-[200px]">
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
