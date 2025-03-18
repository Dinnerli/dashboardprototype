
import { useState } from 'react';
import NavItem from './NavItem';
import { Edit, Medal, LayoutDashboard, LineChart, Gamepad, BellDot, SendHorizonal, Lightbulb } from 'lucide-react';

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="flex flex-col w-full px-5 py-4 bg-white border-b animate-slide-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Overview administrative dashboard
          </p>
        </div>
      </div>
      
      <div className="flex gap-1 justify-end">
        <div 
          className="cursor-pointer" 
          onClick={() => handleItemClick('dashboard')}
        >
          <NavItem 
            icon={<LayoutDashboard 
              size={24} 
              className={`${activeItem === 'dashboard' ? 'text-blue' : 'text-black'}`} 
            />} 
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
