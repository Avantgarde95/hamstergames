"use client";

import { MouseEvent, useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext } from "@/modules/hamstersweeper/stores/Game";

const Mine = () => <span className="text-sm">🐹</span>;

const Flag = () => <span className="text-sm">🧀</span>;

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

interface NumberViewProps {
  value: number;
}

const NumberView = ({ value }: NumberViewProps) => {
  if (value <= 0) {
    return null;
  }

  return <span className={`font-mono text-base ${numberStyles[value - 1]}`}>{value}</span>;
};

interface CommonProps {
  x: number;
  y: number;
}

const Button = observer(({ x, y }: CommonProps) => {
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
    <button
      className="border-outset flex h-full w-full flex-row items-center justify-center overflow-hidden border-2 bg-[#c0c0c0] active:opacity-0"
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {cell.isFlagged && <Flag />}
    </button>
  );
});

const BeforeGameOver = observer(({ x, y }: CommonProps) => {
  const game = useContext(GameContext);
  const cell = game.board[y][x];

  return cell.isOpen ? <NumberView value={cell.neighborMineCount} /> : <Button x={x} y={y} />;
});

const AfterGameOver = observer(({ x, y }: CommonProps) => {
  const game = useContext(GameContext);
  const cell = game.board[y][x];

  return cell.hasMine ? <Mine /> : <NumberView value={cell.neighborMineCount} />;
});

const CellView = observer(({ x, y }: CommonProps) => {
  const game = useContext(GameContext);

  return (
    <div className="flex h-6 w-6 flex-row items-center justify-center overflow-hidden border-[1px] border-solid border-[#818181] bg-[#bababa]">
      {game.isGameOver ? <AfterGameOver x={x} y={y} /> : <BeforeGameOver x={x} y={y} />}
    </div>
  );
});

export default CellView;
