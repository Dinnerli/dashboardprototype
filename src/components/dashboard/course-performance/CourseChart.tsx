
import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type CourseChartProps = {
  courseData: Array<{
    name: string;
    completedPercentage: number;
    inProgressPercentage: number;
  }>;
};

const CourseChart = ({ courseData }: CourseChartProps) => {
  // Format the data for Highcharts
  const categories = courseData.map(course => course.name);
  const completed = courseData.map(course => course.completedPercentage);
  const inProgress = courseData.map(course => course.inProgressPercentage);

  // Configure Highcharts options
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
      height: courseData.length * 60 + 100, // Adjust height based on number of items
      animation: {
        duration: 1000
      }
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories,
      labels: {
        style: {
          color: '#4F5A69',
          fontSize: '12px',
          fontFamily: 'Poppins'
        }
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: null
      },
      labels: {
        formatter: function() {
          return this.value + '%';
        },
        style: {
          color: '#8C9BAC',
          fontSize: '12px',
          fontFamily: 'Poppins'
        }
      },
      gridLineColor: '#E5E7EB'
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'top',
      itemStyle: {
        fontFamily: 'Poppins',
        fontSize: '12px'
      }
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        borderRadius: 2,
        pointPadding: 0.2,
        groupPadding: 0.3,
        animation: {
          duration: 1500
        }
      },
      series: {
        animation: {
          duration: 1500,
          staggerLines: 5
        },
      }
    },
    series: [
      {
        name: 'Completed',
        data: completed,
        color: '#338FFF',
        animation: {
          duration: 1500
        }
      },
      {
        name: 'In Progress',
        data: inProgress,
        color: '#CDE4FF',
        animation: {
          duration: 1500,
          delay: 300
        }
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="py-4 pb-8">
      <div className="flex flex-col w-full">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default CourseChart;
