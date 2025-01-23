"use client";

import BoardView from "@/modules/hamstersweeper/components/BoardView";
import Game, { GameContext } from "@/modules/hamstersweeper/stores/Game";

const Page = () => {
  const game = new Game({ boardWidth: 8, boardHeight: 6, mineCount: 6 });

  return (
    <div className="flex h-full w-full flex-row items-center">
      <GameContext.Provider value={game}>
        <BoardView />
      </GameContext.Provider>
    </div>
  );
};

export default Page;
