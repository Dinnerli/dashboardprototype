import { useState, useRef, useEffect } from 'react';
import { Filter as FilterIcon, Check } from 'lucide-react';

interface FilterDropdownProps {
  options: string[];
  defaultValue: string;
  label?: string;
  size?: 'sm' | 'md';
  onChange?: (selectedOptions: string[]) => void; // Changed to handle multiple selections
  value?: string[]; // Changed to handle multiple values
  disabled?: boolean;
}

const FilterDropdown = ({ options, defaultValue, label, size = 'sm', onChange, value, disabled = false }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value || [defaultValue]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update internal state when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedOptions(value);
    }
  }, [value]);

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

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  const toggleOption = (option: string) => {
    let newSelected: string[];
    
    if (option === 'All') {
      // If "All" is clicked, select only "All" and deselect everything else
      newSelected = ['All'];
    } else {
      // If any other option is clicked
      if (selectedOptions.includes('All')) {
        // If "All" was previously selected, unselect it and select only this option
        newSelected = [option];
      } else if (selectedOptions.includes(option)) {
        // Remove the option if it's already selected
        newSelected = selectedOptions.filter(item => item !== option);
        // If no options are left, default to "All"
        if (newSelected.length === 0) {
          newSelected = ['All'];
        }
      } else {
        // Add the option
        newSelected = [...selectedOptions, option];
      }
    }
    
    setSelectedOptions(newSelected);
    
    // Call onChange with the appropriate parameters
    if (onChange) {
      // If "All" is selected, send empty array (don't send any params)
      const paramsToSend = newSelected.includes('All') ? [] : newSelected;
      onChange(paramsToSend);
    }
  };
  const getDisplayText = () => {
    if (selectedOptions.includes('All') || selectedOptions.length === 0) {
      return 'All';
    }
    if (selectedOptions.length === 1) {
      return selectedOptions[0];
    }
    
    // Show concatenated names of first 5 selected items
    const displayItems = selectedOptions.slice(0, 5);
    let displayText = displayItems.join(', ');
    
    // Add "..." if there are more than 5 items
    if (selectedOptions.length > 5) {
      displayText += `, +${selectedOptions.length - 5} more`;
    }
    
    return displayText;
  };

  const textSize = size === 'sm' ? 'text-[16px]' : 'text-xs';
  return (
    <div className={isOpen ? "relative w-64 transition-colors duration-200" : "relative w-64 transition-colors duration-200"} ref={dropdownRef}>
      <button
        className={
          `flex flex-row w-auto items-center justify-between gap-2 min-w-64 px-6 py-3 border-none outline-none p-0 ${
            disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-transparent'
          }` // match DateRangePicker style
        }
        onClick={toggleDropdown}
        type="button"
        disabled={disabled}      >        
        <div className="flex-1 text-left overflow-hidden whitespace-nowrap min-w-0">
          <span className={`${textSize} text-[#8C9BAC]`}>Filters : </span>
          <span 
            className={`${textSize} text-[#233143] font-semibold inline-block truncate max-w-[120px] align-top`}
            title={getDisplayText()} // Show full text on hover
          >
            {getDisplayText()}
          </span>
        </div>
        <div className='border-l pl-2'>
          <FilterIcon className="w-5 h-5 text-[#4f5a69]" />
        </div>
      </button>
      {isOpen && !disabled && (
        <div className="absolute top-full right-0 min-w-52 mt-5 bg-white shadow-lg rounded-xl z-50 py-2 px-1">          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {options.map((option) => {
              // When "All" is selected, show all checkboxes as checked
              // Otherwise, show individual selection state
              const isSelected = selectedOptions.includes('All') ? true : selectedOptions.includes(option);
              
              return (
                <div
                  key={option}
                  className={`px-3 py-2 rounded-lg cursor-pointer font-semibold ${textSize} mb-1 last:mb-0 transition-colors flex items-center gap-2
                    ${isSelected ? 'bg-[#F5F7FA] text-[#338FFF]' : 'text-[#233143] hover:bg-[#F5F7FA]'}
                  `}
                  onClick={() => toggleOption(option)}
                >
                  <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'bg-[#338FFF] border-[#338FFF]' 
                      : 'border-gray-300 hover:border-[#338FFF]'
                  }`}>
                    {isSelected && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
