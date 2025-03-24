import { Card } from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";

const LearningActivitiesCard = () => {
  return (
    <Card className="w-full min-h-[300px] animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="w-full flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center w-full p-5 border-b border-gray-300">
          <div className="flex items-center gap-2.5 px-2.5 flex-1">
            <h3 className="text-[#233143] font-poppins text-lg font-semibold">Learning Activities</h3>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex items-center gap-2.5">
              <span className="text-sm text-gray-500 font-poppins">Filter by:</span>
              <div className="flex items-center gap-1.5 rounded-md">
                <span className="text-sm text-gray-500 font-poppins">Last 60 Days</span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md">
                <span className="text-sm text-gray-500 font-poppins">All</span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 font-poppins">View Report</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-6 p-5">
          
          {/* Chart */}
          <div className="flex justify-center items-center animate-float">
            <svg width="400" height="400" viewBox="0 0 400 401" className="max-w-full h-auto">
              <style type="text/css">
                {`
                  @keyframes progress {
                    0% {
                      stroke-dasharray: 0 1000;
                    }
                  }
                  .progress-ring {
                    transform-origin: center;
                    transform: rotate(-90deg);
                    animation: progress 1.5s ease-out forwards;
                  }
                `}
              </style>
              
              {/* Library Ring (Outermost) */}
              <path 
                d="M199.882 13.2917C236.927 13.2917 273.141 24.2659 303.943 44.8266C334.745 65.3872 358.752 94.6109 372.928 128.802" 
                stroke="#CDE4FF" 
                strokeWidth="20" 
                strokeLinecap="round"
                className="progress-ring"
                style={{ animationDelay: '0s' }}
              />
              
              {/* Exams Ring */}
              <path 
                d="M199.882 43.2917C226.927 43.2917 253.141 54.2659 273.943 74.8266C294.745 95.3872 308.752 124.6109 312.928 158.802" 
                stroke="#CDE4FF" 
                strokeWidth="20" 
                strokeLinecap="round"
                className="progress-ring"
                style={{ animationDelay: '0.2s' }}
              />
              
              {/* ILT/VILT Ring */}
              <path 
                d="M199.882 73.2917C216.927 73.2917 233.141 84.2659 243.943 104.8266C254.745 125.3872 258.752 154.6109 252.928 188.802" 
                stroke="#CDE4FF" 
                strokeWidth="20" 
                strokeLinecap="round"
                className="progress-ring"
                style={{ animationDelay: '0.4s' }}
              />
              
              {/* Courses Ring (Active - Innermost) */}
              <path 
                d="M199.882 103.2917C206.927 103.2917 213.141 114.2659 213.943 134.8266C214.745 155.3872 208.752 184.6109 192.928 218.802" 
                stroke="#338FFF" 
                strokeWidth="20" 
                strokeLinecap="round"
                className="progress-ring"
                style={{ animationDelay: '0.6s' }}
              />

              {/* Text Labels */}
              <text x="125" y="18" fill="#8C9BAC" fontSize="16" fontWeight="600">Library</text>
              <text x="127" y="51" fill="#8C9BAC" fontSize="16" fontWeight="600">Exams</text>
              <text x="119" y="83" fill="#8C9BAC" fontSize="16" fontWeight="600">ILT/VILT</text>
              <text x="114" y="121" fill="#338FFF" fontSize="16" fontWeight="600">Courses</text>
            </svg>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[20px] font-bold text-[#338FFF]">Courses</h4>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Uploads */}
              <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-semibold text-sm">Uploads</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-700">50</span>
                  <span className="text-sm text-green-500">40% ↑</span>
                </div>
              </div>

              {/* Time Spent */}
              <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-semibold text-sm">Time Spent</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-700">25</span>
                  <span className="text-sm text-red-500">40% ↓</span>
                </div>
              </div>

              {/* Assigned */}
              <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-semibold text-sm">Assigned</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-700">48</span>
                  <span className="text-sm text-green-500">25.3% ↑</span>
                </div>
              </div>

              {/* Completed */}
              <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-semibold text-sm">Completed</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-700">63</span>
                  <span className="text-sm text-green-500">14% ↑</span>
                </div>
              </div>

              {/* Passed */}
              <div className="flex flex-col bg-gray-50 p-3 rounded-lg col-span-2">
                <span className="text-gray-500 font-semibold text-sm">Passed</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-700">37</span>
                  <span className="text-sm text-red-500">31% ↓</span>
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
