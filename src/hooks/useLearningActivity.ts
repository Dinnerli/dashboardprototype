import { useEffect, useState } from "react";
import { api } from "./api";
import { LearningActivitiesResponse, Activity } from "@/types/LearningActivities";

export interface UseLearningActivityResult {
  data: Activity[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  department?: string;
}

export function useLearningActivity({ startDate, endDate, department }: Params): UseLearningActivityResult {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    
    const fetchLearningActivity = async () => {
      try {
        let url = `/analytical_dashboard/getLearningActivity.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        if (department && department !== 'All') {
          url += `&groups=${encodeURIComponent(department)}`;
        }
        const response = await api.get(url);
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch learning activity");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLearningActivity();
  }, [startDate, endDate, department, reloadFlag]);

  return { data, loading, error, refetch };
}
