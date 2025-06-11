import { useEffect, useState } from "react";
import { api } from "./api";

export interface AdminActivity {
  name: string;
  value: number;
  trend: string;
  isRising: boolean;
}

export interface UseAdminActivityResult {
  data: AdminActivity[] | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
}

export function useAdminActivity({ startDate, endDate }: Params): UseAdminActivityResult {
  const [data, setData] = useState<AdminActivity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    
    const fetchAdminActivity = async () => {
      try {
        const url = `/analytical_dashboard/getAdminActivity.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        const response = await api.get(url);
        
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
          // Set message if it exists (e.g., "Deleted activity data not available for the selected range.")
          setMessage(response.data.result.message || null);
        } else {
          setError("Invalid response");
          setData(null);
          setMessage(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch admin activity");
        setData(null);
        setMessage(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminActivity();
    // eslint-disable-next-line
  }, [startDate, endDate, reloadFlag]);

  return { data, loading, error, message, refetch };
}
