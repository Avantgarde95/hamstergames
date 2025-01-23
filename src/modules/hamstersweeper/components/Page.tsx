"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Timer from "@/common/stores/Timer";
import BoardView from "@/modules/hamstersweeper/components/BoardView";
import Counter from "@/modules/hamstersweeper/components/Counter";
import Game, { GameContext } from "@/modules/hamstersweeper/stores/Game";

const Page = observer(() => {
  const [game, setGame] = useState<Game>(() => new Game({ boardWidth: 9, boardHeight: 9, mineCount: 10 }));
  const [timer] = useState<Timer>(() => new Timer(1000));

  useEffect(() => {
    timer.start();
  }, [timer]);

  useEffect(() => {
    if (game.isGameOver) {
      timer.pause();
    }
  }, [timer, game.isGameOver]);

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="border-outset border-4 bg-[#C0C0C0] p-2">
        <div className="border-inset mb-1 flex flex-row justify-between border-4 p-1">
          <Counter value={0} />
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
