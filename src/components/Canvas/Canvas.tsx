import * as React from "react";

import { useGame } from "~/contexts/Game";
import type { Cell } from "~/utils/board";
import { drawBoard, getCellFromCanvasEvent } from "~/utils/canvas";

export function Canvas({ dimensions }: Props) {
  const { board, flipCell, boardSize } = useGame();
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
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Keep track of the last cell that was flipped
  const lastFlippedCell = React.useRef<Cell | null>(null);

  /*
   * Flip cells on mouse move
   */
  React.useEffect(() => {
    return checkCanvas((canvas) => {
      if (!isMouseDown) {
        // Mouse is up
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

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    });
  }, [checkCanvas, flipCell, isMouseDown, boardSize]);

  /*
   * Flip cell on mouse click
   *
   * click event is always fired after mouse up
   */
  const handleClick = (evt: React.MouseEvent) => {
    checkCanvas((canvas) => {
      const cell = getCellFromCanvasEvent(evt, canvas, boardSize);

      if (!cell) {
        return;
      }

      // No `lastFlippedCell` means there was no mousemove
      if (!lastFlippedCell.current) {
        // no move => was a simple click => flip the cell
        flipCell(cell);
      }

      lastFlippedCell.current = null;
    });
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: it is enough for now, keyboard movement is not a priority
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      width={`${dimensions.width}px`}
      height={`${dimensions.height}px`}
    />
  );
}

type Props = {
  dimensions: { width: number; height: number };
};
