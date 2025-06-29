import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TabType } from "./ActivityTabs";

interface ActivityChartProps {
  chartType: TabType;
  selectedStat: string | null;
  chartSeries: Highcharts.SeriesOptionsType[];
  xAxisCategories: string[];
}

const ActivityChart = ({ chartType, selectedStat, chartSeries, xAxisCategories }: ActivityChartProps) => {  // Calculate dynamic max value and tick positions for Y-axis based on the data
  const calculateYAxisSettings = () => {
    if (!chartSeries || chartSeries.length === 0) {
      return { max: 100, tickPositions: [0, 20, 40, 60, 80, 100] };
    }
    let maxValue = 0;
    chartSeries.forEach(series => {
      const seriesData = (series as { data?: number[] }).data;
      if (Array.isArray(seriesData)) {
        const seriesMax = Math.max(...seriesData);
        maxValue = Math.max(maxValue, seriesMax);
      }
    });
    if (maxValue === 0) {
      return { max: 100, tickPositions: [0, 20, 40, 60, 80, 100] };
    }
    // Find a 'nice' max just above the real max, but not excessively high
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
    let niceMax = Math.ceil(maxValue / magnitude * 10) / 10 * magnitude;
    if (niceMax - maxValue < magnitude * 0.2) {
      niceMax += magnitude / 2;
    }
    niceMax = Math.max(niceMax, maxValue);
    // Always ensure niceMax is not more than 2x the real max
    if (niceMax > maxValue * 2) {
      niceMax = maxValue;
    }
    // Calculate tick interval and positions
    const tickInterval = niceMax / 5;
    const tickPositions = Array.from({ length: 6 }, (_, i) => Math.round(i * tickInterval * 100) / 100);
    return { max: niceMax, tickPositions };
  };

  const { max: yAxisMax, tickPositions } = calculateYAxisSettings();

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
    title: { text: undefined },    xAxis: {
      categories: xAxisCategories,
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
      },      gridLineColor: '#CDD1D7',
      gridLineDashStyle: 'Dot',
      gridLineWidth: 0.7,
      min: 0,
      max: yAxisMax,
      tickAmount: 6,
      tickPositions: tickPositions
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
      },      formatter: function() {
        let categoryLabel = this.x;
        if (typeof this.x === 'number' && xAxisCategories[this.x]) {
          categoryLabel = xAxisCategories[this.x];
        } else if (typeof this.x === 'string') {
          categoryLabel = this.x;
        }
        return `<span class="font-medium">${categoryLabel}</span>: ${this.y}`;
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
