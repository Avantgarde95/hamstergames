"use client";

import { ComponentProps, MouseEvent, ReactNode, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Vector2D } from "@/common/models/Math";
import { mergeStyles } from "@/common/utils/StyleUtils";
import GameContext from "@/modules/hamstersweeper/components/GameContext";

const Mine = () => <span className="text-base">🐹</span>;

const Flag = () => <span className="text-base">🧀</span>;

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

  return <span className={`font-mono text-lg ${numberStyles[value - 1]}`}>{value}</span>;
};

const Button = (props: ComponentProps<"button">) => (
  <button
    className={mergeStyles(
      "border-outset flex h-full w-full flex-row items-center justify-center overflow-hidden border-2 bg-[#c0c0c0]",
      { "active:opacity-0": !props.disabled }
    )}
    {...props}
  />
);

interface CommonProps {
  position: Vector2D;
}

const OnRunning = observer(({ position }: CommonProps) => {
  const { gameStore, uiStore } = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  if (cell.isOpen) {
    return <NumberView value={cell.neighborMineCount} />;
  }

  const handleClick = () => {
    if (uiStore.clickMode === "Open") {
      gameStore.openCell(position);
    } else if (uiStore.clickMode === "Flag") {
      gameStore.flagCell(position);
    }
  };

  const handleRightClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameStore.flagCell(position);
  };

  return (
    <Button onClick={handleClick} onContextMenu={handleRightClick}>
      {cell.isFlagged && <Flag />}
    </Button>
  );
});

const OnWin = observer(({ position }: CommonProps) => {
  const { gameStore } = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  if (cell.isOpen) {
    return <NumberView value={cell.neighborMineCount} />;
  }

  return <Button disabled>{cell.hasMine && <Flag />}</Button>;
});

const OnLose = observer(({ position }: CommonProps) => {
  const { gameStore } = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  if (cell.hasMine) {
    return <Mine />;
  }

  return <NumberView value={cell.neighborMineCount} />;
});

const CellView = observer(({ position }: CommonProps) => {
  const { gameStore } = useContext(GameContext);

  return (
    <div className="flex h-8 w-8 flex-row items-center justify-center overflow-hidden border-[1px] border-solid border-[#818181] bg-[#bababa]">
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
