"use client";

import { ReactNode, useContext } from "react";

import CellsView from "@/modules/hamtris/components/CellsView";
import { mergeStyles } from "@/common/utils/StyleUtils";
import GameContext from "@/modules/hamtris/components/GameContext";

const BoardView = () => {
  const { gameStore } = useContext(GameContext);

  const rows: Array<ReactNode> = [];

  for (let y = 0; y < gameStore.boardHeight; y++) {
    const row: Array<ReactNode> = [];

    for (let x = 0; x < gameStore.boardWidth; x++) {
      row.push(
        <div
          className={mergeStyles("relative h-6 w-6 border-b-[1px] border-r-[1px] border-gray-400", {
            "border-t-[1px]": y === 0,
            "border-l-[1px]": x === 0,
          })}
          key={x}
        />
      );
    }

    rows.push(
      <div key={y} className="flex flex-row items-start">
        {row}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-start">
      <CellsView />
      {rows}
    </div>
  );
};

export default BoardView;
