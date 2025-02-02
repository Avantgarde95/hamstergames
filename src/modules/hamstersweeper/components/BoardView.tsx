"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import CellView from "@/modules/hamstersweeper/components/CellView";
import GameContext from "@/modules/hamstersweeper/components/GameContext";
import { mapRange } from "@/common/utils/MathUtils";

const BoardView = observer(() => {
  const { gameStore } = useContext(GameContext);

  return (
    <div className="border-inset flex flex-col items-start border-4">
      {mapRange(0, gameStore.boardHeight, y => (
        <div key={y} className="flex flex-row items-start">
          {mapRange(0, gameStore.boardWidth, x => (
            <CellView key={x} position={{ x, y }} />
          ))}
        </div>
      ))}
    </div>
  );
});

export default BoardView;
