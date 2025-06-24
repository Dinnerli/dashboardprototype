import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';

interface CardOrderContextType {
  cardOrder: string[];
  setCardOrder: (order: string[]) => void;
  loading: boolean;
  error: string | null;
}

const CardOrderContext = createContext<CardOrderContextType | undefined>(undefined);

const GET_URL = '/analytical_dashboard/getCardOrder.endpoint.php';
const SET_URL = '/analytical_dashboard/setCardOrder.endpoint.php';

export const CardOrderProvider = ({ defaultOrder, children }: { defaultOrder: string[]; children: ReactNode }) => {
  const [cardOrder, setCardOrderState] = useState<string[]>(defaultOrder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const site = urlParams.get('site') || 'playground';
        const response = await api.get(`${GET_URL}?site=${site}`);
        let fetchedOrder: string[] | null = null;
        if (response.data?.cardOrder) {
          fetchedOrder = response.data.cardOrder;
        } else if (response.data?.result?.data?.cardOrder) {
          fetchedOrder = response.data.result.data.cardOrder;
        }
        if (response.data?.success && Array.isArray(fetchedOrder)) {
          if (isMounted) setCardOrderState(fetchedOrder);
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

  // Save order to server
  const setCardOrder = (order: string[]) => {
    setCardOrderState(order);
    const urlParams = new URLSearchParams(window.location.search);
    const site = urlParams.get('site') || 'playground';
    api.post(`${SET_URL}?site=${site}`, { cardOrder: order });
  };

  return (
    <CardOrderContext.Provider value={{ cardOrder, setCardOrder, loading, error }}>
      {children}
    </CardOrderContext.Provider>
  );
};

export const useCardOrderContext = () => {
  const ctx = useContext(CardOrderContext);
  if (!ctx) throw new Error('useCardOrderContext must be used within CardOrderProvider');
  return ctx;
};
