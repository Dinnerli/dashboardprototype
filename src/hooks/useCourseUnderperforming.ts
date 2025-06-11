import { useEffect, useState } from "react";
import { api } from "./api";

export interface CourseUnderperforming {
  course_id: string;
  title: string;
  all: {
    value: number;
    rising: boolean;
    trend: string;
  };
  completed: {
    value: number;
    rising: boolean;
    trend: string;
  };
  failed: {
    value: number;
    rising: boolean;
    trend: string;
  };
}

export interface UseCourseUnderperformingResult {
  data: CourseUnderperforming[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  enabled?: boolean; // Control when the hook should fetch data
}

export function useCourseUnderperforming({ startDate, endDate, enabled = true }: Params): UseCourseUnderperformingResult {
  const [data, setData] = useState<CourseUnderperforming[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    if (!startDate || !endDate || !enabled) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const fetchCourseUnderperforming = async () => {
      try {
        const url = `/analytical_dashboard/getCourseUnderperforming.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        const response = await api.get(url);
        
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch underperforming courses");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseUnderperforming();
  }, [startDate, endDate, enabled, reloadFlag]);

  return { data, loading, error, refetch };
}
