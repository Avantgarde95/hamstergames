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
  const mineCount = 3;
  const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

  expect(gameStore.board.length).toEqual(5);
  expect(gameStore.board[0].length).toEqual(4);
});

test("Generate mines after the first opening", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 3;

  for (let i = 0; i < 5; i++) {
    const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

    const firstOpen = { x: 1, y: 2 };
    gameStore.openCell(firstOpen);

    expect(gameStore.board[firstOpen.y][firstOpen.x].hasMine).toBeFalsy();
    expect(getRealMineCount(gameStore)).toEqual(mineCount);
  }
});

test("Win", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 3;

  for (let i = 0; i < 5; i++) {
    const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

    gameStore.openCell({ x: 1, y: 2 });

    if (gameStore.status == "Win") {
      continue;
    }

    expect(gameStore.status).toEqual("Running");

    const { unmined } = getMinedCells(gameStore);

    for (const position of unmined) {
      gameStore.openCell(position);
    }

    expect(gameStore.status).toEqual("Win");
  }
});

test("Lose", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 3;

  for (let i = 0; i < 5; i++) {
    const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

    gameStore.openCell({ x: 1, y: 2 });

    if (gameStore.status === "Win") {
      continue;
    }

    expect(gameStore.status).toEqual("Running");

    const { mined } = getMinedCells(gameStore);

    gameStore.openCell(mined[0]);
    expect(gameStore.status).toEqual("Lose");
  }
});

test("Flag counting", () => {
  const boardWidth = 10;
  const boardHeight = 5;
  const mineCount = 3;

  const gameStore = new GameStore({ boardWidth, boardHeight, mineCount });

  for (let x = 0; x < mineCount; x++) {
    gameStore.flagCell({ x, y: 0 });
  }

  const boardSnapshot = JSON.stringify(gameStore.board);

  gameStore.flagCell({ x: 0, y: 1 });
  expect(JSON.stringify(gameStore.board)).toEqual(boardSnapshot);
});
