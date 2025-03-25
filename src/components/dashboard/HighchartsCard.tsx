import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

interface HighchartsCardProps {
  title?: string;
}

const HighchartsCard = ({
  title = "Learning Activities"
}: HighchartsCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set animation after a short delay to ensure component is mounted
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full h-[555px] shadow-sm animate-slide-in-up font-poppins" style={{
      animationDelay: '0.4s'
    }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Chart with animation */}
          <div className="flex-1 flex justify-center items-center">
            <svg 
              width="400" 
              height="400" 
              viewBox="0 0 400 401" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`max-w-full h-auto transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            >
              <path d="M199.882 13.2917C236.927 13.2917 273.141 24.2659 303.943 44.8266C334.745 65.3872 358.752 94.6109 372.928 128.802C387.105 162.993 390.814 200.616 383.587 236.913C376.36 273.21 358.521 306.551 332.326 332.72C306.131 358.888 272.757 376.71 236.423 383.929C200.09 391.149 162.429 387.444 128.204 373.281C93.9788 359.119 64.726 335.136 44.1448 304.364C23.5637 273.593 12.5785 237.416 12.5786 200.408" stroke="#E5E7EA" strokeWidth="20" strokeLinecap="round"></path>
              <text fill="#8C9BAC" fontFamily="Poppins" fontSize="16" fontWeight="600" letterSpacing="0em" style={{ whiteSpace: "pre" }}><tspan x="125.023" y="18.6">Library</tspan></text>
              
              <path d="M199.882 46.0371C230.444 46.0371 260.32 55.0908 285.732 72.0534C311.144 89.0159 330.95 113.125 342.645 141.333C354.341 169.541 357.401 200.58 351.439 230.525C345.476 260.47 330.759 287.976 309.148 309.565C287.537 331.154 260.004 345.857 230.028 351.813C200.053 357.77 168.983 354.713 140.748 343.028C112.512 331.344 88.3782 311.558 71.3988 286.172C54.4193 260.786 45.3566 230.94 45.3567 200.408" stroke="#E5E7EA" strokeWidth="20" strokeLinecap="round"></path>
              <text fill="#8C9BAC" fontFamily="Poppins" fontSize="16" fontWeight="600" letterSpacing="0em" style={{ whiteSpace: "pre" }}><tspan x="127.648" y="51.1">Exams</tspan></text>
              
              <path d="M199.881 78.7825C223.961 78.7825 247.499 85.9157 267.521 99.2801C287.542 112.645 303.147 131.64 312.361 153.864C321.576 176.088 323.987 200.543 319.289 224.136C314.592 247.729 302.996 269.401 285.97 286.411C268.943 303.42 247.25 315.004 223.633 319.697C200.016 324.39 175.537 321.981 153.291 312.776C131.044 303.57 112.03 287.981 98.652 267.98C85.2743 247.978 78.134 224.463 78.134 200.408" stroke="#E5E7EA" strokeWidth="20" strokeLinecap="round"></path>
              <text fill="#8C9BAC" fontFamily="Poppins" fontSize="16" fontWeight="600" letterSpacing="0em" style={{ whiteSpace: "pre" }}><tspan x="119.913" y="83.6">ILT/VILT</tspan></text>
              
              <path d="M199.883 111.528C217.48 111.528 234.681 116.741 249.312 126.507C263.943 136.273 275.346 150.154 282.08 166.395C288.814 182.636 290.576 200.507 287.143 217.748C283.71 234.989 275.236 250.826 262.794 263.256C250.351 275.686 234.498 284.151 217.24 287.581C199.982 291.01 182.093 289.25 165.836 282.523C149.579 275.796 135.684 264.404 125.908 249.787C116.132 235.171 110.914 217.987 110.914 200.408" stroke="#003072" strokeWidth="20" strokeLinecap="round"></path>
              <path d="M199.883 111.528C217.48 111.528 234.681 116.741 249.312 126.507C263.943 136.273 275.346 150.154 282.08 166.395C288.814 182.636 290.576 200.507 287.143 217.748C283.71 234.989 275.237 250.826 262.794 263.256C250.352 275.686 234.499 284.151 217.24 287.581" stroke="#338FFF" strokeWidth="20" strokeLinecap="round"></path>
              <path d="M199.883 111.528C217.48 111.528 234.681 116.741 249.312 126.507C263.943 136.273 275.346 150.154 282.08 166.395" stroke="#CDE4FF" strokeWidth="20" strokeLinecap="round"></path>
              <text fill="#338FFF" fontFamily="Poppins" fontSize="16" fontWeight="600" letterSpacing="0em" style={{ whiteSpace: "pre" }}><tspan x="114.288" y="121.1">Courses</tspan></text>
            </svg>
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
                
                <div className="w-px h-8 bg-[#F5F6F8]"></div>
                
                <div className="flex items-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 22C32 27.52 27.52 32 22 32C16.48 32 12 27.52 12 22C12 16.48 16.48 12 22 12C27.52 12 32 16.48 32 22Z" stroke="#FDB533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
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
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors">
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
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors">
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
              
              <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-blue-50 transition-colors">
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
      </CardContent>
    </Card>
  );
};

export default HighchartsCard;
