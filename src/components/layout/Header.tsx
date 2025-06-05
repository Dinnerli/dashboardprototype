import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
const Header = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const handleSwitchToUser = () => {
    // Handle switch to user functionality
    console.log('Switching to user view');
  };
  return <header className="animate-fade-in max-w-full">
      <div className="flex flex-col w-full">
        
        
        <div className="max-w-full h-auto p-2 flex justify-between border-b m-2">
<div>
<img src="/layup_logo.png" alt="Logo" className="h-8 " />
</div>
<div className='flex items-center  gap-6'>
  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 mr-2 sm:mr-3 overflow-hidden">
              <img 
                src={`https://i.pravatar.cc/150?img=11`} 
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
</div>
        </div>
      </div>
    </header>;
};
export default Header;