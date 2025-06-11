import { useEffect, useState } from "react";
import axios from "axios";

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
        const site = import.meta.env.VITE_TENANT_SITE;
        const baseUrl = import.meta.env.VITE_BASE_URL || "";
        const url = `${baseUrl}/analytical_dashboard/getTenantContext.endpoint.php?site=${site}`;
        console.log("Fetching tenant context from:", url);
        const response = await axios.get(url);
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
