"use client";

import { createContext } from "react";
import { action, makeObservable, observable } from "mobx";

import { createMatrix } from "@/common/utils/MathUtils";

interface Position {
  x: number;
  y: number;
}

export interface Cell {
  hasMine: boolean;
  neighborMineCount: number;
  isOpen: boolean;
  isFlagged: boolean;
}

export default class Game {
  readonly boardWidth: number;
  readonly boardHeight: number;
  readonly mineCount: number;

  @observable
  readonly board: Array<Array<Cell>>;
  @observable
  isGameOver: boolean;

  private isFirstOpen: boolean;
  private readonly neighbors: Array<Array<Array<Position>>>;

  constructor(args: { boardWidth: number; boardHeight: number; mineCount: number }) {
    this.boardWidth = args.boardWidth;
    this.boardHeight = args.boardHeight;
    this.mineCount = args.mineCount;

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

    this.isFirstOpen = true;
    this.isGameOver = false;

    this.neighbors = createMatrix({
      width: this.boardWidth,
      height: this.boardHeight,
      initialValue: position => this.getNeighbors(position),
    });

    makeObservable(this);
  }

  @action
  openCell(position: Position) {
    const cell = this.board[position.y][position.x];
    cell.isOpen = true;

    if (this.isFirstOpen) {
      this.isFirstOpen = false;
      this.generateMines(position);
      console.log("Generated the mines!");
    }

    if (cell.hasMine) {
      this.isGameOver = true;
      console.log("Game over!");
      return;
    }

    if (cell.neighborMineCount <= 0) {
      const connectedCells = this.walkUntilNotZero(position);

      for (const eachPosition of connectedCells) {
        this.board[eachPosition.y][eachPosition.x].isOpen = true;
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
  markCell(args: Position) {
    this.board[args.y][args.x].isFlagged = !this.board[args.y][args.x].isFlagged;
  }

  @action
  private generateMines(exclude: Position) {
    // (1) Create (w * h - 1) sized array.
    const hasMine: Array<boolean> = [];

    for (let i = 0; i < this.boardWidth * this.boardHeight - 1; i++) {
      // (2) Fill mines.
      hasMine.push(i < this.mineCount);
    }

    // (3) Shuffle.
    // https://stackoverflow.com/a/38571132
    hasMine.sort(() => 0.5 - Math.random());

    // (4) Now put the excluded cell.
    hasMine.splice(exclude.y * this.boardWidth + exclude.x, 0, false);

    // (5) Apply.
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        if (!hasMine[y * this.boardWidth + x]) {
          continue;
        }

        this.board[y][x].hasMine = true;

        for (const neighbor of this.neighbors[y][x]) {
          this.board[neighbor.y][neighbor.x].neighborMineCount++;
        }
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
}

export const GameContext = createContext({} as Game);
