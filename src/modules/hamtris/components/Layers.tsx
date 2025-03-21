"use client";

import { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { TransitionGroup } from "react-transition-group";

import { mergeStyles } from "@/common/utils/StyleUtils";
import useClient from "@/common/hooks/useClient";
import { BlockType, Cell } from "@/modules/hamtris/stores/GameStore";
import GameContext from "@/modules/hamtris/components/GameContext";
import { TransitionWithRef } from "@/common/components/Transition";
import { cellSizeRem, cellSizeStyle } from "@/modules/hamtris/styles/Common";

const drawMap: Record<BlockType, { color: string; content: string }> = {
  I: { color: "#00f0f0", content: "🔎" },
  O: { color: "#f1ef2f", content: "🐹" },
  Z: { color: "#cf5716", content: "🍟" },
  S: { color: "#8aea28", content: "🌳" },
  J: { color: "#0000f0", content: "🐟" },
  L: { color: "#dda422", content: "🧀" },
  T: { color: "#882ced", content: "🦄" },
};

const cellStyle = mergeStyles("absolute left-0 top-0 origin-top-left", cellSizeStyle);

const contentStyle = "flex flex-row items-center justify-center w-full h-full overflow-hidden text-xs";

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
    <TransitionGroup component={null}>
      {cells.map(([x, y, cell]) => (
        <TransitionWithRef<HTMLDivElement> key={cell.key} timeout={300}>
          {({ state, ref }) => {
            const showContent = state === "entered" || state === "entering";
            const showAnimation = state === "exiting";

            const cssVariables = {
              "--cell-color": drawMap[cell.type].color + "4c",
              "--bubbles-color": drawMap[cell.type].color,
            };

            return (
              <div
                ref={ref}
                className={mergeStyles(cellStyle, "bubbles-setup transition-transform", {
                  "bubbles-show before:animate-[pop-top-bubbles_ease-in-out_0.75s_forwards] after:animate-[pop-bottom-bubbles_ease-in-out_0.75s_forwards]":
                    showAnimation,
                  "bg-[var(--cell-color)]": showContent,
                })}
                style={{
                  transform: `translate(${cellSizeRem * x}rem, ${cellSizeRem * y}rem)`,
                  ...cssVariables,
                }}
              >
                <div className={contentStyle}>{showContent && drawMap[cell.type].content}</div>
              </div>
            );
          }}
        </TransitionWithRef>
      ))}
    </TransitionGroup>
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

  const cssVariables = {
    "--cell-color": drawMap[fallingBlock.type].color + "6f",
  };

  return (
    <>
      {gameStore.fallingBlockCellPositions.map(({ x, y }) => (
        <Fragment key={`${x}-${y}`}>
          <div
            className={mergeStyles(cellStyle, "bg-[var(--cell-color)]")}
            style={{
              transform: `translate(${cellSizeRem * x}rem, ${cellSizeRem * y}rem)`,
              ...cssVariables,
            }}
          >
            <div className={contentStyle}>{drawMap[fallingBlock.type].content}</div>
          </div>
        </Fragment>
      ))}
    </>
  );
});
