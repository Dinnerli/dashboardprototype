import { useState } from 'react';
import StatsCard from './StatsCard';

const OverviewContent = () => {
  const stats = [
    {
      title: 'Training Data',
      value: '17',
      valueSuffix: 'hrs',
      isValueSuffixed: true,
      percentChange: 25.3,
    },
    {
      title: 'Avg. Daily Usage',
      value: '8',
      valueSuffix: 'hrs',
      isValueSuffixed: true,
      percentChange: -25.3,
    },
    {
      title: 'ILT Enrolled Rate',
      value: '15%',
      percentChange: 25.3,
    },
    {
      title: 'ILT Dropout Rate',
      value: '35%',
      percentChange: -25.3,
    },
    {
      title: 'VILT Enrolled Rate',
      value: '6%',
      percentChange: 25.3,
    },
    {
      title: 'VILT Dropout Rate',
      value: '35%',
      percentChange: -25.3,
    },
  ];

  return (
    <div
      className="flex overflow-x-auto pb-4 gap-6 animate-slide-in-up hide-scrollbar bg-[#F5F6F8] scroll-smooth snap-x snap-mandatory"
      data-animation-delay="0.1s"
    >
      {stats.map((stat, idx) => (
        <StatsCard
          key={stat.title}
          {...stat}
          className="snap-start w-[75vw] min-w-[75vw] lg:w-64 lg:min-w-[16rem] "
        />
      ))}
    </div>
  );
};

export default OverviewContent;
