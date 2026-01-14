import { createContext, useContext, useState, ReactNode } from 'react';

export type BoardType = 'notification' | 'trends' | null;

interface BoardContextType {
  boardType: BoardType;
  openBoard: (type: BoardType) => void;
  closeBoard: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boardType, setBoardType] = useState<BoardType>(null);

  const openBoard = (type: BoardType) => {
    setBoardType(type);
  };

  const closeBoard = () => {
    setBoardType(null);
  };

  return (
    <BoardContext.Provider value={{ boardType, openBoard, closeBoard }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
