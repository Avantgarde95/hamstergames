"use client";

import { createContext } from "react";
import { action, makeObservable, observable } from "mobx";

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

  constructor(args: { boardWidth: number; boardHeight: number; mineCount: number }) {
    this.boardWidth = args.boardWidth;
    this.boardHeight = args.boardHeight;
    this.mineCount = args.mineCount;

    this.board = [];

    for (let y = 0; y < this.boardHeight; y++) {
      const row: Array<Cell> = [];

      for (let x = 0; x < this.boardWidth; x++) {
        row.push({
          hasMine: false,
          neighborMineCount: 0,
          isOpen: false,
          isFlagged: false,
        });
      }

      this.board.push(row);
    }

    this.isFirstOpen = true;
    this.isGameOver = false;

    makeObservable(this);
  }

  @action
  openCell(position: { x: number; y: number }) {
    this.board[position.y][position.x].isOpen = true;

    if (this.isFirstOpen) {
      this.isFirstOpen = false;
      this.generateMines(position);
      console.log("Generated the mines!");
    }

    if (this.board[position.y][position.x].hasMine) {
      this.isGameOver = true;
      console.log("Game over!");
    }
  }

  @action
  markCell(args: { x: number; y: number }) {
    this.board[args.y][args.x].isFlagged = !this.board[args.y][args.x].isFlagged;
  }

  @action
  private generateMines(exclude: { x: number; y: number }) {
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

        const neighbors = this.getNeighbors({ x, y });

        for (const neighbor of neighbors) {
          this.board[neighbor.y][neighbor.x].neighborMineCount++;
        }
      }
    }
  }

  private getNeighbors(position: { x: number; y: number }) {
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
