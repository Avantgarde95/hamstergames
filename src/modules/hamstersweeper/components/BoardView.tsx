"use client";

import { ReactNode, useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext } from "@/modules/hamstersweeper/stores/GameStore";
import CellView from "@/modules/hamstersweeper/components/CellView";

const BoardView = observer(() => {
  const gameStore = useContext(GameContext);

  const rows: Array<ReactNode> = [];

  for (let y = 0; y < gameStore.boardHeight; y++) {
    const row: Array<ReactNode> = [];

    for (let x = 0; x < gameStore.boardWidth; x++) {
      row.push(<CellView key={x} position={{ x, y }} />);
    }

    rows.push(
      <div key={y} className="flex flex-row items-start">
        {row}
      </div>
    );
  }

  return <div className="border-inset flex flex-col items-start border-4">{rows}</div>;
});

export default BoardView;
