import { action, makeObservable, observable } from "mobx";
import { shuffle } from "lodash";

import { createMatrix, rotateMatrixRight } from "@/common/utils/MathUtils";
import { Matrix, Vector2D } from "@/common/models/Math";

export const blockTypeNames = ["I", "O", "Z", "S", "J", "L", "T"] as const;
export type BlockType = (typeof blockTypeNames)[number];

export interface BlockInfo {
  // Each matrix: For each angle.
  matrices: Array<Matrix<0 | 1>>;
}

export const blockMap: Record<BlockType, BlockInfo> = {
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

export interface Cell {
  // null = Empty.
  type: BlockType | null;
}

export default class GameStore {
  readonly boardWidth = 10;
  readonly boardHeight = 20;

  @observable
  board: Matrix<Cell> = createMatrix({
    width: 10,
    height: 20,
    initialValue: () => ({
      type: null,
    }),
  });

  @observable
  fallingBlock: {
    type: BlockType;
    position: Vector2D;
    rotation: number;
  } | null = null;

  // For 7-bag rule.
  private blockBag: Array<BlockType> = [];

  constructor() {
    makeObservable(this);

    this.reset();
    this.generateBlock();
  }

  @action
  reset() {
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        const cell = this.board[y][x];
        cell.type = null;
      }
    }

    this.fallingBlock = null;
  }

  @action
  moveFallingBlock(amount: Vector2D) {
    if (this.fallingBlock === null) {
      return;
    }

    this.fallingBlock.position.x += amount.x;
    this.fallingBlock.position.y += amount.y;
  }

  @action
  rotateFallingBlock() {
    if (this.fallingBlock === null) {
      return;
    }

    this.fallingBlock.rotation = (this.fallingBlock.rotation + 1) % 4;
  }

  @action
  private generateBlock() {
    if (this.blockBag.length <= 0) {
      this.blockBag = shuffle(blockTypeNames);
    }

    const blockType = this.blockBag.pop()!;
    const blockInfo = blockMap[blockType];
    const rotation = 0;
    const matrix = blockInfo.matrices[rotation];

    const x = Math.floor((this.boardWidth - matrix[0].length) / 2);
    const y = 0;

    this.fallingBlock = {
      type: blockType,
      position: { x, y },
      rotation,
    };
  }
}
