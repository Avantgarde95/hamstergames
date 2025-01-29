"use client";

import { createContext } from "react";
import { makeObservable, observable } from "mobx";
import { createMatrix } from "@/common/utils/MathUtils";

export interface Position {
  x: number;
  y: number;
}

export interface Cell {}

export default class GameStore {
  readonly boardWidth = 10;
  readonly boardHeight = 20;

  @observable
  board: Array<Array<Cell>> = createMatrix({ width: 10, height: 20, initialValue: () => ({}) });

  constructor() {
    makeObservable(this);
  }
}

export const GameContext = createContext({} as GameStore);
