"use client";

import { createContext } from "react";
import { action, makeObservable, observable } from "mobx";

export interface Cell {
  hasMine: boolean;
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
  openCell(args: { x: number; y: number }) {
    this.board[args.y][args.x].isOpen = true;

    if (this.isFirstOpen) {
      this.isFirstOpen = false;
      this.generateMines(args);
      console.log("Generated the mines!");
    }

    if (this.board[args.y][args.x].hasMine) {
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
    const hasMine = [];

    for (let i = 0; i < this.boardWidth * this.boardHeight - 1; i++) {
      hasMine.push(i < this.mineCount);
    }

    // https://stackoverflow.com/a/38571132
    hasMine.sort(() => 0.5 - Math.random());

    hasMine.splice(exclude.y * this.boardWidth + exclude.x, 0, false);

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        this.board[y][x].hasMine = hasMine[y * this.boardWidth + x];
      }
    }
  }
}

export const GameContext = createContext({} as Game);
