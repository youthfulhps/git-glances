import { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mostUsedLanguageQueryOptions } from '../../Language/queries/useMostUsedLanguageQuery';

export type BoardType = 'notification' | 'trends' | null;

interface BoardContextType {
  boardType: BoardType;
  openBoard: (type: BoardType) => void;
  closeBoard: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boardType, setBoardType] = useState<BoardType>('trends');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');

  const { data: mostUsedLanguages } = useQuery(mostUsedLanguageQueryOptions);

  useEffect(() => {
    if (mostUsedLanguages && mostUsedLanguages.length > 0) {
      setSelectedLanguage(mostUsedLanguages[0].name);
    }
  }, [mostUsedLanguages]);

  const openBoard = useCallback((type: BoardType) => {
    setBoardType(type);
  }, []);

  const closeBoard = useCallback(() => {
    setBoardType(null);
  }, []);

  const value = useMemo(
    () => ({ boardType, openBoard, closeBoard, selectedLanguage, setSelectedLanguage }),
    [boardType, openBoard, closeBoard, selectedLanguage]
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
