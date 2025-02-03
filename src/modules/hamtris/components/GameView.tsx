"use client";

import { useContext, useEffect } from "react";

import BoardView from "@/modules/hamtris/components/BoardView";
import GameContext from "@/modules/hamtris/components/GameContext";
import Header from "@/modules/hamtris/components/Header";
import GameStore from "@/modules/hamtris/stores/GameStore";

const Initializer = () => {
  const { gameStore } = useContext(GameContext);

  // Test.
  // TODO: Start after interaction.
  useEffect(() => {
    gameStore.startFrame();

    return () => {
      gameStore.stopFrame();
    };
  }, [gameStore]);

  return null;
};

const GameView = () => {
  const gameStore = new GameStore();

  return (
    <GameContext.Provider value={{ gameStore }}>
      <div className="flex h-full w-full flex-row items-start bg-black p-4">
        <div className="m-auto">
          <Initializer />
          <Header />
          <BoardView />
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default GameView;
