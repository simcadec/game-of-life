import type { Board, Cell } from "~/utils/board";

/**
 * Count the living neighbors cell of a cell on a board
 */
export const countLivingNeighbors = (board: Board, cell: Cell): number => {
  let count = 0;

  const { x, y } = cell;

  // Not the most elegant, but the most performant ;)
  count += board[x - 1]?.[y] ? 1 : 0; // top
  count += board[x - 1]?.[y + 1] ? 1 : 0; // top right
  count += board[x][y + 1] ? 1 : 0; // right
  count += board[x + 1]?.[y + 1] ? 1 : 0; // bottom right
  count += board[x + 1]?.[y] ? 1 : 0; // bottom
  count += board[x + 1]?.[y - 1] ? 1 : 0; // bottom left
  count += board[x][y - 1] ? 1 : 0; // left
  count += board[x - 1]?.[y - 1] ? 1 : 0; // top left

  return count;
};

/**
 * Check if a cell will be alive or not
 */
export const willCellBeAlive = (
  isAlive: boolean,
  livingNeighborsCount: number,
) => {
  if (isAlive) {
    return livingNeighborsCount === 2 || livingNeighborsCount === 3;
  }

  return livingNeighborsCount === 3;
};
