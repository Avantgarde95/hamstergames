"use client";

import { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";

import { mergeStyles } from "@/common/utils/StyleUtils";
import useClient from "@/common/hooks/useClient";
import { BlockType, Cell } from "@/modules/hamtris/stores/GameStore";
import GameContext from "@/modules/hamtris/components/GameContext";

const drawMap: Record<BlockType, { style: string; content: string }> = {
  I: { style: "bg-[#00f0f0]", content: "🔎" },
  O: { style: "bg-[#f1ef2f]", content: "🐹" },
  Z: { style: "bg-[#cf3616]", content: "🍟" },
  S: { style: "bg-[#8aea28]", content: "🌳" },
  J: { style: "bg-[#0000f0]", content: "🐟" },
  L: { style: "bg-[#dda422]", content: "🧀" },
  T: { style: "bg-[#882ced]", content: "🦄" },
};

const cellStyle =
  "flex h-6 w-6 flex-row items-center justify-center overflow-hidden text-base absolute left-0 top-0 origin-top-left";

export const PlacedCellsLayer = observer(() => {
  const { gameStore } = useContext(GameContext);

  const cells: Array<[number, number, Exclude<Cell, { type: null }>]> = [];

  for (let y = 0; y < gameStore.boardHeight; y++) {
    for (let x = 0; x < gameStore.boardWidth; x++) {
      const cell = gameStore.board[y][x];

      if (cell !== null) {
        cells.push([x, y, cell]);
      }
    }
  }

  return (
    <>
      {cells.map(([x, y, cell]) => (
        <div
          key={cell.key}
          className={mergeStyles(cellStyle, "bg-opacity-25 transition-transform", drawMap[cell.type].style)}
          style={{
            transform: `translate(${1.5 * x}rem, ${1.5 * y}rem)`,
          }}
        >
          {drawMap[cell.type].content}
        </div>
      ))}
    </>
  );
});

export const FallingBlockLayer = observer(() => {
  const { isClient } = useClient();
  const { gameStore } = useContext(GameContext);

  // Since the block is randomly generated, we need this.
  if (!isClient) {
    return null;
  }

  const fallingBlock = gameStore.fallingBlock;

  if (fallingBlock === null) {
    return null;
  }

  return (
    <>
      {gameStore.fallingBlockCellPositions.map(({ x, y }) => (
        <Fragment key={`${x}-${y}`}>
          <div
            className={mergeStyles(cellStyle, "bg-opacity-45", drawMap[fallingBlock.type].style)}
            style={{
              transform: `translate(${1.5 * x}rem, ${1.5 * y}rem)`,
            }}
          >
            {drawMap[fallingBlock.type].content}
          </div>
        </Fragment>
      ))}
    </>
  );
});
