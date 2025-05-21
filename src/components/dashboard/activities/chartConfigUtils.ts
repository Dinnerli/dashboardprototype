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
    areaspline: {
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
      }
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
  if (newOptions.series && Array.isArray(newOptions.series) && newOptions.series.length >= 2) {
    // Use Highcharts.SeriesAreasplineOptions for type safety
    const activeSeries = newOptions.series[0] as Highcharts.SeriesAreasplineOptions;
    const newUsersSeries = newOptions.series[1] as Highcharts.SeriesAreasplineOptions;
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
    // Always show both series, but only the selected stat is colored, the other is just a muted gray border (no fill)
    if (selectedStat) {
      if (activeSeries && activeSeries.name === selectedStat) {
        activeSeries.visible = true;
        newUsersSeries.visible = true;
        activeSeries.color = '#338FFF';
        activeSeries.fillColor = {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(51, 143, 255, 0.8)'],
            [1, 'rgba(205, 228, 255, 0)']
          ]
        };
        activeSeries.lineWidth = 1;
        activeSeries.enableMouseTracking = true;
        activeSeries.states = { hover: { enabled: true, lineWidth: 2 } };
        activeSeries.className = 'active-path';
        activeSeries.zIndex = 2; // Ensure active is on top
        // Inactive path
        newUsersSeries.color = '#E5E7EB'; // Muted gray
        newUsersSeries.fillColor = 'rgba(0,0,0,0)';
        newUsersSeries.lineWidth = 2;
        newUsersSeries.enableMouseTracking = false;
        newUsersSeries.states = { hover: { enabled: false } };
        newUsersSeries.className = 'inactive-path';
        newUsersSeries.opacity = 0.7;
        newUsersSeries.zIndex = 1;
      } else if (newUsersSeries && newUsersSeries.name === selectedStat) {
        activeSeries.visible = true;
        newUsersSeries.visible = true;
        newUsersSeries.color = '#338FFF';
        newUsersSeries.fillColor = {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(51, 143, 255, 0.8)'],
            [1, 'rgba(205, 228, 255, 0)']
          ]
        };
        newUsersSeries.lineWidth = 2;
        newUsersSeries.enableMouseTracking = true;
        newUsersSeries.states = { hover: { enabled: true, lineWidth: 1 } };
        newUsersSeries.className = 'active-path';
        newUsersSeries.zIndex = 2;
        // Inactive path
        activeSeries.color = '#E5E7EB';
        activeSeries.fillColor = 'rgba(0,0,0,0)';
        activeSeries.lineWidth = 2;
        activeSeries.enableMouseTracking = false;
        activeSeries.states = { hover: { enabled: false } };
        activeSeries.className = 'inactive-path';
        activeSeries.opacity = 0.7;
        activeSeries.zIndex = 1;
      } else {
        // fallback: both muted gray border, no fill
        activeSeries.visible = true;
        newUsersSeries.visible = true;
        activeSeries.color = '#E5E7EB';
        activeSeries.fillColor = 'rgba(0,0,0,0)';
        activeSeries.lineWidth = 2;
        activeSeries.enableMouseTracking = false;
        activeSeries.states = { hover: { enabled: false } };
        activeSeries.className = 'inactive-path';
        activeSeries.opacity = 0.7;
        activeSeries.zIndex = 1;
        newUsersSeries.color = '#E5E7EB';
        newUsersSeries.fillColor = 'rgba(0,0,0,0)';
        newUsersSeries.lineWidth = 2;
        newUsersSeries.enableMouseTracking = false;
        newUsersSeries.states = { hover: { enabled: false } };
        newUsersSeries.className = 'inactive-path';
        newUsersSeries.opacity = 0.7;
        newUsersSeries.zIndex = 1;
      }
    } else {
      // If no stat selected, both muted gray border, no fill
      activeSeries.visible = true;
      newUsersSeries.visible = true;
      activeSeries.color = '#F2F3F5';
      activeSeries.fillColor = 'rgba(0,0,0,0)';
      activeSeries.lineWidth = 2;
      newUsersSeries.color = '#F2F3F5';
      newUsersSeries.fillColor = 'rgba(0,0,0,0)';
      newUsersSeries.lineWidth = 2;
    }
    // Tooltip: only show active series
    newOptions.tooltip = {
      ...newOptions.tooltip,
      shared: false,
      formatter: function() {
        if (this.series && this.series.options.className === 'active-path') {
          return `<b>${this.series.name}</b><br/>${this.x}: <b>${this.y}</b>`;
        }
        return false;
      }
    };
  }
  return newOptions;
};

// Create initial chart series
export const createInitialSeries = (): Highcharts.SeriesOptionsType[] => [
  {
    name: 'Active Users',
    data: chartData['user'].active,
    color: '#338FFF',
    type: 'areaspline'
  },
  {
    name: 'New Users',
    data: chartData['user'].new,
    color: '#F5F6F8',
    type: 'areaspline',
    visible: false
  }
];
