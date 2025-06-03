import { useState, useEffect } from 'react';
import activityOverview from '../Data/ActivityOverview.json';

export type TabType = 'user' | 'usage' | 'course';

interface ActivityStat {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  tooltip: string;
  data: { month: string; value: number }[];
}

interface ActivityTab {
  key: TabType;
  label: string;
  stats: ActivityStat[];
  chartType: TabType;
}

interface ActivityData {
  tabs: ActivityTab[];
  tabKeyList: TabType[];
}

// Map JSON tab names to TabType keys
const tabKeyMap: Record<string, TabType> = {
  "User": "user",
  "Usage": "usage",
  "Course": "course"
};

export const useGetActivitiesData = () => {
  const [data, setData] = useState<ActivityData | null>(null);
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
        const tabsFromJson = activityOverview.ActivityOverview.map((tab) => {
          const key = tabKeyMap[tab.name];
          return {
            key,
            label: tab.name,
            stats: tab.stats.map((stat) => ({
              title: stat.name,
              value: stat.value,
              percentage: stat.trend,
              isPositive: stat.isPositive,
              tooltip: stat.tooltip,
              data: stat.data
            })),
            chartType: key
          };
        });

        const tabKeyList: TabType[] = tabsFromJson.map(tab => tab.key);
        
        setData({
          tabs: tabsFromJson,
          tabKeyList
        });
      } catch (err) {
        setError('Failed to load activities data');
        console.error('Error loading activities data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
