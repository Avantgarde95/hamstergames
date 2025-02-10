"use client";

import { useContext, useEffect } from "react";

import { mapRange } from "@/common/utils/MathUtils";
import { mergeStyles } from "@/common/utils/StyleUtils";
import GameContext from "@/modules/hamtris/components/GameContext";
import { FallingBlockLayer, PlacedCellsLayer } from "@/modules/hamtris/components/Layers";
import StartView from "@/modules/hamtris/components/StartView";

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
      <PlacedCellsLayer />
      <FallingBlockLayer />
      {mapRange(0, gameStore.boardHeight, y => (
        <div key={y} className="flex flex-row items-start">
          {mapRange(0, gameStore.boardWidth, x => (
            <div
              key={x}
              className={mergeStyles("relative z-10 h-6 w-6 border-b-[1px] border-r-[1px] border-gray-200", {
                "border-t-[1px]": y === 0,
                "border-l-[1px]": x === 0,
              })}
            />
          ))}
        </div>
      ))}
      <StartView />
    </div>
  );
};

export default BoardView;
