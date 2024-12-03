import { describe, expect, it } from "vitest";
import { getClonedBoard, getNewBoard, getNextBoard } from "./board";

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
