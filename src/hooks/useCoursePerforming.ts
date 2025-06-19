import { useEffect, useState } from "react";
import { api } from "./api";

export interface CoursePerformance {
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
  passed: {
    value: number;
    rising: boolean;
    trend: string;
  };
}

export interface UseCoursePerformingResult {
  data: CoursePerformance[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  enabled?: boolean; // Control when the hook should fetch data
  department?: string;
}

export function useCoursePerforming({ startDate, endDate, enabled = true, department }: Params): UseCoursePerformingResult {
  const [data, setData] = useState<CoursePerformance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);  useEffect(() => {
    if (!startDate || !endDate || !enabled) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const fetchCoursePerforming = async () => {
      try {
        let url = `/analytical_dashboard/getCoursePerforming.endpoint.php?startDate=${startDate}&endDate=${endDate}`;
        if (department && department !== 'All') {
          url += `&groups=${encodeURIComponent(department)}`;
        }
        const response = await api.get(url);
        
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch performing courses");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursePerforming();
  }, [startDate, endDate, enabled, department, reloadFlag]);

  return { data, loading, error, refetch };
}