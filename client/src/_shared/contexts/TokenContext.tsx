import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TokenContextType {
  token: string;
  setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

const STORAGE_KEY = 'gitGlances:token';

function getStorageItem(key: string): string | null {
  if (process.env.IS_WEB) {
    return localStorage.getItem(key);
  }
  // For extension, we'll use a simple sync approach
  return null;
}

function setStorageItem(key: string, value: string): void {
  if (process.env.IS_WEB) {
    localStorage.setItem(key, value);
  } else {
    // For Chrome extension
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ [key]: value });
    }
  }
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string>('');

  useEffect(() => {
    // Initialize from storage
    const savedToken = getStorageItem(STORAGE_KEY);
    if (savedToken) {
      setTokenState(savedToken);
    }

    // For Chrome extension, load async
    if (!process.env.IS_WEB && typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        if (result[STORAGE_KEY]) {
          setTokenState(result[STORAGE_KEY]);
        }
      });
    }
  }, []);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    setStorageItem(STORAGE_KEY, newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
}
