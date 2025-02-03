import type { Board } from "./board";

const COLOR_ALIVE = "orange";
const COLOR_DEAD = "#ffffff";
const COLOR_BORDER = "#dddddd";

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
  const drawingZoneSize = Math.min(domRect.width, domRect.height);
  const cellOuterSize = drawingZoneSize / boardSize;
  const cellSize = cellOuterSize - cellBorder;

  // Clear the canvas
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, drawingZoneSize - 1, drawingZoneSize - 1);

  // Draw the grid
  if (boardSize <= 250) {
    drawBoardGrid(ctx, cellOuterSize, boardSize);
  }

  // Draw the cells
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      // Do not draw dead cells!
      if (board[x][y]) {
        ctx.fillStyle = board[x][y] ? COLOR_ALIVE : COLOR_DEAD;
        ctx.fillRect(x * cellOuterSize, y * cellOuterSize, cellSize, cellSize);
      }
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

function drawBoardGrid(
  ctx: CanvasRenderingContext2D,
  spacing: number,
  boardSize: number,
) {
  ctx.beginPath();

  for (let x = 1; x < boardSize; x++) {
    ctx.moveTo(x * spacing, 0);
    ctx.lineTo(x * spacing, boardSize * spacing - 1);
  }
  for (let y = 1; y < boardSize; y++) {
    ctx.moveTo(0, y * spacing);
    ctx.lineTo(boardSize * spacing - 1, y * spacing);
  }

  ctx.strokeStyle = COLOR_BORDER;
  ctx.stroke();
}
