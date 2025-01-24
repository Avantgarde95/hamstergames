"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Timer from "@/common/stores/Timer";
import BoardView from "@/modules/hamstersweeper/components/BoardView";
import Counter from "@/modules/hamstersweeper/components/Counter";
import GameStore, { GameContext } from "@/modules/hamstersweeper/stores/GameStore";

const Page = observer(() => {
  const [game] = useState<GameStore>(() => new GameStore({ boardWidth: 9, boardHeight: 9, mineCount: 10 }));
  const [timer] = useState<Timer>(() => new Timer(1000));

  useEffect(() => {
    timer.start();

    return () => {
      timer.stop();
    };
  }, [timer]);

  useEffect(() => {
    if (game.status !== "Running") {
      timer.stop();
    }
  }, [timer, game.status]);

  const handleClickRestart = () => {
    game.reset();
    timer.stop();
    timer.start();
  };

  return (
    <div className="flex h-full w-full flex-row items-center justify-center overflow-auto p-4">
      <div className="border-outset border-4 bg-[#C0C0C0] p-2">
        <div className="border-inset border-inset mb-1 flex flex-row items-center justify-between border-4 p-1">
          <Counter value={0} />
          <button
            className="border-outset active:border-inset relative h-10 w-10 overflow-hidden border-4 bg-[#B3B3B3] text-xl"
            onClick={handleClickRestart}
          >
            🐹
            <span className="absolute right-0 top-0 text-xs">
              {game.status === "Win" ? "❤️" : game.status === "Lose" ? "💧" : null}
            </span>
          </button>
          <Counter value={Math.floor(timer.time / 1000)} />
        </div>
        <GameContext.Provider value={game}>
          <BoardView />
        </GameContext.Provider>
      </div>
    </div>
  );
});

export default Page;
