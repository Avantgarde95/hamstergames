"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext } from "@/modules/hamstersweeper/stores/Game";
import CellView from "@/modules/hamstersweeper/components/CellView";

const BoardView = observer(() => {
  const game = useContext(GameContext);

  return (
    <div className="flex flex-col">
      {game.board.map((row, y) => (
        <div key={y} className="flex flex-row">
          {row.map((cell, x) => (
            <CellView key={x} x={x} y={y} />
          ))}
        </div>
      ))}
    </div>
  );
});

export default BoardView;
