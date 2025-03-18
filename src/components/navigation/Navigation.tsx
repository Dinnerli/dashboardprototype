
import { useState } from 'react';
import NavItem from './NavItem';
import { Edit, Medal, LineChart, Gamepad, BellDot, SendHorizonal, Lightbulb } from 'lucide-react';

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="flex items-center justify-between w-full px-5 py-3 bg-white border-b animate-slide-in-up">
      <div className="flex flex-col">
        <h1 className="text-h4 font-bold text-dark">Dashboard</h1>
        <p className="text-subheading-2 text-gray-600">
          Overview administrative dashboard
        </p>
      </div>
      
      <div className="flex gap-1 justify-end">
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('dashboard')}
        >
          <NavItem 
            icon={
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.55 8.52V3.98C22.55 2.57 21.91 2 20.32 2H16.28C14.69 2 14.05 2.57 14.05 3.98V8.51C14.05 9.93 14.69 10.49 16.28 10.49H20.32C21.91 10.5 22.55 9.93 22.55 8.52Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.55 19.77V15.73C22.55 14.14 21.91 13.5 20.32 13.5H16.28C14.69 13.5 14.05 14.14 14.05 15.73V19.77C14.05 21.36 14.69 22 16.28 22H20.32C21.91 22 22.55 21.36 22.55 19.77Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.05 8.52V3.98C11.05 2.57 10.41 2 8.82005 2H4.78005C3.19005 2 2.55005 2.57 2.55005 3.98V8.51C2.55005 9.93 3.19005 10.49 4.78005 10.49H8.82005C10.41 10.5 11.05 9.93 11.05 8.52Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.05 19.77V15.73C11.05 14.14 10.41 13.5 8.82005 13.5H4.78005C3.19005 13.5 2.55005 14.14 2.55005 15.73V19.77C2.55005 21.36 3.19005 22 4.78005 22H8.82005C10.41 22 11.05 21.36 11.05 19.77Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } 
            label="Dashboard" 
            active={activeItem === 'dashboard'} 
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('manage')}
        >
          <NavItem 
            icon={<Edit 
              size={24} 
              className={`${activeItem === 'manage' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Manage" 
            active={activeItem === 'manage'} 
            dropdown={true}
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('rewards')}
        >
          <NavItem 
            icon={<Medal 
              size={24} 
              className={`${activeItem === 'rewards' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Rewards" 
            active={activeItem === 'rewards'} 
            dropdown={true}
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('reports')}
        >
          <NavItem 
            icon={<LineChart 
              size={24} 
              className={`${activeItem === 'reports' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Reports" 
            active={activeItem === 'reports'} 
            dropdown={true}
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('games')}
        >
          <NavItem 
            icon={<Gamepad 
              size={24} 
              className={`${activeItem === 'games' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Games" 
            active={activeItem === 'games'} 
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('moderate')}
        >
          <NavItem 
            icon={<BellDot 
              size={24} 
              className={`${activeItem === 'moderate' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Moderate" 
            active={activeItem === 'moderate'} 
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('broadcasts')}
        >
          <NavItem 
            icon={<SendHorizonal 
              size={24} 
              className={`${activeItem === 'broadcasts' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Broadcasts" 
            active={activeItem === 'broadcasts'} 
          />
        </div>
        
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('ideabox')}
        >
          <NavItem 
            icon={<Lightbulb 
              size={24} 
              className={`${activeItem === 'ideabox' ? 'text-blue' : 'text-black'}`} 
            />} 
            label="Ideabox" 
            active={activeItem === 'ideabox'} 
            dropdown={true}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
