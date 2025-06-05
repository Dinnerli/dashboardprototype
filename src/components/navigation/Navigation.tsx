import { useState, useRef, useEffect } from 'react';
import NavItem from './NavItem';
import { Menu, X } from 'lucide-react';
import ActivityFilters from '../dashboard/activities/ActivityFilters';

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Focus trap for overlay
  useEffect(() => {
    if (!menuOpen) return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }
    const handleTab = (e: KeyboardEvent) => {
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    setMenuOpen(false); // Close overlay on nav click
  };

  // Close overlay when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setMenuOpen(false);
    }
  };

  // Nav links (for reuse)
  const navLinks = [
    {
      name: 'dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.55 8.52V3.98C22.55 2.57 21.91 2 20.32 2H16.28C14.69 2 14.05 2.57 14.05 3.98V8.51C14.05 9.93 14.69 10.49 16.28 10.49H20.32C21.91 10.5 22.55 9.93 22.55 8.52Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.55 19.77V15.73C22.55 14.14 21.91 13.5 20.32 13.5H16.28C14.69 13.5 14.05 14.14 14.05 15.73V19.77C14.05 21.36 14.69 22 16.28 22H20.32C21.91 22 22.55 21.36 22.55 19.77Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.05 8.52V3.98C11.05 2.57 10.41 2 8.82005 2H4.78005C3.19005 2 2.55005 2.57 2.55005 3.98V8.51C2.55005 9.93 3.19005 10.49 4.78005 10.49H8.82005C10.41 10.5 11.05 9.93 11.05 8.52Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.05 19.77V15.73C11.05 14.14 10.41 13.5 8.82005 13.5H4.78005C3.19005 13.5 2.55005 14.14 2.55005 15.73V19.77C2.55005 21.36 3.19005 22 4.78005 22H8.82005C10.41 22 11.05 21.36 11.05 19.77Z" stroke={activeItem === 'dashboard' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Dashboard',
      dropdown: false
    },
    {
      name: 'manage',
      icon: (
        <svg width="20" height="20"  viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6101 2H9.61011C4.61011 2 2.61011 4 2.61011 9V15C2.61011 20 4.61011 22 9.61011 22H15.6101C20.6101 22 22.6101 20 22.6101 15V13" stroke={activeItem === 'manage' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.6501 3.02L8.77011 10.9C8.47011 11.2 8.17011 11.79 8.11011 12.22L7.68011 15.23C7.52011 16.32 8.29011 17.08 9.38011 16.93L12.3901 16.5C12.8101 16.44 13.4001 16.14 13.7101 15.84L21.5901 7.96C22.9501 6.6 23.5901 5.02 21.5901 3.02C19.5901 1.02 18.0101 1.66 16.6501 3.02Z" stroke={activeItem === 'manage' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5201 4.15C16.1901 6.54 18.0601 8.41 20.4601 9.09" stroke={activeItem === 'manage' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Manage',
      dropdown: true,
      subitems: [
        { name: 'users', label: 'Users' },
        { name: 'teams', label: 'Teams' },
        { name: 'settings', label: 'Settings' }
      ]
    },
    {
      name: 'rewards',
      icon: (
        <svg width="20" height="20"  viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.67 15C16.398 15 19.42 12.0899 19.42 8.5C19.42 4.91015 16.398 2 12.67 2C8.94212 2 5.92004 4.91015 5.92004 8.5C5.92004 12.0899 8.94212 15 12.67 15Z" stroke={activeItem === 'rewards' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.19003 13.52L8.18005 20.9C8.18005 21.8 8.81006 22.24 9.59006 21.87L12.2701 20.6C12.4901 20.49 12.86 20.49 13.08 20.6L15.7701 21.87C16.5401 22.23 17.1801 21.8 17.1801 20.9V13.34" stroke={activeItem === 'rewards' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Rewards',
      dropdown: true,
      subitems: [
        { name: 'catalog', label: 'Catalog' },
        { name: 'history', label: 'History' }
      ]
    },
    {
      name: 'reports',
      icon: (
        <svg width="20" height="20"  viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.05 12C21.65 12 22.73 11 21.77 7.72C21.12 5.51 19.22 3.61 17.01 2.96C13.73 2 12.73 3.08 12.73 5.68V8.56C12.73 11 13.73 12 15.73 12H19.05Z" stroke={activeItem === 'reports' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.73 14.7C19.8 19.33 15.36 22.69 10.31 21.87C6.52003 21.26 3.47003 18.21 2.85003 14.42C2.04003 9.39 5.38003 4.95 9.99003 4.01" stroke={activeItem === 'reports' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Reports',
      dropdown: true,
      subitems: [
        { name: 'activity', label: 'Activity' },
        { name: 'performance', label: 'Performance' }
      ]
    },
    {
      name: 'games',
      icon: (
        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.3601 12.46L7.31006 15.51" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.34009 12.49L10.3901 15.54" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.3201 14H14.3301" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.26 14H18.27" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.29 15.98V15.96" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.29 12.04V12.02" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.79004 22H15.79C20.79 22 22.79 20 22.79 15V13C22.79 8 20.79 6 15.79 6H9.79004C4.79004 6 2.79004 8 2.79004 13V15C2.79004 20 4.79004 22 9.79004 22Z" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.8 2L13.79 3.01C13.78 3.56 13.34 4 12.79 4H12.76C12.21 4 11.77 4.45 11.77 5C11.77 5.55 12.22 6 12.77 6H13.77" stroke={activeItem === 'games' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Games',
      dropdown: false
    },
    {
      name: 'moderate',
      icon: (
        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8501 8C21.507 8 22.8501 6.65685 22.8501 5C22.8501 3.34315 21.507 2 19.8501 2C18.1932 2 16.8501 3.34315 16.8501 5C16.8501 6.65685 18.1932 8 19.8501 8Z" stroke={activeItem === 'moderate' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.8501 13H12.8501" stroke={activeItem === 'moderate' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.8501 17H16.8501" stroke={activeItem === 'moderate' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.8501 2H9.8501C4.8501 2 2.8501 4 2.8501 9V15C2.8501 20 4.8501 22 9.8501 22H15.8501C20.8501 22 22.8501 20 22.8501 15V10" stroke={activeItem === 'moderate' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Moderate',
      dropdown: false
    },
    {
      name: 'broadcasts',
      icon: (
        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.91003 8.5C2.91003 5 4.91003 3.5 7.91003 3.5H17.91C20.91 3.5 22.91 5 22.91 8.5V15.5C22.91 19 20.91 20.5 17.91 20.5H7.91003" stroke={activeItem === 'broadcasts' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.91 9L14.78 11.5C13.75 12.32 12.06 12.32 11.03 11.5L7.91003 9" stroke={activeItem === 'broadcasts' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.91003 16.5H8.91003" stroke={activeItem === 'broadcasts' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.91003 12.5H5.91003" stroke={activeItem === 'broadcasts' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Broadcasts',
      dropdown: false
    },
    {
      name: 'ideabox',
      icon: (
        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.26996 18.04V16.88C6.96996 15.49 5.07996 12.78 5.07996 9.9C5.07996 4.95 9.62996 1.07 14.77 2.19C17.03 2.69 19.01 4.19 20.04 6.26C22.13 10.46 19.93 14.92 16.7 16.87V18.03C16.7 18.32 16.81 18.99 15.74 18.99H10.23C9.12996 19 9.26996 18.57 9.26996 18.04Z" stroke={activeItem === 'ideabox' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.46997 22C11.76 21.35 14.18 21.35 16.47 22" stroke={activeItem === 'ideabox' ? "#0D6FFB" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Ideabox',
      dropdown: true
    }
  ];

  return (
    <nav className="flex items-center justify-between w-full px-5 py-3 bg-white border-b animate-slide-in-up relative">
      <div className="flex flex-col">
        <h1 className="text-h4 font-semibold text-dark mb-1">Analytical Dashboard</h1>
      </div>
      <ActivityFilters />
    </nav>
  );
};

export default Navigation;
