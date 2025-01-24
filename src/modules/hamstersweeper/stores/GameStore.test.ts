import GameStore from "@/modules/hamstersweeper/stores/GameStore";

function getRealMineCount(gameStore: GameStore) {
  let realMineCount = 0;

  for (let y = 0; y < gameStore.boardHeight; y++) {
    for (let x = 0; x < gameStore.boardWidth; x++) {
      realMineCount += gameStore.board[y][x].hasMine ? 1 : 0;
    }
  }

  return realMineCount;
}

function getMinedCells(gameStore: GameStore) {
  const mined: Array<{ x: number; y: number }> = [];
  const unmined: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < gameStore.boardHeight; y++) {
    for (let x = 0; x < gameStore.boardWidth; x++) {
      if (gameStore.board[y][x].hasMine) {
        mined.push({ x, y });
      } else {
        unmined.push({ x, y });
      }
    }
  }

  return { mined, unmined };
}

test("Initialize", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 6;
  const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

  expect(gameStore.board.length).toEqual(5);
  expect(gameStore.board[0].length).toEqual(4);
});

test("Open first", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 6;

  for (let i = 0; i < 10; i++) {
    const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

    const firstOpen = { x: 1, y: 2 };
    gameStore.openCell(firstOpen);

    expect(gameStore.board[firstOpen.y][firstOpen.x].hasMine).toBeFalsy();
    expect(getRealMineCount(gameStore)).toEqual(mineCount);
  }
});

test("Game over", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 6;

  for (let i = 0; i < 10; i++) {
    const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

    gameStore.openCell({ x: 1, y: 2 });
    expect(gameStore.isGameOver).toBeFalsy();

    const { mined, unmined } = getMinedCells(gameStore);

    for (const position of unmined) {
      gameStore.openCell(position);
      expect(gameStore.isGameOver).toBeFalsy();
    }

    gameStore.openCell(mined[0]);
    expect(gameStore.isGameOver).toBeTruthy();
  }
});
