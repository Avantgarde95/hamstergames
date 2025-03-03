"use client";

import { ComponentProps, useContext } from "react";

import GameContext from "@/modules/hamtris/components/GameContext";
import BlinkButton from "@/common/components/BlinkButton";
import { mergeStyles } from "@/common/utils/StyleUtils";

const Button = ({ className, onClick, children }: ComponentProps<"button">) => (
  <BlinkButton
    className={mergeStyles(
      "relative h-full flex-1 border-[1px] border-gray-200 bg-slate-400 bg-opacity-0 text-lg",
      className
    )}
    clickClassName="bg-opacity-40"
    onClick={onClick}
  >
    <span className="absolute bottom-[-4.5px] left-1/2 -translate-x-1/2 -translate-y-1/2">{children}</span>
  </BlinkButton>
);

const Control = () => {
  const { gameStore } = useContext(GameContext);

  const handleClickLeft = () => {
    gameStore.requestLeft();
  };

  const handleClickRight = () => {
    gameStore.requestRight();
  };

  const handleClickDown = () => {
    gameStore.requestDown();
  };

  const handleClickRotate = () => {
    gameStore.requestRotate();
  };

  return (
    <div className="absolute left-[-2rem] top-0 flex h-[calc(100%+3rem)] w-[calc(100%+4rem)] flex-row">
      <Button onClick={handleClickLeft}>⬅️</Button>
      <Button onClick={handleClickDown} className="border-x-0 border-t-0">
        ⏬
      </Button>
      <Button onClick={handleClickRotate} className="border-r-0 border-t-0">
        ↩️
      </Button>
      <Button onClick={handleClickRight}>➡️</Button>
    </div>
  );
};

export default Control;
