"use client";

import { useContext, useEffect } from "react";

import BoardView from "@/modules/hamtris/components/BoardView";
import GameContext from "@/modules/hamtris/components/GameContext";
import Header from "@/modules/hamtris/components/Header";
import GameStore from "@/modules/hamtris/stores/GameStore";
import StopwatchStore from "@/common/stores/StopwatchStore";
import StatusView from "@/modules/hamtris/components/StatusView";

const Initializer = () => {
  const { gameStore, stopwatchStore } = useContext(GameContext);

  // Test.
  // TODO: Start after interaction.
  useEffect(() => {
    gameStore.startFrame();

    return () => {
      gameStore.stopFrame();
    };
  }, [gameStore]);

  useEffect(() => {
    stopwatchStore.start();

    return () => {
      stopwatchStore.stop();
    };
  }, [stopwatchStore]);

  return null;
};

const GameView = () => {
  const gameStore = new GameStore();
  const stopwatchStore = new StopwatchStore({ interval: 1000 });

  return (
    <GameContext.Provider value={{ gameStore, stopwatchStore }}>
      <div className="flex h-full w-full flex-row items-start bg-black p-4">
        <div className="m-auto">
          <Initializer />
          <Header />
          <StatusView />
          <BoardView />
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default GameView;
