"use client";

import { CSSProperties, useContext } from "react";
import { observer } from "mobx-react-lite";

import { mergeStyles } from "@/common/utils/StyleUtils";
import GameContext from "@/modules/hamtris/components/GameContext";

const StatusView = observer(() => {
  const { gameStore, stopwatchStore } = useContext(GameContext);

  const time = stopwatchStore.time / 1000;
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);
  const minutesString = `${minutes}`.padStart(2, "0");
  const secondsString = `${seconds}`.padStart(2, "0");

  const cssVariables = {
    "--bubbles-color": "#ffffff",
  } as CSSProperties;

  return (
    <div className="mx-1 flex flex-1 flex-row items-center font-mono text-white" style={cssVariables}>
      <span
        key={gameStore.score}
        className={mergeStyles("bubbles-setup relative", {
          "bubbles-show before:animate-[pop-top-bubbles_ease-in-out_0.75s_forwards] after:animate-[pop-bottom-bubbles_ease-in-out_0.75s_forwards]":
            gameStore.score > 0,
        })}
      >
        🐹{gameStore.score}
      </span>
      <span className="ml-auto">
        ⏰{minutesString}:{secondsString}
      </span>
    </div>
  );
});

export default StatusView;
