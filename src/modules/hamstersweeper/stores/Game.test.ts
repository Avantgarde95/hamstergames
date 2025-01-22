import Game from "@/modules/hamstersweeper/stores/Game";

function getRealMineCount(game: Game) {
  let realMineCount = 0;

  for (let y = 0; y < game.boardHeight; y++) {
    for (let x = 0; x < game.boardWidth; x++) {
      realMineCount += game.board[y][x].hasMine ? 1 : 0;
    }
  }

  return realMineCount;
}

function getMinedCells(game: Game) {
  const mined: Array<{ x: number; y: number }> = [];
  const unmined: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < game.boardHeight; y++) {
    for (let x = 0; x < game.boardWidth; x++) {
      if (game.board[y][x].hasMine) {
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
  const game = new Game({ boardWidth, boardHeight, mineCount });

  expect(game.board.length).toEqual(5);
  expect(game.board[0].length).toEqual(4);
});

test("Open first", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 6;

  for (let i = 0; i < 10; i++) {
    const game = new Game({ boardWidth, boardHeight, mineCount });

    const firstOpen = { x: 1, y: 2 };
    game.openCell(firstOpen);

    expect(game.board[firstOpen.y][firstOpen.x].hasMine).toBeFalsy();
    expect(getRealMineCount(game)).toEqual(mineCount);
  }
});

test("Game over", () => {
  const boardWidth = 4;
  const boardHeight = 5;
  const mineCount = 6;

  for (let i = 0; i < 10; i++) {
    const game = new Game({ boardWidth, boardHeight, mineCount });

    game.openCell({ x: 1, y: 2 });
    expect(game.isGameOver).toBeFalsy();

    const { mined, unmined } = getMinedCells(game);

    for (const position of unmined) {
      game.openCell(position);
      expect(game.isGameOver).toBeFalsy();
    }

    game.openCell(mined[0]);
    expect(game.isGameOver).toBeTruthy();
  }
});
