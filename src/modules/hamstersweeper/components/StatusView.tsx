"use client";

import { observer } from "mobx-react-lite";
import { useContext } from "react";

import Counter from "@/modules/hamstersweeper/components/Counter";
import GameContext from "@/modules/hamstersweeper/components/GameContext";

const StatusView = observer(() => {
  const { gameStore, stopwatchStore } = useContext(GameContext);

  const handleClickRestart = () => {
    gameStore.reset();
    stopwatchStore.stop();
    stopwatchStore.start();
  };

  return (
    <div className="border-inset border-inset mb-1 flex flex-row items-center justify-between border-4 p-1">
      <Counter value={gameStore.unusedFlagCount} />
      <button
        className="border-outset active:border-inset relative h-10 w-10 overflow-hidden border-4 bg-[#B3B3B3] text-xl"
        onClick={handleClickRestart}
      >
        🐹
        <span className="absolute right-0 top-0 text-xs">
          {gameStore.status === "Win" ? "❤️" : gameStore.status === "Lose" ? "💧" : null}
        </span>
      </button>
      <Counter value={Math.floor(stopwatchStore.time / 1000)} />
    </div>
  );
});

export default StatusView;
