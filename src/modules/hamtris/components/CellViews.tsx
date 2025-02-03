"use client";

import { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Vector2D } from "@/common/models/Math";
import { mergeStyles } from "@/common/utils/StyleUtils";
import useClient from "@/common/hooks/useClient";
import { BlockType } from "@/modules/hamtris/stores/GameStore";
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

const cellStyle = "flex h-6 w-6 flex-row items-center justify-center overflow-hidden text-base";

interface PlacedCellViewProps {
  position: Vector2D;
}

export const PlacedCellView = observer(({ position }: PlacedCellViewProps) => {
  const { gameStore } = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  return (
    <div
      className={mergeStyles(
        cellStyle,
        "relative border-b-[1px] border-r-[1px] border-gray-400 bg-opacity-25",
        cell.type && drawMap[cell.type].style,
        {
          "border-t-[1px]": position.y === 0,
          "border-l-[1px]": position.x === 0,
        }
      )}
    >
      {cell.type && drawMap[cell.type].content}
    </div>
  );
});

export const FallingBlockView = observer(() => {
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
            className={mergeStyles(
              cellStyle,
              "absolute left-0 top-0 origin-top-left bg-opacity-45",
              drawMap[fallingBlock.type].style
            )}
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
