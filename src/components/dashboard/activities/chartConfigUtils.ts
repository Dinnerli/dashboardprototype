import Highcharts from 'highcharts';
import { TabType } from "./ActivityTabs";
import { chartData } from './chartData';

// Create base chart options
export const createBaseChartOptions = (): Highcharts.Options => ({  chart: {
    type: 'areaspline',
    animation: true,
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Poppins, sans-serif'
    },
    spacing: [15, 10, 15, 10],
    marginTop: 30,
    marginBottom: 30
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
    tickWidth: 0,
    startOnTick: true,
    endOnTick: false,
    alignTicks: false,
    min: 0,
    minPadding: 0,
    tickmarkPlacement: 'on', // aligns ticks with categories
    // Remove pointPlacement from xAxis, set it in plotOptions instead
  },  yAxis: {
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
    gridLineWidth: 0.7,
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
    backgroundColor: '#F2F3F5',
    borderWidth: 0,
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
  const statNames = Object.keys(chartData[chartType]);
  newOptions.series = statNames.map((stat) => {
    const isActive = stat === selectedStat;
    return {
      name: stat,
      data: chartData[chartType][stat],
      color: isActive ? '#338FFF' : '#E5E7EB',
      type: 'areaspline',
      fillColor: isActive
        ? {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(51, 143, 255, 0.8)'],
              [1, 'rgba(205, 228, 255, 0)']
            ]
          }
        : 'rgba(0,0,0,0)', // No fill for inactive
      lineWidth: isActive ? 1 : 1,
      marker: { enabled: false },
      zIndex: isActive ? 2 : 1,
      opacity: isActive ? 1 : 0.7,
      enableMouseTracking: isActive, // No hover/tooltip for inactive
      states: {
        hover: {
          enabled: isActive,
          lineWidth: isActive ? 2 : 1.5
        }
      },
      className: isActive ? 'active-path' : 'inactive-path',
      showInLegend: false
    };
  });
  // Only show tooltip for active series
  newOptions.tooltip = {
    ...newOptions.tooltip,
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
      if (this.series && this.series.options.className === 'active-path') {
        // Map index to month name for tooltip
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'];
        let monthLabel: string = this.x.toString();
        if (typeof this.index === 'number' && months[this.index]) {
          monthLabel = months[this.index];
        }
        return `<span class="font-medium">${monthLabel}</span>: ${this.y}`;
      }
      return false;
    }
  };
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
