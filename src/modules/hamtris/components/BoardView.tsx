"use client";

import { useContext } from "react";

import { mergeStyles } from "@/common/utils/StyleUtils";
import { mapRange } from "@/common/utils/MathUtils";
import GameContext from "@/modules/hamtris/components/GameContext";
import CellsView from "@/modules/hamtris/components/CellsView";

const BoardView = () => {
  const { gameStore } = useContext(GameContext);

  return (
    <div className="relative flex flex-col items-start">
      <CellsView />
      {mapRange(0, gameStore.boardHeight, y => (
        <div key={y} className="flex flex-row items-start">
          {mapRange(0, gameStore.boardWidth, x => (
            <div
              key={x}
              className={mergeStyles("relative h-6 w-6 border-b-[1px] border-r-[1px] border-gray-400", {
                "border-t-[1px]": y === 0,
                "border-l-[1px]": x === 0,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardView;
