import { useState, useEffect } from 'react';
import { api } from './api';

export interface RankLobbyItem {
  rank: string;
  active: boolean;
  users: number;
  value: string;
}

export interface RankLobbyResponse {
  success: boolean;
  result: {
    message: string;
    data: RankLobbyItem[];
  };
  error: null | string;
}

interface UseRankLobbyProps {
  startDate: string;
  endDate: string;
  department: string;
}

export const useRankLobby = ({ startDate, endDate, department }: UseRankLobbyProps) => {
  const [data, setData] = useState<RankLobbyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchRankLobbyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // API call to get rank lobby data
        const response = await api.get(`/analytical_dashboard/getRanks.endpoint.php?startDate=${startDate}&endDate=${endDate}`);
        
        if (response.data?.success && Array.isArray(response.data.result?.data)) {
          setData(response.data.result.data);
        } else {
          setError("Invalid response format");
          setData([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rank lobby data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRankLobbyData();
  }, [startDate, endDate, department]);

  return { data, loading, error };
};
