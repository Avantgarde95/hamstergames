import { action, makeObservable, observable } from "mobx";

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

export interface Cell {
  // null = Empty.
  type: BlockType | null;
}

export default class GameStore {
  readonly boardWidth = 10;
  readonly boardHeight = 20;

  board: Array<Array<Cell>> = createMatrix({
    width: 10,
    height: 20,
    initialValue: () => ({
      type: null,
    }),
  });

  currentBlock: {
    type: BlockType;
    position: Position;
    rotation: number;
  } | null = null;

  @observable
  draw: Array<{ type: BlockType; position: Position; isPlaced: boolean }> = [];

  constructor() {
    makeObservable(this);

    this.reset();
  }

  reset() {
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        const cell = this.board[y][x];
        cell.type = null;
      }
    }

    // Test.
    this.board[19][0].type = "I";
    this.board[19][1].type = "O";
    this.board[19][2].type = "Z";
    this.board[19][3].type = "S";
    this.board[19][4].type = "J";
    this.board[19][5].type = "L";
    this.board[19][6].type = "T";

    this.currentBlock = {
      type: "T",
      position: { x: 5, y: 8 },
      rotation: 3,
    };

    this.generateDraw();
  }

  @action
  private generateDraw() {
    this.draw = [];

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        const cell = this.board[y][x];

        if (cell.type !== null) {
          this.draw.push({ type: cell.type, position: { x, y }, isPlaced: true });
        }
      }
    }

    if (this.currentBlock !== null) {
      const position = this.currentBlock.position;
      const matrix = blockMap[this.currentBlock.type].matrices[this.currentBlock.rotation];

      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
          if (matrix[y][x] === 0) {
            continue;
          }

          this.draw.push({
            type: this.currentBlock.type,
            position: {
              x: position.x + x,
              y: position.y + y,
            },
            isPlaced: false,
          });
        }
      }
    }
  }
}
