
import StatsCard from './StatsCard';

const OverviewContent = () => {
  return (
    <div className="flex overflow-x-auto pb-4 space-x-5 animate-slide-in-up hide-scrollbar" style={{ animationDelay: '0.1s' }}>
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
