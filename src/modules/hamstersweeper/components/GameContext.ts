"use client";

import { createContext } from "react";

import StopwatchStore from "@/common/stores/StopwatchStore";
import GameStore from "@/modules/hamstersweeper/stores/GameStore";
import UIStore from "@/modules/hamstersweeper/stores/UIStore";

const GameContext = createContext(
  {} as {
    gameStore: GameStore;
    uiStore: UIStore;
    stopwatchStore: StopwatchStore;
  }
);

export default GameContext;
