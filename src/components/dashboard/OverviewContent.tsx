
import { Users, Gauge, Wallet, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

const OverviewContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
      <StatCard
        title="Total Users"
        value="28,427"
        change={{ value: 12.5, positive: true }}
        icon={<Users size={18} className="text-blue" />}
      />
      
      <StatCard
        title="Active Games"
        value="342"
        change={{ value: 5.3, positive: true }}
        icon={<Gauge size={18} className="text-blue" />}
      />
      
      <StatCard
        title="Revenue"
        value="$24,518"
        change={{ value: 2.1, positive: false }}
        icon={<Wallet size={18} className="text-blue" />}
      />
      
      <StatCard
        title="Engagement"
        value="58.2%"
        change={{ value: 8.7, positive: true }}
        icon={<TrendingUp size={18} className="text-blue" />}
      />
      
      {/* More cards can be added here later */}
    </div>
  );
};

export default OverviewContent;
