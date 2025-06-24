import StatsCard from './StatsCard';
import OverviewCardSkeleton from '../Skeletons/OverviewCard.skeleton';
import { useTotalHrsOverview } from '../../hooks/useTotalHrsOverview';
import { useILTVILTOverview } from '../../hooks/useILTVILTOverview';
import overviewTooltips from '../../Data/OverviewTooltips.json';

const OverviewContent = () => {
  
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
  const isLoading = trainingHoursLoading || iltViltLoading;
  const hasError = trainingHoursError || iltViltError;

  if (isLoading) {
    return <OverviewCardSkeleton />;
  }

  if (hasError) {
    return (
      <div className="flex flex-col gap-6 px-3 sm:px-4 md:px-5 py-4 ">
        <div className="text-red-500 text-center">
          Error loading overview data: {trainingHoursError || iltViltError}
        </div>
      </div>
    );
  }
  // Transform API data to match StatsCard props
  const transformedTrainingHours = (trainingHoursData || []).map(card => ({
    title: card.name,
    value: card.value,
    percentChange: card.rising ? card.trend : -card.trend,
    tooltip: overviewTooltips[card.name as keyof typeof overviewTooltips],
  }));

  const transformedIltVilt = (iltViltData || []).map(card => ({
    title: card.name,
    value: card.value,
    percentChange: card.rising ? card.trend : -card.trend,
    tooltip: overviewTooltips[card.name as keyof typeof overviewTooltips],
  }));
  // Combine card data from the two endpoints
  const allCards = [
    ...transformedTrainingHours,
    ...transformedIltVilt
  ];return (
    <div 
      className={`flex flex-col gap-4  py-4 animate-fade-in`}
    >
      <div className="flex overflow-x-auto  gap-4 animate-slide-in-up hide-scrollbar bg-[#F5F6F8] scroll-smooth snap-x snap-mandatory" data-animation-delay="0.1s">        {allCards.map((card, idx) => (
          <StatsCard
            key={`${card.title}-${idx}`}
            title={card.title}
            value={card.value}
            percentChange={card.percentChange}
            tooltip={card.tooltip}
            className="snap-start w-[75vw] min-w-[75vw] sm:w-64 sm:min-w-[16rem]"
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewContent;
