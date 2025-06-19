import { useEffect, useRef, useState } from 'react';
import ActivityFilters from '../dashboard/activities/ActivityFilters';

const Navigation = () => {

  const [menuOpen, setMenuOpen] = useState(false);
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





  return (
    <nav className="flex items-center justify-between w-full px-5 py-3 bg-white border-b animate-slide-in-up relative">
      <div className="flex flex-col">
        <h1 className="text-h4 font-semibold text-dark mb-1">Insight Desk</h1>
      </div>
      <ActivityFilters />
    </nav>
  );
};

export default Navigation;
