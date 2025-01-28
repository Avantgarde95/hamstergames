"use client";

import { CommonChildrenProps } from "@/common/models/Props";
import GlobalUIStore, { GlobalUIContext } from "@/common/stores/GlobalUIStore";

const LayoutWrapper = ({ children }: CommonChildrenProps) => {
  const globalUIStore = new GlobalUIStore();

  return <GlobalUIContext.Provider value={globalUIStore}>{children}</GlobalUIContext.Provider>;
};

export default LayoutWrapper;
