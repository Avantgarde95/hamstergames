"use client";

import { useContext } from "react";

import { mapRange } from "@/common/utils/MathUtils";
import GameContext from "@/modules/hamtris/components/GameContext";
import { FallingBlockView, PlacedCellView } from "@/modules/hamtris/components/CellViews";

const BoardView = () => {
  const { gameStore } = useContext(GameContext);

  return (
    <div className="relative flex flex-col items-start">
      <FallingBlockView />
      {mapRange(0, gameStore.boardHeight, y => (
        <div key={y} className="flex flex-row items-start">
          {mapRange(0, gameStore.boardWidth, x => (
            <PlacedCellView key={x} position={{ x, y }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardView;
