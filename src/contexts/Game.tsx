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

  /**
   * Go to the next generation
   */
  const applyNextGeneration = React.useCallback(() => {
    setBoard(getNextBoard(board));
    generationIncrement();
  }, [board, generationIncrement]);

  const { speed, setSpeed, toggle, isStopped, stop } =
    useTimeControl(applyNextGeneration);

  /**
   * Reset the current board, with a new size and pattern
   */
  const resetBoard = React.useCallback(
    (values: BoardReset) => {
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

        setBoard(fn(values.size));
        generationReset();
      }
      // Process reset from file
      else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const jsonData = JSON.parse(e.target?.result as string);

          setBoard(jsonData);
          generationReset();
        };
        reader.readAsText(values.file);
      }
    },
    [stop, generationReset],
  );

  /**
   * Flip a cell of the current board
   */
  const flipCell = React.useCallback(
    (cell: Cell) => {
      setBoard(flipBoardCell(board, cell));
    },
    [board],
  );

  return (
    <GameContext.Provider
      value={{
        board,
        boardSize: board.length,
        flipCell,
        generationCount,
        applyNextGeneration,
        isStopped,
        resetBoard,
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

type BoardReset =
  | { base: Exclude<BaseBoard, "file">; size: number }
  | { base: Extract<BaseBoard, "file">; file: File };

type ContextType = {
  speed: number;
  setSpeed: (speed: number) => void;
  toggle: () => void;
  isStopped: boolean;
  board: Board;
  flipCell: (cell: Cell) => void;
  generationCount: number;
  applyNextGeneration: () => void;
  boardSize: number;
  resetBoard: (values: BoardReset) => void;
};

type ProviderProps = React.PropsWithChildren;
