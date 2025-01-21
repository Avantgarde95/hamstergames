"use client";

import { MouseEvent, useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext } from "@/modules/hamstersweeper/stores/Game";

interface CellViewProps {
  x: number;
  y: number;
}

const CellView = ({ x, y }: CellViewProps) => {
  const game = useContext(GameContext);
  const cell = game.board[y][x];

  const handleClick = () => {
    game.openCell({ x, y });
  };

  const handleRightClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    game.markCell({ x, y });
  };

  return (
    <div className="flex h-6 w-6 flex-row items-center justify-center border-[1px] border-solid border-[#818181] bg-[#bababa] text-sm">
      {game.isGameOver
        ? cell.hasMine && "🐹"
        : !cell.isOpen && (
            <button
              className="border-outset flex h-full w-full flex-row items-center justify-center border-2 bg-[#c0c0c0] text-sm active:opacity-0"
              onClick={handleClick}
              onContextMenu={handleRightClick}
            >
              {cell.isFlagged && "🧀"}
            </button>
          )}
    </div>
  );
};

export default observer(CellView);
