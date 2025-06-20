import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from './api';

const GET_URL = '/analytical_dashboard/getCardOrder.endpoint.php';
const SET_URL = '/analytical_dashboard/setCardOrder.endpoint.php';

export function useCardOrder(defaultOrder: string[]) {
  const [cardOrder, setCardOrderState] = useState<string[]>(defaultOrder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch card order from server on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const site = urlParams.get('site') || 'playground';
        const response = await api.get(`${GET_URL}?site=${site}`);
        // Support nested response structure
        let cardOrder: string[] | null = null;
        if (response.data?.cardOrder) {
          cardOrder = response.data.cardOrder;
        } else if (response.data?.result?.data?.cardOrder) {
          cardOrder = response.data.result.data.cardOrder;
        }
        if (response.data?.success && Array.isArray(cardOrder)) {
          if (isMounted) setCardOrderState(cardOrder);
        } else {
          if (isMounted) setCardOrderState(defaultOrder);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch card order');
        setCardOrderState(defaultOrder);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
    return () => { isMounted = false; };
  }, [defaultOrder]);

  // Debounced save to server
  const saveOrder = useCallback((order: string[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const site = urlParams.get('site') || 'playground';
        await api.post(`${SET_URL}?site=${site}`, { cardOrder: order });
      } catch (e) {
        // Optionally handle error
      }
    }, 600);
  }, []);

  // Setter that updates state and triggers save
  const setCardOrder = useCallback((order: string[]) => {
    setCardOrderState(order);
    saveOrder(order);
  }, [saveOrder]);

  return { cardOrder, setCardOrder, loading, error };
}
