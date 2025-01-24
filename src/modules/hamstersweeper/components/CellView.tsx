"use client";

import { MouseEvent, useContext } from "react";
import { observer } from "mobx-react-lite";

import { GameContext, Position } from "@/modules/hamstersweeper/stores/GameStore";

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

interface ButtonProps {
  position: Position;
  flag: boolean;
}

const Button = ({ position, flag }: ButtonProps) => {
  const gameStore = useContext(GameContext);

  const handleClick = () => {
    gameStore.openCell(position);
  };

  const handleRightClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameStore.flagCell(position);
  };

  return (
    <button
      className="border-outset flex h-full w-full flex-row items-center justify-center overflow-hidden border-2 bg-[#c0c0c0] active:opacity-0"
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {flag && <Flag />}
    </button>
  );
};

interface CommonProps {
  position: Position;
}

const OnRunning = observer(({ position }: CommonProps) => {
  const gameStore = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  return cell.isOpen ? (
    <NumberView value={cell.neighborMineCount} />
  ) : (
    <Button position={position} flag={cell.isFlagged} />
  );
});

const OnWin = observer(({ position }: CommonProps) => {
  const gameStore = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  return cell.isOpen ? (
    <NumberView value={cell.neighborMineCount} />
  ) : (
    <Button position={position} flag={cell.hasMine} />
  );
});

const OnLose = observer(({ position }: CommonProps) => {
  const gameStore = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  return cell.hasMine ? <Mine /> : <NumberView value={cell.neighborMineCount} />;
});

const CellView = observer(({ position }: CommonProps) => {
  const gameStore = useContext(GameContext);

  return (
    <div className="flex h-7 w-7 flex-row items-center justify-center overflow-hidden border-[1px] border-solid border-[#818181] bg-[#bababa]">
      {gameStore.status === "Win" ? (
        <OnWin position={position} />
      ) : gameStore.status === "Lose" ? (
        <OnLose position={position} />
      ) : (
        <OnRunning position={position} />
      )}
    </div>
  );
});

export default CellView;
