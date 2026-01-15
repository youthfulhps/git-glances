import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mostUsedLanguageQueryOptions } from '../../Language/queries/useMostUsedLanguageQuery';

export type BoardType = 'notification' | 'trends' | null;
type ActiveBoardType = Exclude<BoardType, null>;

interface BoardContextType {
  boardType: BoardType;
  openBoard: (type: ActiveBoardType) => void;
  openNotificationBoard: () => void;
  openTrendsBoard: () => void;
  closeBoard: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boardType, setBoardType] = useState<BoardType>('trends');
  const [userSelectedLanguage, setUserSelectedLanguage] = useState<string | null>(null);

  const { data: mostUsedLanguages } = useQuery(mostUsedLanguageQueryOptions);

  const defaultLanguage = useMemo(
    () => mostUsedLanguages?.[0]?.name ?? 'JavaScript',
    [mostUsedLanguages],
  );

  const selectedLanguage = userSelectedLanguage ?? defaultLanguage;

  const setSelectedLanguage = useCallback((language: string) => {
    setUserSelectedLanguage(language);
  }, []);

  const openBoard = useCallback((type: ActiveBoardType) => {
    setBoardType(type);
  }, []);

  const openNotificationBoard = useCallback(() => {
    setBoardType('notification');
  }, []);

  const openTrendsBoard = useCallback(() => {
    setBoardType('trends');
  }, []);

  const closeBoard = useCallback(() => {
    setBoardType(null);
  }, []);

  const value = useMemo(
    () => ({
      boardType,
      openBoard,
      openNotificationBoard,
      openTrendsBoard,
      closeBoard,
      selectedLanguage,
      setSelectedLanguage,
    }),
    [
      boardType,
      openBoard,
      openNotificationBoard,
      openTrendsBoard,
      closeBoard,
      selectedLanguage,
      setSelectedLanguage,
    ],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
