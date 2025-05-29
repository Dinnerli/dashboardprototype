import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface InfoTooltipProps {
  tooltip?: string;
  delayDuration?: number;
  iconProps?: React.ComponentProps<typeof Info>;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ tooltip, delayDuration = 300, iconProps }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!tooltip) {
    return <Info {...iconProps} />;
  }

  return (
    <TooltipProvider>
      {isMobile ? (
        <Tooltip open={open} onOpenChange={setOpen} delayDuration={0}>
          <TooltipTrigger asChild>
            <span
              tabIndex={0}
              onClick={e => {
                e.stopPropagation();
                setOpen(prev => !prev);
              }}
            >
              <Info {...iconProps} />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" align="center" className="max-w-[180px] text-center">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip delayDuration={delayDuration}>
          <TooltipTrigger asChild>
            <span tabIndex={0} onClick={e => e.stopPropagation()} className='cursor-pointer'>
              <Info {...iconProps} />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" align="center" className="max-w-[180px] text-center">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
};

export default InfoTooltip;
