
import { Card } from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LearningActivitiesCard = () => {
  const [animate, setAnimate] = useState(false);
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Chart options for the circular activity chart
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 400,
      width: 400,
      animation: {
        duration: 1000
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        borderWidth: 10,
        borderColor: 'transparent',
        innerSize: '50%',
        size: '100%',
        dataLabels: {
          enabled: true,
          formatter: function(this: Highcharts.PointLabelObject) {
            // Use the correct 'this' type with the proper properties
            return this.key;
          },
          style: {
            color: '#8C9BAC',
            fontWeight: 'bold',
            fontSize: '16px',
            fontFamily: 'Poppins'
          },
          distance: 10
        },
        states: {
          hover: {
            enabled: true,
            brightness: 0.1
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
    series: [{
      type: 'pie',
      name: 'Learning Activities',
      data: [
        {
          name: 'Courses',
          y: 40,
          color: '#338FFF',
          borderColor: '#CDE4FF',
          borderWidth: 10,
          sliced: true,
          selected: true
        },
        {
          name: 'ILT/VILT',
          y: 30,
          color: '#666',
          borderColor: '#E5E7EA',
          borderWidth: 10,
          sliced: false
        },
        {
          name: 'Exams',
          y: 20,
          color: '#666',
          borderColor: '#E5E7EA',
          borderWidth: 10,
          sliced: false
        },
        {
          name: 'Library',
          y: 10,
          color: '#666',
          borderColor: '#E5E7EA',
          borderWidth: 10,
          sliced: false
        }
      ]
    }]
  };

  useEffect(() => {
    // Animate the chart when component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
      
      // Redraw the chart to trigger animation
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.redraw();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full mt-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full p-6 border-b border-[#B3B3B3]">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="h3 text-[#233143] font-poppins">Learning Activities</h3>
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

        {/* Content */}
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Chart - replaced static SVG with Highcharts */}
          <div className="flex-1 flex justify-center items-center">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              ref={chartRef}
              containerProps={{ className: 'w-full h-full' }}
            />
          </div>

          {/* Stats */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="mb-4">
              <h4 className="text-[20px] font-bold text-[#338FFF] w-full">Courses</h4>
            </div>
            
            {/* First row */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 27V21L17 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19 21L21 23" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M32 20V25C32 30 30 32 25 32H19C14 32 12 30 12 25V19C12 14 14 12 19 12H24" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M32 20H28C25 20 24 19 24 16V12L32 20Z" stroke="#338FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#8C9BAC]">Uploads</span>
                      <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#4F5A69]">50</span>
                      <div className="flex items-center">
                        <span className="text-sm text-[#00D764]">40%</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-[#F2F3F5]"></div>
                
                <div className="flex items-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 16.48 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M25.71 25.18L22.61 23.33C22.07 23.01 21.63 22.24 21.63 21.61V17.51" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#8C9BAC]">Time Spent</span>
                      <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#4F5A69]">25</span>
                      <div className="flex items-center">
                        <span className="text-sm text-[#ED5158]">40%</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Other stats */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 p-2.5 rounded-lg">
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#CDE4FF]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Assigned</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">48</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#00D764]">25.3%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg">
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#338FFF]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Completed</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">63</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#00D764]">14%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg">
                <div className="flex items-center justify-center p-2.5">
                  <div className="w-0.5 h-[35px] bg-[#003072]"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 px-2.5">
                    <span className="text-base font-bold text-[#8C9BAC]">Passed</span>
                    <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
                  </div>
                  <div className="flex justify-between items-center px-2.5">
                    <span className="text-2xl font-bold text-[#4F5A69]">37</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#ED5158]">31%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LearningActivitiesCard;
