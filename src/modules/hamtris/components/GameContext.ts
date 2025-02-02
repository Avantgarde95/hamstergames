"use client";

import { createContext } from "react";

import GameStore from "@/modules/hamtris/stores/GameStore";

const GameContext = createContext(
  {} as {
    gameStore: GameStore;
  }
);

export default GameContext;
