
import { Card } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

interface LeaderboardCardProps {
  title?: string;
}

const LeaderboardCard = ({
  title = "Leaderboard"
}: LeaderboardCardProps) => {
  return (
    <Card className="w-[455px] h-[555px] shadow-sm animate-slide-in-up font-poppins" style={{ animationDelay: '0.4s' }}>
      <div className="flex flex-col h-full">
        {/* Header section */}
        <div className="flex justify-between items-center w-full p-[25px_10px] border-b border-[#CDD1D7]">
          <div className="flex items-center gap-2.5 flex-1">
            <span className="text-[#233143] text-[22px] font-bold">{title}</span>
          </div>
          
          <div className="flex gap-2.5">
            {/* Search Icon */}
            <div className="flex items-center p-2.5">
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px]">
                <path d="M9 15C11.0711 15 12.75 13.3211 12.75 11.25C12.75 9.17893 11.0711 7.5 9 7.5C6.92893 7.5 5.25 9.17893 5.25 11.25C5.25 13.3211 6.92893 15 9 15Z" stroke="#8C9BAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.55762 22.5C2.55762 19.5975 5.44514 17.25 9.00014 17.25" stroke="#8C9BAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M13.65 22.05C14.9755 22.05 16.05 20.9755 16.05 19.65C16.05 18.3245 14.9755 17.25 13.65 17.25C12.3245 17.25 11.25 18.3245 11.25 19.65C11.25 20.9755 12.3245 22.05 13.65 22.05Z" stroke="#8C9BAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M16.5 22.5L15.75 21.75" stroke="#8C9BAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            
            {/* Filter Icon */}
            <div className="flex items-center p-2.5">
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px]">
                <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8.1975 7.57495L4.5 13.5" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            
            {/* View Report Link */}
            <div className="flex items-center p-2.5 gap-1.5">
              <span className="text-[#8C9BAC] text-xs border-b border-[#8C9BAC]">View Report</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col p-[10px_0px] flex-1 w-full">
          {/* User Entry 1 */}
          <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="James de Silva" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center w-[200px] px-2.5 md:flex-1">
              <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">James de Silva</span>
              <span className="text-[#8C9BAC] text-xs">james@getlayup.com</span>
            </div>
            <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
              <span className="text-[#4F5A69] font-bold text-base">237</span>
              <span className="text-[#8C9BAC] text-xs">Points</span>
            </div>
            <div className="flex justify-center items-center w-[55px] px-2.5">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="15.4023" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">1</text>
              </svg>
            </div>
          </div>

          {/* User Entry 2 */}
          <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Lakshika Matthegoda" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center w-[200px] px-2.5 md:flex-1">
              <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">Lakshika Matthegoda</span>
              <span className="text-[#8C9BAC] text-xs">lakshika@getlayup.com</span>
            </div>
            <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
              <span className="text-[#4F5A69] font-bold text-base">237</span>
              <span className="text-[#8C9BAC] text-xs">Points</span>
            </div>
            <div className="flex justify-center items-center w-[55px] px-2.5">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="14.0371" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">2</text>
              </svg>
            </div>
          </div>

          {/* User Entry 3 */}
          <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Nuwan Gajanyaka" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center w-[200px] px-2.5 md:flex-1">
              <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">Nuwan Gajanyaka</span>
              <span className="text-[#8C9BAC] text-xs">nuwan@getlayup.com</span>
            </div>
            <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
              <span className="text-[#4F5A69] font-bold text-base">237</span>
              <span className="text-[#8C9BAC] text-xs">Points</span>
            </div>
            <div className="flex justify-center items-center w-[55px] px-2.5">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="13.9375" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">3</text>
              </svg>
            </div>
          </div>

          {/* User Entry 4 */}
          <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Hansika Diddugoda" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center w-[200px] px-2.5 md:flex-1">
              <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">Hansika Diddugoda</span>
              <span className="text-[#8C9BAC] text-xs">hansika@getlayup.com</span>
            </div>
            <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
              <span className="text-[#4F5A69] font-bold text-base">237</span>
              <span className="text-[#8C9BAC] text-xs">Points</span>
            </div>
            <div className="flex justify-center items-center w-[55px] px-2.5">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="13.6152" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">4</text>
              </svg>
            </div>
          </div>

          {/* User Entry 5 */}
          <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="James de Silva" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center w-[200px] px-2.5 md:flex-1">
              <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">James de Silva</span>
              <span className="text-[#8C9BAC] text-xs">james@getlayup.com</span>
            </div>
            <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
              <span className="text-[#4F5A69] font-bold text-base">237</span>
              <span className="text-[#8C9BAC] text-xs">Points</span>
            </div>
            <div className="flex justify-center items-center w-[55px] px-2.5">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="13.668" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">5</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeaderboardCard;
