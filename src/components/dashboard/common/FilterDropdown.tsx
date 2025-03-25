
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  options: string[];
  defaultValue: string;
  label?: string;
  size?: 'sm' | 'md';
}

const FilterDropdown = ({ options, defaultValue, label, size = 'sm' }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
        {label && <span className={`${textSize} text-[#8C9BAC]`}>{label}</span>}
        <span className={`${textSize} text-[#8C9BAC]`}>{selectedOption}</span>
        <ChevronDown className={`${size === 'sm' ? 'w-6 h-6' : 'w-4 h-4'} text-[#8C9BAC] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md z-50 min-w-[120px]">
          {options.map((option) => (
            <div 
              key={option}
              className={`${textSize} px-3 py-2 hover:bg-gray-100 cursor-pointer ${option === selectedOption ? 'text-[#338FFF] font-medium' : 'text-[#4F5A69]'}`}
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
