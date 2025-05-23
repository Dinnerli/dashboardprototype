import { useState } from 'react';
import StatsCard from './StatsCard';
import overviewData from '../../Data/OverviewCards.json';

const OverviewContent = () => {
  const stats = overviewData.overviewCards.map(card => ({
    title: card.name,
    value: card.value,
    percentChange: card.trend,
    isValueSuffixed: false,
    valueSuffix: '',
    tooltip: card.tooltip,
    rising: card.rising,
  }));

  return (
    <div className="flex overflow-x-auto pb-4 gap-6 animate-slide-in-up hide-scrollbar bg-[#F5F6F8] scroll-smooth snap-x snap-mandatory" data-animation-delay="0.1s">
      {stats.map((stat, idx) => (
        <StatsCard
          key={stat.title}
          {...stat}
          className="snap-start w-[75vw] min-w-[75vw] sm:w-64 sm:min-w-[16rem]"
        />
      ))}
    </div>
  );
};

export default OverviewContent;
