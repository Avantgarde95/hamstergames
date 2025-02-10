"use client";

import { useContext, useEffect } from "react";

import BoardView from "@/modules/hamtris/components/BoardView";
import GameContext from "@/modules/hamtris/components/GameContext";
import Header from "@/modules/hamtris/components/Header";
import GameStore from "@/modules/hamtris/stores/GameStore";
import StopwatchStore from "@/common/stores/StopwatchStore";
import StatusView from "@/modules/hamtris/components/StatusView";
import { backgroundStyle } from "@/modules/hamtris/styles/Common";
import { mergeStyles } from "@/common/utils/StyleUtils";

const Initializer = () => {
  const { gameStore, stopwatchStore } = useContext(GameContext);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    // Do nothing.

    return () => {
      gameStore.stopFrame();
    };
  }, [gameStore]);

  useEffect(() => {
    // Do nothing.

    return () => {
      stopwatchStore.stop();
    };
  }, [stopwatchStore]);
  /* eslint-enable arrow-body-style */

  return null;
};

const GameView = () => {
  const gameStore = new GameStore();
  const stopwatchStore = new StopwatchStore({ interval: 1000 });

  return (
    <GameContext.Provider value={{ gameStore, stopwatchStore }}>
      <div className={mergeStyles("flex h-full w-full flex-row items-start p-4", backgroundStyle)}>
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
