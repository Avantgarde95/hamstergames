"use client";

import BoardView from "@/modules/hamstersweeper/components/BoardView";
import GameStore, { GameContext } from "@/modules/hamstersweeper/stores/GameStore";
import UIStore, { UIContext } from "@/modules/hamstersweeper/stores/UIStore";
import Header from "@/modules/hamstersweeper/components/Header";
import TimerStore, { TimerContext } from "@/common/stores/TimerStore";
import Footer from "@/modules/hamstersweeper/components/Footer";

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

interface GameViewProps {
  difficulty: string;
}

const GameView = ({ difficulty }: GameViewProps) => {
  const uiStore = new UIStore();
  const timerStore = new TimerStore({ interval: 1000 });
  const gameStore = new GameStore(difficultyMap[difficulty] ?? difficultyMap.easy);

  return (
    <UIContext.Provider value={uiStore}>
      <TimerContext.Provider value={timerStore}>
        <GameContext.Provider value={gameStore}>
          <div className="flex h-full w-full flex-row items-start overflow-auto p-4">
            <div className="border-outset m-auto border-4 bg-[#C0C0C0] p-2 pt-0">
              <div className="flex w-full flex-row items-start">
                <button className="mr-auto h-8 w-6">⬅️</button>
                <button className="h-8 w-6">❓</button>
              </div>
              <Header />
              <BoardView />
              <Footer />
            </div>
          </div>
        </GameContext.Provider>
      </TimerContext.Provider>
    </UIContext.Provider>
  );
};

export default GameView;
