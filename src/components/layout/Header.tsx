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
  return <header className="animate-fade-in">
      <div className="flex flex-col w-full">
        
        
        <div className="w-full h-px bg-[#F2F3F4]"></div>
      </div>
    </header>;
};
export default Header;