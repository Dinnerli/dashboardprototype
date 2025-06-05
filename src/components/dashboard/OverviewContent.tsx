import StatsCard from './StatsCard';
import OverviewCardSkeleton from '../Skeletons/OverviewCard.skeleton';
import { useGetOverviewData } from '../../hooks/useGetOverviewData';

const OverviewContent = () => {
  const { data: stats, loading, error } = useGetOverviewData();

  if (loading) {
    return <OverviewCardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 px-3 sm:px-4 md:px-5 py-4 ">
        <div className="text-red-500 text-center">
          Error loading overview data: {error}
        </div>
      </div>
    );
  }
  return (
    <div 
      className={`flex flex-col gap-4 px-3 sm:px-4 md:px-5 py-4 animate-fade-in`}
    >
    <div className="flex overflow-x-auto  gap-4 animate-slide-in-up hide-scrollbar bg-[#F5F6F8] scroll-smooth snap-x snap-mandatory" data-animation-delay="0.1s">
      {stats.map((stat, idx) => (
        <StatsCard
          key={stat.title}
          {...stat}
          className="snap-start w-[75vw] min-w-[75vw] sm:w-64 sm:min-w-[16rem]"
        />
      ))}
    </div>
    </div>
  );
};

export default OverviewContent;
