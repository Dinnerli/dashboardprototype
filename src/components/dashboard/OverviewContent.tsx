import StatsCard from './StatsCard';
import OverviewCardSkeleton from '../Skeletons/OverviewCard.skeleton';
import { useGetOverviewData } from '../../hooks/useGetOverviewData';
import { useTotalHrsOverview } from '../../hooks/useTotalHrsOverview';
import { useILTVILTOverview } from '../../hooks/useILTVILTOverview';

const OverviewContent = () => {
  const { data: stats, loading, error } = useGetOverviewData();
  
  // Get current date range (last year)
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
  
  const { 
    data: trainingHoursData, 
    loading: trainingHoursLoading, 
    error: trainingHoursError 
  } = useTotalHrsOverview({ startDate, endDate });
  
  const { 
    data: iltViltData, 
    loading: iltViltLoading, 
    error: iltViltError 
  } = useILTVILTOverview({ startDate, endDate });

  const isLoading = loading || trainingHoursLoading || iltViltLoading;
  const hasError = error || trainingHoursError || iltViltError;

  if (isLoading) {
    return <OverviewCardSkeleton />;
  }

  if (hasError) {
    return (
      <div className="flex flex-col gap-6 px-3 sm:px-4 md:px-5 py-4 ">
        <div className="text-red-500 text-center">
          Error loading overview data: {error || trainingHoursError || iltViltError}
        </div>
      </div>
    );
  }

  // Transform API data to match StatsCard props
  const transformedTrainingHours = (trainingHoursData || []).map(card => ({
    title: card.name,
    value: card.value,
    percentChange: card.rising ? card.trend : -card.trend,
  }));

  const transformedIltVilt = (iltViltData || []).map(card => ({
    title: card.name,
    value: card.value,
    percentChange: card.rising ? card.trend : -card.trend,
  }));

  // Combine all card data (hours first, then ILT/VILT, then existing stats)
  const allCards = [
    ...transformedTrainingHours,
    ...transformedIltVilt,
    ...stats
  ];  return (
    <div 
      className={`flex flex-col gap-4  py-4 animate-fade-in`}
    >
      <div className="flex overflow-x-auto  gap-4 animate-slide-in-up hide-scrollbar bg-[#F5F6F8] scroll-smooth snap-x snap-mandatory" data-animation-delay="0.1s">
        {allCards.map((card, idx) => (
          <StatsCard
            key={`${card.title}-${idx}`}
            title={card.title}
            value={card.value}
            percentChange={card.percentChange}
            className="snap-start w-[75vw] min-w-[75vw] sm:w-64 sm:min-w-[16rem]"
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewContent;
