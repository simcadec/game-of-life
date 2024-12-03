import { countLivingNeighbors, willCellBeAlive } from "~/utils/game";

export type Board = boolean[][];

export type Cell = {
  x: number;
  y: number;
};

/**
 * Get a new board, empty by default
 */
export function getNewBoard(
  boardSize: number,
  mappingFn: (x: number, y: number) => boolean = () => false,
): Board {
  return Array.from({ length: boardSize }, (_, x) =>
    Array.from({ length: boardSize }, (_, y) => mappingFn(x, y)),
  );
}

/**
 * Get a new board, with values copied from another board
 */
export function getClonedBoard(board: Board): Board {
  return getNewBoard(board.length, (x, y) => board[x][y]);
}

/**
 * Get the next board, based on the current one
 */
export function getNextBoard(board: Board): Board {
  const startTime = performance.now(); // logging

  // Start with an empty board. Only truthy values will be set later
  // This is faster than using `getClonedBoard` and setting every values
  const newBoard = getNewBoard(board.length);

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (willCellBeAlive(board[x][y], countLivingNeighbors(board, { x, y }))) {
        newBoard[x][y] = true;
      }
    }
  }

  console.info(`computation time: ${performance.now() - startTime} ms`);

  return newBoard;
}

/**
 * Flip a cell in a board
 */
export function flipBoardCell(board: Board, cell: Cell): Board {
  const newBoard2 = getClonedBoard(board);

  if (newBoard2[cell.x]?.[cell.y] != null) {
    newBoard2[cell.x][cell.y] = !newBoard2[cell.x][cell.y];
  }

  return newBoard2;
}

/*********************************************
 * Functions to generate educative boards!
 *********************************************/

/**
 * Get a new board with values randomly set
 */
export function getRandomBoard(boardSize: number): Board {
  return getNewBoard(boardSize, () => Math.random() > 0.5);
}

/**
 * Get a new board with a stripped pattern
 */
export function getStrippedBoard(boardSize: number): Board {
  return getNewBoard(boardSize, (x) => x % 2 === 0);
}

/**
 * Get a new board with a checkered pattern
 */
export function getCheckeredBoard(boardSize: number): Board {
  return getNewBoard(boardSize, (x, y) => (x + y) % 2 === 0);
}

/**
 * Get a new board with a Blinker GoF pattern
 */
export function getBlinkerBoard(boardSize: number): Board {
  const pattern = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];

  return getNewBoard(boardSize, mappingFnPattern(pattern, boardSize));
}

/**
 * Get a new board with a Glider GoF pattern
 */
export function getGliderBoard(boardSize: number): Board {
  const pattern = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ];

  return getNewBoard(boardSize, mappingFnPattern(pattern, boardSize));
}

/**
 * Get a new board with a Toad GoF pattern
 */
export function getToadBoard(boardSize: number): Board {
  const pattern = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  return getNewBoard(boardSize, mappingFnPattern(pattern, boardSize));
}

/**
 * Get a new board with a Beacon GoF pattern
 */
export function getBeaconBoard(boardSize: number): Board {
  const pattern = [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ];

  return getNewBoard(boardSize, mappingFnPattern(pattern, boardSize));
}

/**
 * Get a new board with a Pulsar GoF pattern
 */
export function getPulsarBoard(boardSize: number): Board {
  const pattern = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ];

  return getNewBoard(boardSize, mappingFnPattern(pattern, boardSize));
}

/**
 * Get a new board with a Glider Gun GoF pattern
 */
export function getGliderGunBoard(boardSize: number): Board {
  const pattern = [
    [0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0],
  ];

  return getNewBoard(boardSize, mappingFnPattern(pattern, boardSize));
}

/**
 * Helper to get a mapping board function from a pattern and a board size
 */
const mappingFnPattern =
  (pattern: Array<Array<number>>, boardSize: number) =>
  (x: number, y: number) => {
    // Will center at top the pattern in the board
    const patternSize = pattern.length;
    const startX = Math.floor(boardSize / 2) - Math.floor(patternSize / 2);
    const startY = Math.floor(boardSize / 2) - Math.floor(patternSize / 2);

    if (
      x >= startX &&
      x < startX + patternSize &&
      y >= startY &&
      y < startY + patternSize
    ) {
      return pattern[x - startX][y - startY] === 1;
    }
    return false;
  };
