import { describe, expect, it } from "vitest";
import { countLivingNeighbors, willCellBeAlive } from "./game";

describe("countLivingNeighbors", () => {
  it("should count living neighbors correctly for a cell in the middle", () => {
    const board = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];
    expect(countLivingNeighbors(board, { x: 1, y: 1 })).toBe(4);
  });

  it("should count living neighbors correctly for a cell on the edge", () => {
    const board = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];
    expect(countLivingNeighbors(board, { x: 0, y: 0 })).toBe(3);
  });

  it("should count living neighbors correctly for a cell in the corner", () => {
    const board = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];
    expect(countLivingNeighbors(board, { x: 0, y: 2 })).toBe(3);
  });

  it("should return 0 for a cell with no living neighbors", () => {
    const board = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    expect(countLivingNeighbors(board, { x: 1, y: 1 })).toBe(0);
  });

  it("should return 8 for a cell surrounded by living neighbors", () => {
    const board = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    expect(countLivingNeighbors(board, { x: 1, y: 1 })).toBe(8);
  });

  it("should handle boards with different dimensions", () => {
    const board = [
      [true, false, true, false],
      [false, true, false, true],
      [true, false, true, false],
    ];
    expect(countLivingNeighbors(board, { x: 2, y: 3 })).toBe(2);
  });
});

describe("willCellBeAlive", () => {
  it('should implements the "Game of Life" rules for a dead cell', () => {
    expect(willCellBeAlive(false, 0)).toBe(false);
    expect(willCellBeAlive(false, 1)).toBe(false);
    expect(willCellBeAlive(false, 2)).toBe(false);
    expect(willCellBeAlive(false, 3)).toBe(true);
    expect(willCellBeAlive(false, 4)).toBe(false);
    expect(willCellBeAlive(false, 5)).toBe(false);
    expect(willCellBeAlive(false, 6)).toBe(false);
    expect(willCellBeAlive(false, 7)).toBe(false);
    expect(willCellBeAlive(false, 8)).toBe(false);
  });

  it('should implements the "Game of Life" rules for a living cell', () => {
    expect(willCellBeAlive(true, 0)).toBe(false);
    expect(willCellBeAlive(true, 1)).toBe(false);
    expect(willCellBeAlive(true, 2)).toBe(true);
    expect(willCellBeAlive(true, 3)).toBe(true);
    expect(willCellBeAlive(true, 4)).toBe(false);
    expect(willCellBeAlive(true, 5)).toBe(false);
    expect(willCellBeAlive(true, 6)).toBe(false);
    expect(willCellBeAlive(true, 7)).toBe(false);
    expect(willCellBeAlive(true, 8)).toBe(false);
  });
});
