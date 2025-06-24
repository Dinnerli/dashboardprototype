import { useEffect, useState } from "react";
import { api } from "./api";

export interface DepartmentOption {
  id: string;
  name: string;
  children?: DepartmentOption[];
}

export interface UseDepartmentsResult {
  data: DepartmentOption[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDepartments(): UseDepartmentsResult {
  const [data, setData] = useState<DepartmentOption[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = () => setReloadFlag(f => f + 1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchDepartments = async () => {
      try {
        const url = `/analytical_dashboard/getDepartments.endpoint.php`;
        const response = await api.get(url);
        // Expecting hierarchical data
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          // Remove the old 'All' option, just use the API data
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
          setData(null);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch departments");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDepartments();
  }, [reloadFlag]);

  return { data, loading, error, refetch };
}
