import type { Board } from "./board";

/**
 * Draw a board on a canvas
 */
export function drawBoard(canvas: HTMLCanvasElement, board: Board) {
  const startTime = performance.now(); // logging
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const boardSize = board.length;
  const cellBorder = boardSize > 100 ? 0 : 1;

  const domRect = canvas.getBoundingClientRect();
  const cellOuterSize = Math.min(domRect.width, domRect.height) / boardSize;
  const cellSize = cellOuterSize - cellBorder;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // fill all the canvas with the cell border color
  ctx.fillStyle = "#dddddd";
  ctx.fillRect(
    0,
    0,
    cellOuterSize * boardSize - 1,
    cellOuterSize * boardSize - 1,
  );

  // for each cell
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      // draw the cell, with some space as borders
      ctx.fillStyle = board[x][y] ? "orange" : "#ffffff";
      ctx.fillRect(x * cellOuterSize, y * cellOuterSize, cellSize, cellSize);
    }
  }

  console.info(`draw time: ${performance.now() - startTime} ms`);
}

/**
 * Get the cell from a mouse event on the canvas
 */
export function getCellFromCanvasEvent(
  evt: React.MouseEvent | MouseEvent,
  canvas: HTMLCanvasElement,
  boardSize: number,
) {
  const domRect = canvas.getBoundingClientRect();

  // Extract the mouse position on the canvas
  const cellX = evt.clientX - domRect.left;
  const cellY = evt.clientY - domRect.top;

  const cellSize = Math.min(domRect.width, domRect.height) / boardSize;

  // Get the candidate cell
  const x = Math.floor(cellX / cellSize);
  const y = Math.floor(cellY / cellSize);

  // Check if the cell is in the board
  if (x > boardSize - 1 || y > boardSize - 1) {
    return null;
  }

  return { x, y };
}
