import { useState, useRef, useEffect } from 'react';
import { Filter as FilterIcon } from 'lucide-react';

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

  const textSize = size === 'sm' ? 'text-[16x]' : 'text-xs';

  return (
    <div className={isOpen ? "relative bg-black/30 transition-colors duration-200" : "relative transition-colors duration-200"} ref={dropdownRef}>
      <button
        className={`cursor-pointer bg-transparent border-none outline-none p-0`}
        onClick={toggleDropdown}
        type="button"
      >
        <div className='flex flex-row items-center justify-between gap-2 px-6 py-3 '>
        <div>
         <span className={`${textSize} text-[#8C9BAC] `}>Filters : </span>
        <span className={`${textSize} text-[#233143] font-semibold  `}>{selectedOption}</span>
      </div>
       <div className=' border-l pl-2'>
        <FilterIcon className="w-5 h-5 text-[#4f5a69] " />
        </div>
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 min-w-52 mt-2 bg-white shadow-lg rounded-xl z-50 py-2 px-1">
          {options.map((option) => (
            <div 
              key={option}
              className={`px-5 py-2 rounded-lg cursor-pointer font-semibold ${textSize} mb-1 last:mb-0 transition-colors
                ${option === selectedOption ? 'bg-[#F5F7FA] text-[#338FFF]' : 'text-[#233143] hover:bg-[#F5F7FA]'}
              `}
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
