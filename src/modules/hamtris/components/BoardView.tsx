"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext } from "@/modules/hamtris/stores/GameStore";
import CellView from "@/modules/hamtris/components/CellView";

const BoardView = observer(() => {
  const gameStore = useContext(GameContext);

  return (
    <div className="flex flex-col items-start">
      {gameStore.board.map((row, y) => (
        <div key={y} className="flex flex-row items-start">
          {row.map((cell, x) => (
            <CellView key={x} position={{ x, y }} />
          ))}
        </div>
      ))}
    </div>
  );
});

export default BoardView;
