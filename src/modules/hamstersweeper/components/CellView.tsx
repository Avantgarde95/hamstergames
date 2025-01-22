"use client";

import { MouseEvent, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Cell, GameContext } from "@/modules/hamstersweeper/stores/Game";

const numberStyles = [
  "text-[#0000F5]",
  "text-[#388022]",
  "text-[#E93323]",
  "text-[#00007E]",
  "text-[#79150D]",
  "text-[#388083]",
  "text-[#791580]",
  "text-[#757575]",
];

interface CellContentProps {
  cell: Cell;
}

const CellContent = ({ cell }: CellContentProps) => {
  if (cell.hasMine) {
    return <span className="text-sm">🐹</span>;
  }

  if (cell.neighborMineCount <= 0) {
    return null;
  }

  return <span className={`text-base ${numberStyles[cell.neighborMineCount - 1]}`}>{cell.neighborMineCount}</span>;
};

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
    <div className="flex h-6 w-6 flex-row items-center justify-center border-[1px] border-solid border-[#818181] bg-[#bababa]">
      {game.isGameOver ? (
        <CellContent cell={cell} />
      ) : (
        !cell.isOpen && (
          <button
            className="border-outset flex h-full w-full flex-row items-center justify-center border-2 bg-[#c0c0c0] text-sm active:opacity-0"
            onClick={handleClick}
            onContextMenu={handleRightClick}
          >
            {cell.isFlagged && "🧀"}
          </button>
        )
      )}
    </div>
  );
};

export default observer(CellView);
