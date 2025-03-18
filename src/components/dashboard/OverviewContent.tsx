
import StatsCard from './StatsCard';

const OverviewContent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-5 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
      <StatsCard
        title="Total training hours"
        value="17"
        valueSuffix="hrs"
        isValueSuffixed={true}
        percentChange={25.3}
      />
      
      <StatsCard
        title="Avg. Daily Usage"
        value="8"
        valueSuffix="hrs"
        isValueSuffixed={true}
        percentChange={-25.3}
      />
      
      <StatsCard
        title="ILT Enrolled Rate"
        value="15%"
        percentChange={25.3}
      />
      
      <StatsCard
        title="ILT Dropout Rate"
        value="35%"
        percentChange={-25.3}
      />
      
      <StatsCard
        title="VILT Enrolled Rate"
        value="6%"
        percentChange={25.3}
      />
      
      <StatsCard
        title="VILT Dropout Rate"
        value="35%"
        percentChange={-25.3}
      />
    </div>
  );
};

export default OverviewContent;
