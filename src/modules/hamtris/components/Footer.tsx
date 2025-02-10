"use client";

import { useContext } from "react";

import GameContext from "@/modules/hamtris/components/GameContext";

const buttonStyle =
  "py-2 border-r-[1px] border-b-[1px] first-of-type:border-l-[1px] border-gray-200 flex-1 bg-slate-400 bg-opacity-20 active:bg-opacity-40 hover:bg-opacity-40";

const Footer = () => {
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
    <div className="flex w-full flex-row items-center">
      <button className={buttonStyle} onClick={handleClickLeft}>
        ⬅️
      </button>
      <button className={buttonStyle} onClick={handleClickDown}>
        ⏬
      </button>
      <button className={buttonStyle} onClick={handleClickRotate}>
        ↩️
      </button>
      <button className={buttonStyle} onClick={handleClickRight}>
        ➡️
      </button>
    </div>
  );
};

export default Footer;
