import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { encryptToken, decryptToken, isCryptoSupported } from '@shared/utils/crypto';

interface TokenContextType {
  token: string;
  setToken: (token: string) => void;
  tokenError: boolean;
  clearTokenError: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

const STORAGE_KEY = 'gitGlances:token';

async function getStorageItem(key: string): Promise<string | null> {
  if (process.env.IS_WEB) {
    const encryptedToken = localStorage.getItem(key);
    if (!encryptedToken) return null;

    // Web Crypto API를 지원하면 복호화
    if (isCryptoSupported()) {
      return await decryptToken(encryptedToken);
    }

    // 지원하지 않으면 평문 그대로 반환
    return encryptedToken;
  }
  // For extension, we'll use a simple sync approach
  return null;
}

async function setStorageItem(key: string, value: string): Promise<void> {
  if (process.env.IS_WEB) {
    if (value) {
      // Web Crypto API를 지원하면 암호화
      const tokenToStore = isCryptoSupported() ? await encryptToken(value) : value;
      localStorage.setItem(key, tokenToStore);
    } else {
      localStorage.removeItem(key);
    }
  } else {
    // For Chrome extension - chrome.storage는 이미 안전하므로 암호화 불필요
    if (typeof chrome !== 'undefined' && chrome.storage) {
      if (value) {
        chrome.storage.local.set({ [key]: value });
      } else {
        chrome.storage.local.remove(key);
      }
    }
  }
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string>('');
  const [tokenError, setTokenError] = useState<boolean>(false);

  useEffect(() => {
    // Initialize from storage
    const loadToken = async () => {
      const savedToken = await getStorageItem(STORAGE_KEY);
      if (savedToken) {
        setTokenState(savedToken);
      }
    };

    if (process.env.IS_WEB) {
      loadToken();
    } else {
      // For Chrome extension, load async
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
          if (result[STORAGE_KEY]) {
            setTokenState(result[STORAGE_KEY]);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    // Listen for token-invalid event from axios interceptor
    const handleTokenInvalid = () => {
      setTokenState('');
      setTokenError(true);
    };

    window.addEventListener('token-invalid', handleTokenInvalid);

    return () => {
      window.removeEventListener('token-invalid', handleTokenInvalid);
    };
  }, []);

  const setToken = async (newToken: string) => {
    setTokenState(newToken);
    setTokenError(false); // 새 토큰 입력 시 에러 클리어
    await setStorageItem(STORAGE_KEY, newToken);
  };

  const clearTokenError = () => {
    setTokenError(false);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, tokenError, clearTokenError }}>
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
