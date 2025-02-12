import { runInAction } from "mobx";

import GameStore from "@/modules/hamtris/stores/GameStore";

function drawCells(gameStore: GameStore, input: string) {
  const lines = input.split("\n");

  runInAction(() => {
    let nextKey = 0;

    for (let y = gameStore.boardHeight - 1; y >= gameStore.boardHeight - lines.length; y--) {
      for (let x = 0; x < gameStore.boardWidth; x++) {
        const char = lines[y - (gameStore.boardHeight - lines.length)][x];
        if (char === " ") {
          gameStore.board[y][x] = null;
        } else {
          gameStore.board[y][x] = { key: nextKey, type: char as any };
          nextKey++;
        }
      }
    }
  });
}

function readCells(gameStore: GameStore) {
  let firstNonEmptyY: number | null = null;

  for (let y = 0; y < gameStore.boardHeight; y++) {
    if (gameStore.board[y].some(cell => cell !== null)) {
      firstNonEmptyY = y;
      break;
    }
  }

  if (firstNonEmptyY === null) {
    return "";
  }

  let lines: Array<string> = [];

  for (let y = firstNonEmptyY; y < gameStore.boardHeight; y++) {
    lines.push(gameStore.board[y].map(cell => (cell === null ? " " : cell.type)).join(""));
  }

  return lines.join("\n");
}

test("Remove a line (1)", () => {
  const gameStore = new GameStore();

  drawCells(gameStore, `IIIIIIIIII`);
  expect(readCells(gameStore)).toEqual(`IIIIIIIIII`);
  gameStore.removeLines();
  expect(readCells(gameStore)).toEqual(``);
});

test("Remove a line (2)", () => {
  const gameStore = new GameStore();

  drawCells(
    gameStore,
    `I        I
I IIIIII I
IIIIIIIIII`
  );
  gameStore.removeLines();
  expect(readCells(gameStore)).toEqual(
    `I        I
I IIIIII I`
  );
});

test("Remove multiple lines (1)", () => {
  const gameStore = new GameStore();

  drawCells(
    gameStore,
    `I        I
I IIIIII I
IIIIIIIIII
I IIIIII I
IIIIIIIIII`
  );
  gameStore.removeLines();
  expect(readCells(gameStore)).toEqual(
    `I        I
I IIIIII I
I IIIIII I`
  );
});

test("Remove multiple lines (2)", () => {
  const gameStore = new GameStore();

  drawCells(
    gameStore,
    `I        I
IIIIIIII I
IIIIIIIIII
I IIIIII I
IIIIIIIIII`
  );
  gameStore.removeLines();
  expect(readCells(gameStore)).toEqual(
    `I        I
IIIIIIII I
I IIIIII I`
  );
});
