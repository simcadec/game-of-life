import * as React from "react";

import { useGame } from "~/contexts/Game";
import type { Cell } from "~/utils/board";
import { drawBoard, getCellFromCanvasEvent } from "~/utils/canvas";

export function Canvas({ dimensions }: Props) {
  const { board, boardSize, flipCell, isStopped } = useGame();
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  /**
   * Helper to check if the canvas is ready before calling a callback
   */
  const checkCanvas = React.useCallback(
    // biome-ignore lint/suspicious/noConfusingVoidType: todo return null?
    <T,>(callback: (canvas: HTMLCanvasElement) => T): T | void => {
      if (canvasRef.current == null) {
        // Canvas still not ready
        return;
      }

      return callback(canvasRef.current);
    },
    [],
  );

  /*
   * Draw the board when it changes
   */
  React.useEffect(() => {
    checkCanvas((canvas) => {
      drawBoard(canvas, board);
    });
  }, [checkCanvas, board]);

  /*
   * Handle mouseDown & mouseUp events
   */
  React.useEffect(() => {
    return checkCanvas((canvas) => {
      const handleMouseDown = () => setIsMouseDown(true);
      const handleMouseUp = () => setIsMouseDown(false);

      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mouseup", handleMouseUp);

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mouseup", handleMouseUp);
      };
    });
  }, [checkCanvas]);

  // Keep track of the last cell that was flipped
  const lastFlippedCell = React.useRef<Cell | null>(null);

  /*
   * Flip cells on mouse move
   */
  React.useEffect(() => {
    return checkCanvas((canvas) => {
      if (!isMouseDown || !isStopped) {
        // Mouse is up or game is running => abort
        return;
      }

      const handleMouseMove = (evt: MouseEvent) => {
        const cell = getCellFromCanvasEvent(evt, canvas, boardSize);

        if (!cell) {
          return;
        }

        // lastFlippedCell allows us to debounce the mouse move
        if (
          !lastFlippedCell.current ||
          lastFlippedCell.current.x !== cell.x ||
          lastFlippedCell.current.y !== cell.y
        ) {
          lastFlippedCell.current = cell;

          // Flip the cell
          flipCell(cell);
        }
      };

      canvas.addEventListener("mousemove", handleMouseMove);

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
    });
  }, [checkCanvas, flipCell, isMouseDown, boardSize, isStopped]);

  /*
   * Flip cell on mouse click
   *
   * click event is always fired after mouse up
   */
  React.useEffect(() => {
    return checkCanvas((canvas) => {
      if (!isStopped) {
        // Game is running => abort
        return;
      }

      const handleClick = (evt: MouseEvent) => {
        checkCanvas((canvas) => {
          if (!isStopped) {
            return;
          }

          const cell = getCellFromCanvasEvent(evt, canvas, boardSize);

          if (!cell) {
            return;
          }

          // No `lastFlippedCell` means there was no mousemove
          if (!lastFlippedCell.current) {
            // no move => was a simple click => flip the cell
            flipCell(cell);
          }

          // Clean
          lastFlippedCell.current = null;
        });
      };

      canvas.addEventListener("click", handleClick);

      return () => {
        canvas.removeEventListener("click", handleClick);
      };
    });
  }, [checkCanvas, flipCell, boardSize, isStopped]);

  return (
    <canvas
      ref={canvasRef}
      width={`${dimensions.width}px`}
      height={`${dimensions.height}px`}
    />
  );
}

type Props = {
  dimensions: { width: number; height: number };
};
