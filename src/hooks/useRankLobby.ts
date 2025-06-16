import { useState, useEffect } from 'react';

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
        
        // Mock API call - replace with your actual API endpoint
        // const response = await fetch(`/api/rank-lobby?startDate=${startDate}&endDate=${endDate}&department=${department}`);
        // const result: RankLobbyResponse = await response.json();
        
        // Mock data based on your API structure
        const mockData: RankLobbyItem[] = [
          { rank: "test0193", active: false, users: 1428, value: "80.91%" },
          { rank: "Beginner-k", active: true, users: 1338, value: "75.81%" },
          { rank: "Rank new", active: true, users: 66, value: "3.74%" },
          { rank: "xsac", active: false, users: 63, value: "3.57%" },
          { rank: "xsad", active: false, users: 63, value: "3.57%" },
          { rank: "ADXAS", active: false, users: 63, value: "3.57%" },
          { rank: "New", active: true, users: 57, value: "3.23%" },
          { rank: "Deletion Rank", active: false, users: 49, value: "2.78%" },
          { rank: "Delete Rank", active: false, users: 49, value: "2.78%" },
          { rank: "xasca", active: false, users: 49, value: "2.78%" },
          { rank: "test ", active: true, users: 44, value: "2.49%" },
          { rank: "tenjsd", active: false, users: 44, value: "2.49%" },
          { rank: "sADS", active: false, users: 44, value: "2.49%" },
          { rank: "erer", active: false, users: 38, value: "2.15%" },
          { rank: "ererer1212", active: false, users: 20, value: "1.13%" },
          { rank: "test", active: false, users: 18, value: "1.02%" },
          { rank: "ererer1212", active: false, users: 10, value: "0.57%" },
          { rank: "ererer", active: false, users: 10, value: "0.57%" },
          { rank: "ff", active: false, users: 8, value: "0.45%" },
          { rank: "Junior", active: true, users: 7, value: "0.4%" },
          { rank: "ddddd3131", active: false, users: 3, value: "0.17%" },
          { rank: "Elite", active: true, users: 3, value: "0.17%" },
          { rank: "kokok", active: false, users: 2, value: "0.11%" },
          { rank: "Test_Rank_1", active: false, users: 1, value: "0.06%" },
          { rank: "test13253", active: false, users: 1, value: "0.06%" },
          { rank: "විශිෂ්ටයා", active: false, users: 0, value: "0%" },
          { rank: "ghhgbg", active: false, users: 0, value: "0%" },
          { rank: "tttttttt", active: false, users: 0, value: "0%" }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rank lobby data');
      } finally {
        setLoading(false);
      }
    };

    fetchRankLobbyData();
  }, [startDate, endDate, department]);

  return { data, loading, error };
};
