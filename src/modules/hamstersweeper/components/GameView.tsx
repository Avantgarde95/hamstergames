"use client";

import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import BoardView from "@/modules/hamstersweeper/components/BoardView";
import GameStore from "@/modules/hamstersweeper/stores/GameStore";
import UIStore from "@/modules/hamstersweeper/stores/UIStore";
import StatusView from "@/modules/hamstersweeper/components/StatusView";
import TimerStore from "@/common/stores/TimerStore";
import Footer from "@/modules/hamstersweeper/components/Footer";
import Header from "@/modules/hamstersweeper/components/Header";
import GameContext from "@/modules/hamstersweeper/components/GameContext";

const difficultyMap: Record<
  string,
  {
    boardWidth: number;
    boardHeight: number;
    mineCount: number;
  }
> = {
  easy: { boardWidth: 9, boardHeight: 9, mineCount: 10 },
  normal: { boardWidth: 12, boardHeight: 12, mineCount: 18 },
  hard: { boardWidth: 16, boardHeight: 12, mineCount: 26 },
};

const Initializer = observer(() => {
  const { gameStore, timerStore } = useContext(GameContext);

  useEffect(() => {
    timerStore.start();

    return () => {
      timerStore.stop();
    };
  }, [timerStore]);

  useEffect(() => {
    if (gameStore.status !== "Running") {
      timerStore.stop();
    }
  }, [timerStore, gameStore.status]);

  return null;
});

interface GameViewProps {
  difficulty: string;
}

const GameView = ({ difficulty }: GameViewProps) => {
  const uiStore = new UIStore();
  const timerStore = new TimerStore({ interval: 1000 });
  const gameStore = new GameStore(difficultyMap[difficulty] ?? difficultyMap.easy);

  return (
    <GameContext.Provider value={{ uiStore, timerStore, gameStore }}>
      <div className="flex h-full w-full flex-row items-start overflow-auto bg-white p-4">
        <div className="border-outset m-auto border-4 bg-[#C0C0C0] p-2 pt-0">
          <Initializer />
          <Header />
          <StatusView />
          <BoardView />
          <Footer />
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default GameView;
