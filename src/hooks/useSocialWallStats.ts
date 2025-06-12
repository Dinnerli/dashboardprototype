import { useEffect, useState } from "react";
import { api } from "./api";

export interface ChartValue {
  name: string;
  value: number;
}

export interface SocialWallStat {
  title: string;
  value: number;
  trend: string;
  rising: boolean;
  chartValues: ChartValue[];
}

export interface UseSocialWallStatsResult {
  data: SocialWallStat[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
}

export function useSocialWallStats({ startDate, endDate }: Params): UseSocialWallStatsResult {
  const [data, setData] = useState<SocialWallStat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    
    const fetchSocialWallStats = async () => {
      try {
        const url = `/analytical_dashboard/getSocialWallStats.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        const response = await api.get(url);
        
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch social wall stats");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSocialWallStats();
  }, [startDate, endDate, reloadFlag]);

  return { data, loading, error, refetch };
}
