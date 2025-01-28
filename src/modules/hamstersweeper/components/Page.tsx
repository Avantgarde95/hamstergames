"use client";

import BoardView from "@/modules/hamstersweeper/components/BoardView";
import GameStore, { GameContext } from "@/modules/hamstersweeper/stores/GameStore";
import UIStore, { UIContext } from "@/modules/hamstersweeper/stores/UIStore";
import Header from "@/modules/hamstersweeper/components/Header";
import TimerStore, { TimerContext } from "@/common/stores/TimerStore";
import Footer from "@/modules/hamstersweeper/components/Footer";

const Page = () => {
  const uiStore = new UIStore();
  const timerStore = new TimerStore({ interval: 1000 });
  const gameStore = new GameStore({ boardWidth: 9, boardHeight: 9, mineCount: 10 });

  return (
    <UIContext.Provider value={uiStore}>
      <TimerContext.Provider value={timerStore}>
        <GameContext.Provider value={gameStore}>
          <div className="flex h-full w-full flex-row items-start overflow-auto p-4">
            <div className="border-outset m-auto border-4 bg-[#C0C0C0] p-2">
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

export default Page;
