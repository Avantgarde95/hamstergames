"use client";

import BoardView from "@/modules/hamtris/components/BoardView";
import GameStore, { GameContext } from "@/modules/hamtris/stores/GameStore";

const GameView = () => {
  const gameStore = new GameStore();

  return (
    <GameContext.Provider value={gameStore}>
      <div className="flex h-full w-full flex-row items-start bg-black p-4">
        <div className="m-auto">
          <BoardView />
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default GameView;
