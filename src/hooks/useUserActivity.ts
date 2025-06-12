import { useEffect, useState } from "react";
import { api } from "./api";

export interface UserActivityStat {
  title: string;
  value: number;
  trend: string;
  rising: boolean;
  chartValues: Array<{
    name: string;
    value: number;
  }>;
}

export interface UseUserActivityResult {
  data: UserActivityStat[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  department?: string;
}

export function useUserActivity({ startDate, endDate, department }: Params): UseUserActivityResult {
  const [data, setData] = useState<UserActivityStat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    
    const fetchUserActivity = async () => {
      try {
        let url = `/analytical_dashboard/getUserActivityStats.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        if (department && department !== 'All') {
          url += `&q=${encodeURIComponent(department)}`;
        }
        
        const response = await api.get(url);
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch user activity");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserActivity();
  }, [startDate, endDate, department, reloadFlag]);

  return { data, loading, error, refetch };
}
