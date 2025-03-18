
import { useState } from 'react';
import NavItem from './NavItem';
import { Gamepad, BellDot, SendHorizonal, Lightbulb } from 'lucide-react';

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
            icon={
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6101 2H9.61011C4.61011 2 2.61011 4 2.61011 9V15C2.61011 20 4.61011 22 9.61011 22H15.6101C20.6101 22 22.6101 20 22.6101 15V13" stroke={activeItem === 'manage' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.6501 3.02L8.77011 10.9C8.47011 11.2 8.17011 11.79 8.11011 12.22L7.68011 15.23C7.52011 16.32 8.29011 17.08 9.38011 16.93L12.3901 16.5C12.8101 16.44 13.4001 16.14 13.7101 15.84L21.5901 7.96C22.9501 6.6 23.5901 5.02 21.5901 3.02C19.5901 1.02 18.0101 1.66 16.6501 3.02Z" stroke={activeItem === 'manage' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5201 4.15C16.1901 6.54 18.0601 8.41 20.4601 9.09" stroke={activeItem === 'manage' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } 
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
            icon={
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.67 15C16.398 15 19.42 12.0899 19.42 8.5C19.42 4.91015 16.398 2 12.67 2C8.94212 2 5.92004 4.91015 5.92004 8.5C5.92004 12.0899 8.94212 15 12.67 15Z" stroke={activeItem === 'rewards' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.19003 13.52L8.18005 20.9C8.18005 21.8 8.81006 22.24 9.59006 21.87L12.2701 20.6C12.4901 20.49 12.86 20.49 13.08 20.6L15.7701 21.87C16.5401 22.23 17.1801 21.8 17.1801 20.9V13.34" stroke={activeItem === 'rewards' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } 
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
            icon={
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.05 12C21.65 12 22.73 11 21.77 7.72C21.12 5.51 19.22 3.61 17.01 2.96C13.73 2 12.73 3.08 12.73 5.68V8.56C12.73 11 13.73 12 15.73 12H19.05Z" stroke={activeItem === 'reports' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.73 14.7C19.8 19.33 15.36 22.69 10.31 21.87C6.52003 21.26 3.47003 18.21 2.85003 14.42C2.04003 9.39 5.38003 4.95 9.99003 4.01" stroke={activeItem === 'reports' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } 
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
