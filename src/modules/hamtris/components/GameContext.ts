"use client";

import { createContext } from "react";

import GameStore from "@/modules/hamtris/stores/GameStore";
import StopwatchStore from "@/common/stores/StopwatchStore";

const GameContext = createContext(
  {} as {
    gameStore: GameStore;
    stopwatchStore: StopwatchStore;
  }
);

export default GameContext;
