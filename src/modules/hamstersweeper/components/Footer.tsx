"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import GameContext from "@/modules/hamstersweeper/components/GameContext";

const showStyle = "opacity-100";
const hideStyle = "opacity-30";

const Footer = observer(() => {
  const { uiStore } = useContext(GameContext);

  return (
    <div className="mt-2 flex w-full flex-row justify-evenly">
      <button
        className="border-outset active:border-inset overflow-hidden border-4 bg-[#B3B3B3] px-3 py-2 font-mono text-base leading-none"
        onClick={() => {
          uiStore.setClickMode(uiStore.clickMode === "Open" ? "Flag" : "Open");
        }}
      >
        <span className={`mr-3 ${uiStore.clickMode === "Open" ? showStyle : hideStyle}`}>🔎Open</span>
        <span className={`${uiStore.clickMode === "Flag" ? showStyle : hideStyle}`}>🧀Mark</span>
      </button>
    </div>
  );
});

export default Footer;
