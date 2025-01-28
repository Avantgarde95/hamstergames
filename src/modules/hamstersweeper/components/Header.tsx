import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";

import { TimerContext } from "@/common/stores/TimerStore";
import { GameContext } from "@/modules/hamstersweeper/stores/GameStore";
import Counter from "@/modules/hamstersweeper/components/Counter";

const Header = observer(() => {
  const gameStore = useContext(GameContext);
  const timerStore = useContext(TimerContext);

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

  const handleClickRestart = () => {
    gameStore.reset();
    timerStore.stop();
    timerStore.start();
  };

  return (
    <div className="border-inset border-inset mb-1 flex flex-row items-center justify-between border-4 p-1">
      <Counter value={gameStore.unusedFlagCount} />
      <button
        className="border-outset active:border-inset relative h-10 w-10 overflow-hidden border-4 bg-[#B3B3B3] text-xl"
        onClick={handleClickRestart}
      >
        🐹
        <span className="absolute right-0 top-0 text-xs">
          {gameStore.status === "Win" ? "❤️" : gameStore.status === "Lose" ? "💧" : null}
        </span>
      </button>
      <Counter value={Math.floor(timerStore.time / 1000)} />
    </div>
  );
});

export default Header;
