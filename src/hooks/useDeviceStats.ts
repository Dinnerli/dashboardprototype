import { useEffect, useState } from "react";
import { api } from "./api";

export interface DeviceStat {
  name: string;
  value: number;
  trend: string;
  isRising: boolean;
}

export interface UseDeviceStatsResult {
  data: DeviceStat[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  department?: string;
}

export function useDeviceStats({ startDate, endDate, department }: Params): UseDeviceStatsResult {
  const [data, setData] = useState<DeviceStat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    const fetchDeviceStats = async () => {
      try {
        let url = `/analytical_dashboard/getDeviceStats.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        if (department && department !== 'All') {
          url += `&q=${encodeURIComponent(department)}`;
        }
        const response = await api.get(url);
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch device stats");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceStats();
    // eslint-disable-next-line
  }, [startDate, endDate, department, reloadFlag]);

  return { data, loading, error, refetch };
}
