import { Card } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
interface LeaderboardCardProps {
  title?: string;
}
const LeaderboardCard = ({
  title = "Leaderboard"
}: LeaderboardCardProps) => {
  return <Card className="w-full animate-slide-in-up shadow-sm" style={{
    animationDelay: '0.4s'
  }}>
      

      <div className="px-0 py-0 flex flex-col">
        {/* User 1 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="James de Silva" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center w-[200px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">James de Silva</span>
            <span className="text-[#8C9BAC] text-xs">james@getlayup.com</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base">237</span>
            <span className="text-[#8C9BAC] text-xs">Points</span>
          </div>
          <div className="flex justify-center items-center w-[55px] px-2.5">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <text x="15.4023" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">1</text>
            </svg>
          </div>
        </div>

        {/* User 2 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Lakshika Matthegoda" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center w-[200px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">Lakshika Matthegoda</span>
            <span className="text-[#8C9BAC] text-xs">lakshika@getlayup.com</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base">237</span>
            <span className="text-[#8C9BAC] text-xs">Points</span>
          </div>
          <div className="flex justify-center items-center w-[55px] px-2.5">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <text x="14.0371" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">2</text>
            </svg>
          </div>
        </div>

        {/* User 3 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
            <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Nuwan Gajanyaka" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center w-[200px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">Nuwan Gajanyaka</span>
            <span className="text-[#8C9BAC] text-xs">nuwan@getlayup.com</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base">237</span>
            <span className="text-[#8C9BAC] text-xs">Points</span>
          </div>
          <div className="flex justify-center items-center w-[55px] px-2.5">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <text x="13.9375" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">3</text>
            </svg>
          </div>
        </div>

        {/* User 4 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
            <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Hansika Diddugoda" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center w-[200px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">Hansika Diddugoda</span>
            <span className="text-[#8C9BAC] text-xs">hansika@getlayup.com</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base">237</span>
            <span className="text-[#8C9BAC] text-xs">Points</span>
          </div>
          <div className="flex justify-center items-center w-[55px] px-2.5">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <text x="13.6152" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">4</text>
            </svg>
          </div>
        </div>

        {/* User 5 */}
        <div className="flex p-2.5 justify-between items-center border-b border-[#F2F3F5]">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
            <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="James de Silva" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center w-[200px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base overflow-hidden text-ellipsis whitespace-nowrap">James de Silva</span>
            <span className="text-[#8C9BAC] text-xs">james@getlayup.com</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[60px] px-2.5">
            <span className="text-[#4F5A69] font-bold text-base">237</span>
            <span className="text-[#8C9BAC] text-xs">Points</span>
          </div>
          <div className="flex justify-center items-center w-[55px] px-2.5">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 13C28 15.0714 27.355 16.9714 26.245 18.5572C24.625 20.8429 22.06 22.4571 19.075 22.8714C18.565 22.9571 18.04 23 17.5 23C16.96 23 16.435 22.9571 15.925 22.8714C12.94 22.4571 10.375 20.8429 8.755 18.5572C7.645 16.9714 7 15.0714 7 13C7 7.47143 11.695 3 17.5 3C23.305 3 28 7.47143 28 13Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M30.8849 27.0919L28.4974 27.6584C27.962 27.7892 27.5423 28.196 27.4266 28.7335L26.9201 30.869C26.6452 32.0312 25.1692 32.3799 24.4023 31.4647L17.5 23.5036L10.5977 31.4792C9.83079 32.3944 8.35483 32.0457 8.07989 30.8835L7.57344 28.748C7.4432 28.2105 7.02357 27.7892 6.50264 27.673L4.11505 27.1064C3.01532 26.8449 2.62462 25.4648 3.42048 24.6657L9.06387 19C10.6267 21.3244 13.1011 22.9661 15.9806 23.3874C16.4726 23.4745 16.9791 23.5181 17.5 23.5181C18.0209 23.5181 18.5274 23.4745 19.0194 23.3874C21.8989 22.9661 24.3734 21.3244 25.9361 19L31.5795 24.6657C32.3754 25.4502 31.9847 26.8304 30.8849 27.0919Z" stroke="#4F5A69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <text x="13.668" y="17.2" fill="#4F5A69" fontFamily="Poppins" fontSize="12" fontWeight="500">5</text>
            </svg>
          </div>
        </div>
      </div>
    </Card>;
};
export default LeaderboardCard;