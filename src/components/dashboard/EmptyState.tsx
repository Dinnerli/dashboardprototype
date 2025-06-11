import React from 'react';

interface EmptyStateProps {
  cardName: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ cardName, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {/* Empty state image */}
      <div className="mb-4">
        <img 
          src="https://www.layupcloud.com/templates/assets/img/table/img-empty-data.gif" 
          alt="No data found"
          className="w-32 h-32 object-contain opacity-80"
          loading="lazy"
        />
      </div>
      
      {/* Empty state text */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">
          No {cardName} Found
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          There are no {cardName.toLowerCase()} available for the selected filters.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
