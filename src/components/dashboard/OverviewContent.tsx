import { useState } from 'react';
import StatsCard from './StatsCard';

const OverviewContent = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    setSelectedCard(selectedCard === title ? null : title);
  };

  return (
    <div className="flex overflow-x-auto pb-4 justify-between gap-6 animate-slide-in-up hide-scrollbar bg-[#F5F6F8]" style={{ animationDelay: '0.1s' }}>
      <StatsCard
        title="Total training hours"
        value="17"
        valueSuffix="hrs"
        isValueSuffixed={true}
        percentChange={25.3}
        isSelected={selectedCard === "Total training hours"}
        onClick={() => handleCardClick("Total training hours")}
      />
      
      <StatsCard
        title="Avg. Daily Usage"
        value="8"
        valueSuffix="hrs"
        isValueSuffixed={true}
        percentChange={-25.3}
        isSelected={selectedCard === "Avg. Daily Usage"}
        onClick={() => handleCardClick("Avg. Daily Usage")}
      />
      
      <StatsCard
        title="ILT Enrolled Rate"
        value="15%"
        percentChange={25.3}
        isSelected={selectedCard === "ILT Enrolled Rate"}
        onClick={() => handleCardClick("ILT Enrolled Rate")}
      />
      
      <StatsCard
        title="ILT Dropout Rate"
        value="35%"
        percentChange={-25.3}
        isSelected={selectedCard === "ILT Dropout Rate"}
        onClick={() => handleCardClick("ILT Dropout Rate")}
      />
      
      <StatsCard
        title="VILT Enrolled Rate"
        value="6%"
        percentChange={25.3}
        isSelected={selectedCard === "VILT Enrolled Rate"}
        onClick={() => handleCardClick("VILT Enrolled Rate")}
      />
      
      <StatsCard
        title="VILT Dropout Rate"
        value="35%"
        percentChange={-25.3}
        isSelected={selectedCard === "VILT Dropout Rate"}
        onClick={() => handleCardClick("VILT Dropout Rate")}
      />
    </div>
  );
};

export default OverviewContent;
