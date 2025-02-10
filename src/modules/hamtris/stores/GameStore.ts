import { action, computed, makeObservable, observable } from "mobx";
import { shuffle } from "lodash";

import { createMatrix, rotateMatrixRight } from "@/common/utils/MathUtils";
import { Matrix, Vector2D } from "@/common/models/Math";

export const blockTypeNames = ["I", "O", "Z", "S", "J", "L", "T"] as const;
export type BlockType = (typeof blockTypeNames)[number];

export interface BlockInfo {
  // Each matrix: For each angle.
  matrices: Array<Matrix<0 | 1>>;
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

export interface Cell {
  // Used for React + CSS animation.
  key: number;
  // null = Empty.
  type: BlockType;
}

export default class GameStore {
  readonly boardWidth = 10;
  readonly boardHeight = 20;

  @observable
  board: Matrix<Cell | null> = createMatrix({
    width: 10,
    height: 20,
    initialValue: () => null,
  });

  @observable
  fallingBlock: {
    type: BlockType;
    position: Vector2D;
    rotation: number;
  } | null = null;

  @observable
  score: number = 0;

  // Milliseconds.
  private tickInterval: number = 1000;
  private lastTime: number = 0;
  private frameJob: number | null = null;
  private readonly fps = 30;

  // For 7-bag rule.
  private blockBag: Array<BlockType> = [];

  private nextKey = 0;

  constructor() {
    makeObservable(this);

    this.reset();
  }

  startFrame() {
    this.lastTime = Date.now();
    this.generateBlock();

    this.frameJob = window.setInterval(() => {
      const now = Date.now();

      if (now - this.lastTime > this.tickInterval) {
        this.lastTime += this.tickInterval;

        // Frame content.
        if (this.fallingBlock === null) {
          // Do nothing.
        } else if (this.isFallingBlockAtBottom) {
          this.placeFallingBlock();
          this.generateBlock();
        } else {
          this.moveFallingBlock({ x: 0, y: 1 });
        }

        this.removeLines();
      }
    }, 1000 / this.fps);
  }

  stopFrame() {
    if (this.frameJob !== null) {
      window.clearInterval(this.frameJob);
    }
  }

  @action
  private reset() {
    this.stopFrame();

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        this.board[y][x] = null;
      }
    }

    this.fallingBlock = null;
    this.score = 0;
    this.lastTime = 0;
    this.frameJob = null;
    this.blockBag = [];
    this.nextKey = 0;
  }

  requestLeft() {
    this.moveFallingBlock({ x: -1, y: 0 });
  }

  requestRight() {
    this.moveFallingBlock({ x: 1, y: 0 });
  }

  requestDown() {
    this.moveFallingBlock({ x: 0, y: 1 });
  }

  requestRotate() {
    this.rotateFallingBlock();
  }

  @action
  private moveFallingBlock(amount: Vector2D) {
    if (this.fallingBlock === null) {
      return;
    }

    for (const { x, y } of this.fallingBlockCellPositions) {
      const nextX = x + amount.x;
      const nextY = y + amount.y;

      if (nextX < 0 || nextX >= this.boardWidth || nextY < 0 || nextY >= this.boardHeight) {
        return;
      }

      if (this.board[nextY][nextX] !== null) {
        return;
      }
    }

    this.fallingBlock.position.x += amount.x;
    this.fallingBlock.position.y += amount.y;
  }

  @action
  private rotateFallingBlock() {
    if (this.fallingBlock === null) {
      return;
    }

    const position = this.fallingBlock.position;
    const nextRotation = (this.fallingBlock.rotation + 1) % 4;
    const nextMatrix = blockMap[this.fallingBlock.type].matrices[nextRotation];

    for (let y = 0; y < nextMatrix.length; y++) {
      for (let x = 0; x < nextMatrix[0].length; x++) {
        if (nextMatrix[y][x] !== 1) {
          continue;
        }

        const nextX = x + position.x;
        const nextY = y + position.y;

        if (nextX < 0 || nextX >= this.boardWidth || nextY < 0 || nextY >= this.boardHeight) {
          return;
        }

        if (this.board[nextY][nextX] !== null) {
          return;
        }
      }
    }

    this.fallingBlock.rotation = nextRotation;
  }

  @action
  placeFallingBlock() {
    if (this.fallingBlock === null) {
      return;
    }

    for (const { x, y } of this.fallingBlockCellPositions) {
      this.board[y][x] = {
        key: this.nextKey,
        type: this.fallingBlock.type,
      };

      this.nextKey++;
    }

    this.fallingBlock = null;
  }

  @action
  removeLines() {
    let hadLine = false;

    for (let y = 0; y < this.boardHeight; y++) {
      const isLine = this.board[y].every(cell => cell !== null);

      if (isLine) {
        hadLine = true;
        this.score += 100;

        for (let x = 0; x < this.boardWidth; x++) {
          this.board[y][x] = null;
        }

        for (let y1 = y - 1; y1 >= 0; y1--) {
          this.board[y1 + 1] = this.board[y1].slice();
          this.board[y1].fill(null);
        }
      }
    }

    if (hadLine) {
      this.removeLines();
    }
  }

  /**
   * You should check `fallingBlock !== null` manually.
   */
  @computed
  get fallingBlockMatrix() {
    if (this.fallingBlock === null) {
      throw new Error("fallingBlock is null!");
    }

    return blockMap[this.fallingBlock.type].matrices[this.fallingBlock.rotation];
  }

  /**
   * You should check `fallingBlock !== null` manually.
   */
  @computed
  get fallingBlockCellPositions() {
    if (this.fallingBlock === null) {
      throw new Error("fallingBlock is null!");
    }

    const matrix = this.fallingBlockMatrix;
    const cellPositions: Array<Vector2D> = [];

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] === 1) {
          cellPositions.push({ x: this.fallingBlock.position.x + x, y: this.fallingBlock.position.y + y });
        }
      }
    }

    return cellPositions;
  }

  /**
   * You should check `fallingBlock !== null` manually.
   */
  @computed
  get isFallingBlockAtBottom() {
    for (const { x, y } of this.fallingBlockCellPositions) {
      if (y + 1 >= this.boardHeight) {
        return true;
      }

      if (this.board[y + 1][x] !== null) {
        return true;
      }
    }

    return false;
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
