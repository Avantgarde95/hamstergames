"use client";

import { createContext } from "react";

import TimerStore from "@/common/stores/TimerStore";
import GameStore from "@/modules/hamstersweeper/stores/GameStore";
import UIStore from "@/modules/hamstersweeper/stores/UIStore";

const GameContext = createContext(
  {} as {
    gameStore: GameStore;
    uiStore: UIStore;
    timerStore: TimerStore;
  }
);

export default GameContext;
