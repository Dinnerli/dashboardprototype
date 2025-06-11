import { useEffect, useState } from "react";
import { api } from "./api";

export interface TenantContextData {
  userId: string;
  userName: string;
  userImage: string;
  tenantName: string;
  tenantLogoUrl: string;
}

export function useTenantContext() {
  const [data, setData] = useState<TenantContextData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenantContext = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          "/analytical_dashboard/getTenantContext.endpoint.php"
        );
        if (response.data?.success && response.data.result?.data) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch tenant context");
      } finally {
        setLoading(false);
      }
    };
    fetchTenantContext();
  }, []);

  return { data, loading, error };
}
