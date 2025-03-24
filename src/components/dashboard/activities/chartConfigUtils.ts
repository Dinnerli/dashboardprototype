import Highcharts from 'highcharts';
import { TabType } from "./ActivityTabs";
import { chartData } from './chartData';

// Create base chart options
export const createBaseChartOptions = (): Highcharts.Options => ({
  chart: {
    type: 'areaspline', // Using areaspline for curved edges
    animation: false,
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
      animation: false,
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
      animation: false
    }
  },
  credits: {
    enabled: false
  }
});

// Update chart options based on tab type
export const updateChartOptions = (chartType: TabType, prevOptions: Highcharts.Options): Highcharts.Options => {
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
