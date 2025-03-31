
import { useMediaQuery } from '@mui/material';
import OverviewContent from './OverviewContent';

const Dashboard = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  return (
    <div 
      className={`flex flex-col gap-6 px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6 animate-fade-in`} 
      style={{ animationDelay: '0.2s' }}
    >
      <OverviewContent />
    </div>
  );
};

export default Dashboard;
