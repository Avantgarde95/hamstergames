"use client";

import { useContext, useState } from "react";

import GameContext from "@/modules/hamtris/components/GameContext";

const StartView = () => {
  const { gameStore, stopwatchStore } = useContext(GameContext);
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  const handleClickStart = () => {
    gameStore.startFrame();
    stopwatchStore.start();
    setShow(false);
  };

  return (
    <button
      className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-nowrap bg-slate-600 bg-opacity-85 p-4 text-xl text-white hover:bg-slate-500 hover:bg-opacity-85 active:bg-slate-500 active:bg-opacity-85"
      onClick={handleClickStart}
    >
      🐹 Start
    </button>
  );
};

export default StartView;
