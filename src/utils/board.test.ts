import { describe, expect, it } from "vitest";
import {
  getBoardIteration,
  getClonedBoard,
  getNewBoard,
  getNextBoard,
} from "./board";

describe("getNewBoard", () => {
  it("should initialize an empty board by default", () => {
    expect(getNewBoard(3)).eql([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  it("should accept a mapping function to define the values", () => {
    expect(getNewBoard(3, (x, y) => x === y)).eql([
      [true, false, false],
      [false, true, false],
      [false, false, true],
    ]);
  });
});

describe("getClonedBoard", () => {
  const board = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ];

  it("should return a new board with the same values", () => {
    expect(getClonedBoard(board)).eql(board);
  });
});

describe("getNextBoard", () => {
  const board = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ];

  it("should return a new board with the next values", () => {
    expect(getNextBoard(board)).eql([
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ]);
  });
});

describe("getBoardIteration", () => {
  const board = [
    [false, true, false],
    [true, true, true],
    [false, true, false],
  ];

  it("should return a board with the values of the given board at the specified iteration", () => {
    expect(getBoardIteration(board, 1)).eql([
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ]);
    expect(getBoardIteration(board, 2)).eql([
      [true, false, true],
      [false, false, false],
      [true, false, true],
    ]);
    expect(getBoardIteration(board, 3)).eql([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });
});
