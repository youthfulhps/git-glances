import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '@shared/utils/storage';

interface TokenContextType {
  token: string;
  setToken: (token: string) => Promise<void>;
  tokenError: boolean;
  clearTokenError: () => void;
  groqApiKey: string;
  setGroqApiKey: (key: string) => Promise<void>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string>('');
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [groqApiKey, setGroqApiKeyState] = useState<string>('');

  useEffect(() => {
    getStoredItem(STORAGE_KEYS.GITHUB_TOKEN).then(setTokenState);
    getStoredItem(STORAGE_KEYS.GROQ_API_KEY).then(setGroqApiKeyState);
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

  // 요청 인터셉터가 저장소에서 토큰을 읽으므로, state보다 저장을 먼저 끝낸다
  const setToken = async (newToken: string) => {
    await setStoredItem(STORAGE_KEYS.GITHUB_TOKEN, newToken);
    setTokenState(newToken);
    setTokenError(false); // 새 토큰 입력 시 에러 클리어
  };

  const setGroqApiKey = async (key: string) => {
    await setStoredItem(STORAGE_KEYS.GROQ_API_KEY, key);
    setGroqApiKeyState(key);
  };

  const clearTokenError = () => {
    setTokenError(false);
  };

  return (
    <TokenContext.Provider
      value={{ token, setToken, tokenError, clearTokenError, groqApiKey, setGroqApiKey }}
    >
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
