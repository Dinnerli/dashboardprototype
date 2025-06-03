import { useState, useEffect } from 'react';
import overviewData from '../Data/OverviewCards.json';

interface OverviewCard {
  title: string;
  value: string;
  percentChange: number;
  isValueSuffixed: boolean;
  valueSuffix: string;
  tooltip: string;
  rising: boolean;
}

export const useGetOverviewData = () => {
  const [data, setData] = useState<OverviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Manual delay to simulate API call (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Transform the data to match the expected format
        const transformedData = overviewData.overviewCards.map(card => ({
          title: card.name,
          value: card.value,
          percentChange: card.trend,
          isValueSuffixed: false,
          valueSuffix: '',
          tooltip: card.tooltip,
          rising: card.rising,
        }));
        
        setData(transformedData);
      } catch (err) {
        setError('Failed to load overview data');
        console.error('Error loading overview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
