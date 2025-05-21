import Highcharts from 'highcharts';
import { TabType } from "./ActivityTabs";
import { chartData } from './chartData';

// Create base chart options
export const createBaseChartOptions = (): Highcharts.Options => ({
  chart: {
    type: 'areaspline',
    animation: true,
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
        color: '#E5E7EB',
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
    tickmarkPlacement: 'on', // aligns ticks with categories
    // Remove pointPlacement from xAxis, set it in plotOptions instead
  },
  yAxis: {
    title: {
      text: null
    },
    labels: {
      style: {
        color: '#E5E7EB',
        fontSize: '10px',
        fontFamily: 'Poppins, sans-serif'
      },
      align: 'right',
      x: -10,
      formatter: function() {
        return this.value + '';
      }
    },
    gridLineColor: '#E5E7EB',
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
    borderColor: '#E5E7EB',
    shadow: false,
    style: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '12px'
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
        states: {
          hover: {
            enabled: true
          }
        }
      },
      states: {
        hover: {
          lineWidth: 1
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
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
      },
      pointPlacement: 'on', // Ensures first point is at axis origin
    },
    series: {
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    }
  },
  credits: {
    enabled: false
  }
});

// Update chart options based on tab type and selected stat
export const updateChartOptions = (chartType: TabType, prevOptions: Highcharts.Options, selectedStat?: string | null): Highcharts.Options => {
  const newOptions = { ...prevOptions };
  // Get all stat names for the current tab
  const statNames = Object.keys(chartData[chartType]);
  newOptions.series = statNames.map((stat) => ({
    name: stat,
    data: chartData[chartType][stat],
    color: stat === selectedStat ? '#338FFF' : '#E5E7EB',
    type: 'areaspline',
    fillColor: stat === selectedStat
      ? {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(51, 143, 255, 0.8)'],
            [1, 'rgba(205, 228, 255, 0)']
          ]
        }
      : 'rgba(229, 231, 235, 0.2)', // muted gray fill
    lineWidth: stat === selectedStat ? 2 : 1,
    marker: { enabled: false },
    zIndex: stat === selectedStat ? 2 : 1,
    opacity: stat === selectedStat ? 1 : 0.7
  }));
  return newOptions;
};

// Create initial chart series
export const createInitialSeries = (): Highcharts.SeriesOptionsType[] => [
  {
    name: 'Active Users',
    data: chartData['user']['Active Users'],
    color: '#338FFF',
    type: 'areaspline'
  }
];
