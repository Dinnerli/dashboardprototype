
import OverviewContent from './OverviewContent';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 px-5 py-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <OverviewContent />
    </div>
  );
};

export default Dashboard;
