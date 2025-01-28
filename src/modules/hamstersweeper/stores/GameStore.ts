"use client";

import { createContext } from "react";
import { action, makeObservable, observable } from "mobx";
import { sampleSize } from "lodash";

import { createMatrix } from "@/common/utils/MathUtils";

export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  hasMine: boolean;
  neighborMineCount: number;
  isOpen: boolean;
  isFlagged: boolean;
}

function positionToKey(position: Position) {
  return `${position.x}-${position.y}`;
}

export default class GameStore {
  readonly boardWidth: number;
  readonly boardHeight: number;
  readonly mineCount: number;

  @observable
  board: Array<Array<Cell>> = [];

  @observable
  status: "Running" | "Win" | "Lose" = "Running";

  @observable
  unusedFlagCount = 0;

  // For generating mines AFTER first opening.
  private isFirstOpen: boolean = false;

  // For pre-calculate neighbors' positions for each cell.
  private neighbors: Array<Array<Array<Position>>> = [];

  constructor(args: { boardWidth: number; boardHeight: number; mineCount: number }) {
    this.boardWidth = args.boardWidth;
    this.boardHeight = args.boardHeight;
    this.mineCount = args.mineCount;

    this.reset();

    makeObservable(this);
  }

  @action
  reset() {
    this.board = createMatrix({
      width: this.boardWidth,
      height: this.boardHeight,
      initialValue: () => ({
        hasMine: false,
        neighborMineCount: 0,
        isOpen: false,
        isFlagged: false,
      }),
    });

    this.status = "Running";
    this.unusedFlagCount = this.mineCount;
    this.isFirstOpen = true;

    this.neighbors = createMatrix({
      width: this.boardWidth,
      height: this.boardHeight,
      initialValue: position => this.getNeighbors(position),
    });
  }

  @action
  openCell(position: Position) {
    if (this.status !== "Running") {
      return;
    }

    const cell = this.board[position.y][position.x];
    cell.isOpen = true;

    // Generate mines after first opening.
    if (this.isFirstOpen) {
      this.isFirstOpen = false;
      this.generateMines({ exclude: [position, ...this.neighbors[position.y][position.x]] });
      console.log("Generated the mines!");
    }

    // Check lose.
    if (cell.hasMine) {
      this.status = "Lose";
      console.log("Lose!");
      return;
    }

    // Open the connected cells if empty.
    if (cell.neighborMineCount <= 0) {
      const connectedCells = this.walkUntilNotZero(position);

      for (const eachPosition of connectedCells) {
        this.board[eachPosition.y][eachPosition.x].isOpen = true;
      }
    }

    // Check win.
    if (this.checkWin()) {
      this.status = "Win";
      console.log("Win!");
    }
  }

  @action
  flagCell(position: Position) {
    if (this.status !== "Running") {
      return;
    }

    const prevValue = this.board[position.y][position.x].isFlagged;

    if (prevValue) {
      this.board[position.y][position.x].isFlagged = false;
      this.unusedFlagCount++;
    } else {
      if (this.unusedFlagCount > 0) {
        this.board[position.y][position.x].isFlagged = true;
        this.unusedFlagCount--;
      }
    }
  }

  private walkUntilNotZero(position: Position) {
    const isChecked: Array<Array<boolean>> = [];

    for (let y = 0; y < this.boardHeight; y++) {
      const row: Array<boolean> = [];

      for (let x = 0; x < this.boardWidth; x++) {
        row.push(false);
      }

      isChecked.push(row);
    }

    isChecked[position.y][position.x] = true;

    // Stack-based DFS.
    const stack: Array<Position> = [position];
    const result: Array<Position> = [];

    while (stack.length > 0) {
      const currentPosition = stack.pop()!;
      result.push(currentPosition);

      // If count > 0, stop walking.
      if (this.board[currentPosition.y][currentPosition.x].neighborMineCount > 0) {
        continue;
      }

      for (const neighbor of this.neighbors[currentPosition.y][currentPosition.x]) {
        if (isChecked[neighbor.y][neighbor.x]) {
          continue;
        }

        isChecked[neighbor.y][neighbor.x] = true;

        if (this.board[neighbor.y][neighbor.x].hasMine) {
          continue;
        }

        stack.push(neighbor);
      }
    }

    return result;
  }

  @action
  private generateMines(args: { exclude: Array<Position> }) {
    const excludeSet = new Set(args.exclude.map(positionToKey));
    const positions: Array<Position> = [];

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        if (excludeSet.has(positionToKey({ x, y }))) {
          continue;
        }

        positions.push({ x, y });
      }
    }

    const minePositions = sampleSize(positions, this.mineCount);

    for (const position of minePositions) {
      this.board[position.y][position.x].hasMine = true;

      for (const neighbor of this.neighbors[position.y][position.x]) {
        this.board[neighbor.y][neighbor.x].neighborMineCount++;
      }
    }
  }

  private getNeighbors(position: Position) {
    const diffs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    return diffs
      .map(([dx, dy]) => ({ x: position.x + dx, y: position.y + dy }))
      .filter(({ x, y }) => x >= 0 && y >= 0 && x < this.boardWidth && y < this.boardHeight);
  }

  private checkWin() {
    let openCount = 0;

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        if (this.board[y][x].isOpen) {
          openCount++;
        }
      }
    }

    return openCount === this.boardWidth * this.boardHeight - this.mineCount;
  }
}

export const GameContext = createContext({} as GameStore);
