"use client";

import { createContext } from "react";
import { makeObservable, observable } from "mobx";

import { createMatrix, rotateMatrixRight } from "@/common/utils/MathUtils";

export const blockTypeNames = ["I", "O", "Z", "S", "J", "L", "T"] as const;
export type BlockType = (typeof blockTypeNames)[number];

export interface BlockInfo {
  // Each matrix: For each angle.
  matrices: Array<Array<Array<0 | 1>>>;
}

const blockMap: Record<BlockType, BlockInfo> = {
  I: {
    matrices: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  O: {
    matrices: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  Z: {
    matrices: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
    ],
  },
  S: {
    matrices: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
    ],
  },
  J: {
    matrices: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
  },
  L: {
    matrices: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
  },
  T: {
    matrices: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
  },
};

if (blockMap.I.matrices.length === 1) {
  for (const type of blockTypeNames) {
    const matrices = blockMap[type].matrices;

    if (matrices.length >= 4) {
      continue;
    }

    for (let i = 1; i < 4; i++) {
      matrices.push(rotateMatrixRight(matrices[i - 1]));
    }
  }

  console.log("Generated all rotations!");
}

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
