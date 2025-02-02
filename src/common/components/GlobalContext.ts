"use client";

import { createContext } from "react";

import GlobalUIStore from "@/common/stores/GlobalUIStore";

const GlobalContext = createContext(
  {} as {
    globalUIStore: GlobalUIStore;
  }
);

export default GlobalContext;
