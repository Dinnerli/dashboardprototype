import { useEffect, useState, useCallback } from "react";
import { api } from "./api";

export interface Leader {
  id: string;
  name: string;
  email: string;
  points: string;
  profileImage: string | null;
  position: number;
}

export interface LeaderboardPagination {
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UseLeaderboardResult {
  data: Leader[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
  pagination: LeaderboardPagination | null;
}

interface Params {
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  department?: string;
  search?: string;
}

export function useLeaderboard({ startDate, endDate, department, search }: Params): UseLeaderboardResult {
  const [data, setData] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<LeaderboardPagination | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const refetch = useCallback(() => {
    setReloadFlag(f => f + 1);
    setCurrentPage(1);
    setData([]);
  }, []);

  const fetchLeaderboard = useCallback(async (page: number, isLoadMore: boolean = false) => {
    if (!startDate || !endDate) return;
    
    if (!isLoadMore) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);
    
    try {
      let url = `/analytical_dashboard/getLeaderboard.endpoint.php?startDate=${startDate}&endDate=${endDate}&page=${page}`;
      
      if (department && department !== 'All') {
        url += `&q=${encodeURIComponent(department)}`;
      }
      
      if (search && search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }      const response = await api.get(url);
      
      if (response.data?.success && response.data.result?.data?.data) {
        const newData = response.data.result.data.data; // Correct path to the array
        const paginationInfo = response.data.result.data.pagination; // Correct path to pagination
        
        if (isLoadMore) {
          setData(prev => [...prev, ...newData]);
        } else {
          setData(newData);
        }
        
        setPagination(paginationInfo);
      } else {
        setError("Invalid response format");
        if (!isLoadMore) {
          setData([]);
        }
      }    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch leaderboard";
      console.error("Error fetching leaderboard:", err);
      setError(errorMessage);
      if (!isLoadMore) {
        setData([]);
      }
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [startDate, endDate, department, search]);

  const loadMore = useCallback(() => {
    if (pagination?.hasMore && !isLoadingMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchLeaderboard(nextPage, true);
    }
  }, [pagination?.hasMore, isLoadingMore, loading, currentPage, fetchLeaderboard]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    
    // Reset pagination when filters change
    setCurrentPage(1);
    setData([]);
    fetchLeaderboard(1, false);
    // eslint-disable-next-line
  }, [startDate, endDate, department, search, reloadFlag]);

  return {
    data,
    loading,
    error,
    hasMore: pagination?.hasMore || false,
    loadMore,
    refetch,
    pagination
  };
}
