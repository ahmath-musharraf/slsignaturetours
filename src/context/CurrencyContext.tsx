import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode } from '../types';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('preferred_currency');
    return (saved as CurrencyCode) || 'USD';
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('preferred_currency', code);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
