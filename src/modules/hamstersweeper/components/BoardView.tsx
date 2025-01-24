"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext } from "@/modules/hamstersweeper/stores/GameStore";
import CellView from "@/modules/hamstersweeper/components/CellView";

const BoardView = observer(() => {
  const gameStore = useContext(GameContext);

  return (
    <div className="border-inset flex flex-col border-4">
      {gameStore.board.map((row, y) => (
        <div key={y} className="flex flex-row">
          {row.map((cell, x) => (
            <CellView key={x} position={{ x, y }} />
          ))}
        </div>
      ))}
    </div>
  );
});

export default BoardView;
