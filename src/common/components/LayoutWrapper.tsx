"use client";

import GlobalContext from "@/common/components/GlobalContext";
import { CommonChildrenProps } from "@/common/models/Props";
import GlobalUIStore from "@/common/stores/GlobalUIStore";

const LayoutWrapper = ({ children }: CommonChildrenProps) => {
  const globalUIStore = new GlobalUIStore();

  return <GlobalContext.Provider value={{ globalUIStore }}>{children}</GlobalContext.Provider>;
};

export default LayoutWrapper;
