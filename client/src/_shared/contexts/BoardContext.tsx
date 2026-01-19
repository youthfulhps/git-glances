import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mostUsedLanguageQueryOptions } from '../../Language/queries/useMostUsedLanguageQuery';

export type BoardType = 'notification' | 'trends' | 'contribution' | 'language' | null;
type ActiveBoardType = Exclude<BoardType, null>;

interface BoardContextType {
  boardType: BoardType;
  openBoard: (type: ActiveBoardType) => void;
  openNotificationBoard: () => void;
  openTrendsBoard: () => void;
  openContributionBoard: (date?: string) => void;
  openLanguageBoard: () => void;
  closeBoard: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedContributionDate: string | null;
  clearContributionDate: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boardType, setBoardType] = useState<BoardType>('trends');
  const [userSelectedLanguage, setUserSelectedLanguage] = useState<string | null>(null);
  const [selectedContributionDate, setSelectedContributionDate] = useState<string | null>(null);

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

  const openContributionBoard = useCallback((date?: string) => {
    setBoardType('contribution');
    setSelectedContributionDate(date || null);
  }, []);

  const openLanguageBoard = useCallback(() => {
    setBoardType('language');
  }, []);

  const clearContributionDate = useCallback(() => {
    setSelectedContributionDate(null);
  }, []);

  const closeBoard = useCallback(() => {
    setBoardType(null);
    setSelectedContributionDate(null);
  }, []);

  const value = useMemo(
    () => ({
      boardType,
      openBoard,
      openNotificationBoard,
      openTrendsBoard,
      openContributionBoard,
      openLanguageBoard,
      closeBoard,
      selectedLanguage,
      setSelectedLanguage,
      selectedContributionDate,
      clearContributionDate,
    }),
    [
      boardType,
      openBoard,
      openNotificationBoard,
      openTrendsBoard,
      openContributionBoard,
      openLanguageBoard,
      closeBoard,
      selectedLanguage,
      setSelectedLanguage,
      selectedContributionDate,
      clearContributionDate,
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
