"use client";

import { useContext, useEffect } from "react";

import { mapRange } from "@/common/utils/MathUtils";
import GameContext from "@/modules/hamtris/components/GameContext";
import { FallingBlockView, PlacedCellView } from "@/modules/hamtris/components/CellViews";

const BoardView = () => {
  const { gameStore } = useContext(GameContext);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          gameStore.moveFallingBlock({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          gameStore.moveFallingBlock({ x: 1, y: 0 });
          break;
        case "ArrowDown":
          gameStore.moveFallingBlock({ x: 0, y: 1 });
          break;
        case "ArrowUp":
          gameStore.rotateFallingBlock();
          break;
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [gameStore]);

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
