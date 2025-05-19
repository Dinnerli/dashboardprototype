
import { ReactNode } from 'react';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  dropdown?: boolean;
}

const NavItem = ({ icon, label, active = false, dropdown = false }: NavItemProps) => {
  return (
    <div className={`nav-item group w-20  ${active ? 'nav-item-active' : 'nav-item-inactive'}`}>
      <div className="flex justify-center items-center h-6">
        {icon}
      </div>
      <div className="flex items-center justify-center mt-2">
        <span className="text-[12px] font-medium">{label}</span>
        {dropdown && (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform duration-300 ${active ? 'rotate-180' : ''}`}
          >
            <path 
              d="M8.46997 10.74L12 14.26L15.53 10.74" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default NavItem;
