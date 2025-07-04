import { useEffect, useState } from "react";
import { api } from "./api";

export interface ILTVILTCard {
  name: string;
  value: string;
  trend: number;
  rising: boolean;
}

export interface UseILTVILTOverviewResult {
  data: ILTVILTCard[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  site?: string;
}

export function useILTVILTOverview({ startDate, endDate, site }: Params): UseILTVILTOverviewResult {
  const [data, setData] = useState<ILTVILTCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    const fetchILTVILTOverview = async () => {
      try {
        let url = `/analytical_dashboard/getILTVILTOverview.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        if (site) {
          url += `&site=${encodeURIComponent(site)}`;
        }
        const response = await api.get(url);
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch ILT/VILT overview");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchILTVILTOverview();
  }, [startDate, endDate, site, reloadFlag]);

  return { data, loading, error, refetch };
}
