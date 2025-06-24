import { useState, useRef, useEffect } from 'react';
import { Filter as FilterIcon, ChevronDown } from 'lucide-react';
import { Checkbox } from '../../ui/checkbox';

export interface HierarchicalOption {
  id: string;
  name: string;
  children?: HierarchicalOption[];
}

interface HierarchicalFilterDropdownProps {
  options: HierarchicalOption[];
  defaultValue: string[];
  onChange?: (selectedIds: string[]) => void;
  value?: string[];
  disabled?: boolean;
  size?: 'sm' | 'md';
}

const HierarchicalFilterDropdown = ({
  options,
  defaultValue = [],
  onChange,
  value,
  disabled = false,
  size = 'sm',
}: HierarchicalFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(value || defaultValue);
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isChecked = (id: string) => selected.includes(id);
  const isIndeterminate = (parent: HierarchicalOption) => {
    if (!parent.children) return false;
    const childIds = parent.children.map(c => c.id);
    const checkedCount = childIds.filter(id => selected.includes(id)).length;
    return checkedCount > 0 && checkedCount < childIds.length;
  };
  const handleParentToggle = (parent: HierarchicalOption) => {
    if (!parent.children || parent.children.length === 0) {
      handleToggle(parent.id);
      return;
    }
    const childIds = parent.children.map(c => c.id);
    const allSelected = childIds.every(id => selected.includes(id));
    let newSelected = selected.filter(id => !childIds.includes(id) && id !== parent.id);
    if (!allSelected) {
      newSelected = [...newSelected, parent.id, ...childIds];
    }
    setSelected(newSelected);
    onChange?.(newSelected);
  };
  const handleChildToggle = (parent: HierarchicalOption, child: HierarchicalOption) => {
    let newSelected = [...selected];
    if (selected.includes(child.id)) {
      newSelected = newSelected.filter(id => id !== child.id);
    } else {
      newSelected.push(child.id);
    }
    // If all children are selected, select parent too
    if (parent.children) {
      const childIds = parent.children.map(c => c.id);
      const allChildrenSelected = childIds.every(id => newSelected.includes(id));
      if (allChildrenSelected) {
        newSelected.push(parent.id);
      } else {
        newSelected = newSelected.filter(id => id !== parent.id);
      }
    }
    setSelected(newSelected);
    onChange?.(newSelected);
  };
  const handleToggle = (id: string) => {
    let newSelected = [...selected];
    if (selected.includes(id)) {
      newSelected = newSelected.filter(sid => sid !== id);
    } else {
      newSelected.push(id);
    }
    setSelected(newSelected);
    onChange?.(newSelected);
  };
  const getDisplayText = () => {
    if (selected.length === 0) return '';
    if (selected.length === 1) {
      const found = findOptionById(options, selected[0]);
      if (!found) return '';
      return found.name.length > 7 ? found.name.slice(0, 7) + '…' : found.name;
    }
    const displayItems = selected.slice(0, 3).map(id => {
      const found = findOptionById(options, id);
      const name = found ? found.name : id;
      return name.length > 7 ? name.slice(0, 7) + '…' : name;
    });
    let displayText = displayItems.join(', ');
    if (selected.length > 3) displayText += `, +${selected.length - 3} more`;
    return displayText;
  };

  function findOptionById(opts: HierarchicalOption[], id: string): HierarchicalOption | undefined {
    for (const opt of opts) {
      if (opt.id === id) return opt;
      if (opt.children) {
        const found = findOptionById(opt.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  // Add 'All Groups' synthetic option
  const allGroupsOption: HierarchicalOption = { id: '__all_groups__', name: 'All Groups' };
  const optionsWithAll = [allGroupsOption, ...options];

  const handleAllGroupsToggle = () => {
    if (selected.length === options.flatMap(opt => [opt.id, ...(opt.children?.map(c => c.id) || [])]).length) {
      // Deselect all
      setSelected([]);
      onChange?.([]);
    } else {
      // Select all
      const allIds = options.flatMap(opt => [opt.id, ...(opt.children?.map(c => c.id) || [])]);
      setSelected(allIds);
      onChange?.(allIds);
    }
  };

  const isAllGroupsChecked = () => {
    const allIds = options.flatMap(opt => [opt.id, ...(opt.children?.map(c => c.id) || [])]);
    return allIds.length > 0 && allIds.every(id => selected.includes(id));
  };
  const isAllGroupsIndeterminate = () => {
    const allIds = options.flatMap(opt => [opt.id, ...(opt.children?.map(c => c.id) || [])]);
    return selected.length > 0 && !isAllGroupsChecked();
  };

  const textSize = size === 'sm' ? 'text-[16px]' : 'text-xs';

  // Toggle accordion for a parent
  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        className={`flex flex-row w-auto items-center justify-between gap-2 min-w-64 px-6 py-3 border-none outline-none p-0 ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-transparent'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        type="button"
        disabled={disabled}
      >
        <div className="flex-1 text-left overflow-hidden whitespace-nowrap min-w-0">
          <span className={`${textSize} text-[#8C9BAC]`}>Filters : </span>
          <span className={`${textSize} text-[#233143] font-semibold inline-block truncate max-w-[120px] align-top`} title={getDisplayText()}>
            {getDisplayText()}
          </span>
        </div>
        <div className='border-l pl-2'>
          <FilterIcon className="w-5 h-5 text-[#4f5a69]" />
        </div>
      </button>
      {isOpen && !disabled && (
        <div className="absolute top-full right-0 min-w-52 mt-5 bg-white shadow-lg rounded-xl z-50 py-2 px-1">
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* All Groups option at the top */}
            <div className="mb-2">
              <div
                className="flex items-center gap-2 px-3 py-2 font-semibold rounded-lg transition-colors group select-none relative cursor-pointer"
                onClick={handleAllGroupsToggle}
              >
                <span className="relative flex items-center">
                  <Checkbox
                    checked={isAllGroupsChecked()}
                    indeterminate={isAllGroupsIndeterminate()}
                    onCheckedChange={handleAllGroupsToggle}
                    className="mr-2"
                  />
                </span>
                <span className="flex-1 cursor-pointer">All Groups</span>
              </div>
              <div className="border-b border-gray-200 my-2 w-full" />
            </div>
            {/* Render the rest of the options */}
            {options.map(parent => (
              <div key={parent.id} className="mb-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 font-semibold rounded-lg transition-colors group select-none relative cursor-pointer"
                  onClick={() => {
                    if (parent.children && parent.children.length > 0) {
                      toggleExpand(parent.id);
                    } else {
                      handleParentToggle(parent);
                    }
                  }}
                >
                  <span className="relative flex items-center">
                    <Checkbox
                      checked={isChecked(parent.id)}
                      onCheckedChange={() => handleParentToggle(parent)}
                      className="mr-2"
                    />
                    {isIndeterminate(parent) && (
                      <span className="absolute left-1 top-1 w-2 h-0.5 bg-gray-500 rounded pointer-events-none" />
                    )}
                  </span>
                  <span
                    className={`flex-1 ${(!parent.children || parent.children.length === 0) ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (!parent.children || parent.children.length === 0) {
                        handleParentToggle(parent);
                      }
                    }}
                  >
                    {parent.name}
                  </span>
                  {parent.children && parent.children.length > 0 && (
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 group-hover:text-[#338FFF] transition-transform ${expanded[parent.id] ? 'rotate-180' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleExpand(parent.id); }}
                    />
                  )}
                </div>
                {parent.children && parent.children.length > 0 && expanded[parent.id] && (
                  <div className="ml-7 pl-3 mt-1">
                    {parent.children.map(child => (
                      <div
                        key={child.id}
                        className="flex items-center gap-2 px-3 py-1 rounded transition-colors hover:bg-[#F5F7FA] cursor-pointer"
                        onClick={() => handleChildToggle(parent, child)}
                      >
                        <span onClick={e => {
                          e.stopPropagation();
                          handleChildToggle(parent, child);
                        }}>
                          <Checkbox
                            checked={isChecked(child.id)}
                            onCheckedChange={() => handleChildToggle(parent, child)}
                            className="mr-2 rounded-[4px]"
                          />
                        </span>
                        <span className="flex-1" onClick={() => handleChildToggle(parent, child)}>{child.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-b border-gray-200 my-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HierarchicalFilterDropdown;
