import { useEffect, useState } from "react";
import { api } from "./api";

export interface SocialActiveUser {
  title: string;
  value: number;
  trend: string;
  rising: boolean;
  chartValues?: Array<{ name: string; value: number }>;

}

export interface UseSocialActiveUsersResult {
  data: SocialActiveUser | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
}

export function useSocialActiveUsers({ startDate, endDate }: Params): UseSocialActiveUsersResult {
  const [data, setData] = useState<SocialActiveUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    
    const fetchActiveUsers = async () => {
      try {
        const url = `/analytical_dashboard/getSocialActiveUsers.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        const response = await api.get(url);
        
        if (response.data?.success && response.data.result?.data) {
          // The endpoint may now return chartValues for per-date active users
          setData(response.data.result.data as SocialActiveUser);
        } else {
          setError("Invalid response");
          setData(null);
        }      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch social active users");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActiveUsers();
  }, [startDate, endDate, reloadFlag]);

  return { data, loading, error, refetch };
}
