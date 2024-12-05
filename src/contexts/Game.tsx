import * as React from "react";

import type { BaseBoard } from "~/components/BaseBoardSelect";
import { useGenerationCounter } from "~/hooks/useGenerationCounter";
import { useTimeControl } from "~/hooks/useTimeControl";

import {
  type Board,
  type Cell,
  flipBoardCell,
  getBeaconBoard,
  getBlinkerBoard,
  getBoardIteration,
  getCheckeredBoard,
  getGliderBoard,
  getGliderGunBoard,
  getNewBoard,
  getNextBoard,
  getPulsarBoard,
  getRandomBoard,
  getStrippedBoard,
  getToadBoard,
} from "~/utils/board";

const DEFAULT_GRID = 50;
const DEFAULT_BOARD = getNewBoard(DEFAULT_GRID);

const GameContext = React.createContext<ContextType | undefined>(undefined);

export function GameProvider({ children }: ProviderProps) {
  const { generationIncrement, generationReset, generationCount } =
    useGenerationCounter();

  const [board, setBoard] = React.useState(DEFAULT_BOARD);
  const initialBoardRef = React.useRef<Board>(board); // Store the initial board used

  /**
   * Go to the next generation
   */
  const goNext = React.useCallback(() => {
    setBoard(getNextBoard(board));
    generationIncrement();
  }, [board, generationIncrement]);

  /**
   * Go to a specific generation
   */
  const goTo = React.useCallback(
    (number: number) => {
      setBoard(getBoardIteration(initialBoardRef.current, number));
      generationReset(number);
    },
    [generationReset],
  );

  const { speed, setSpeed, toggle, isStopped, stop } = useTimeControl(goNext);

  const resetHelper = React.useCallback(
    (board: Board) => {
      setBoard(board);
      initialBoardRef.current = board;
      generationReset();
    },
    [generationReset],
  );

  /**
   * Reset the game, with a new board, size and pattern
   */
  const reset = React.useCallback(
    (values: ResetValues) => {
      stop();

      // All base except file
      if (values.base !== "file") {
        if (!values.size || values.size < 3 || values.size > 1000) {
          return;
        }

        let fn: (boardSize: number) => Board;

        switch (values.base) {
          case "random":
            fn = getRandomBoard;
            break;
          case "blinker":
            fn = getBlinkerBoard;
            break;
          case "glider":
            fn = getGliderBoard;
            break;
          case "gliderGun":
            fn = getGliderGunBoard;
            break;
          case "toad":
            fn = getToadBoard;
            break;
          case "beacon":
            fn = getBeaconBoard;
            break;
          case "pulsar":
            fn = getPulsarBoard;
            break;
          case "stripped":
            fn = getStrippedBoard;
            break;
          case "checkered":
            fn = getCheckeredBoard;
            break;
          default:
            fn = getNewBoard;
        }

        resetHelper(fn(values.size));
      }
      // Process reset from file
      else {
        const reader = new FileReader();
        reader.onload = (e) => {
          resetHelper(JSON.parse(e.target?.result as string));
        };
        reader.readAsText(values.file);
      }
    },
    [stop, resetHelper],
  );

  /**
   * Flip a cell of the current board
   * It will reset the game
   */
  const flipCell = React.useCallback(
    (cell: Cell) => {
      const newBoard = flipBoardCell(board, cell);
      resetHelper(newBoard);
    },
    [board, resetHelper],
  );

  return (
    <GameContext.Provider
      value={{
        board,
        boardSize: board.length,
        flipCell,
        generationCount,
        goNext,
        goTo,
        isStopped,
        reset,
        setSpeed,
        speed,
        toggle,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

type ResetValues =
  | { base: Exclude<BaseBoard, "file">; size: number }
  | { base: Extract<BaseBoard, "file">; file: File };

type ContextType = {
  board: Board;
  boardSize: number;
  flipCell: (cell: Cell) => void;
  generationCount: number | null;
  goNext: () => void;
  goTo: (number: number) => void;
  isStopped: boolean;
  reset: (values: ResetValues) => void;
  setSpeed: (speed: number) => void;
  speed: number;
  toggle: () => void;
};

type ProviderProps = React.PropsWithChildren;
