"use client";

import { ReactNode, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { sample } from "lodash-es";

import allRoutes from "@/common/models/Routes";
import { GlobalUIContext } from "@/common/stores/GlobalUIStore";
import { TimerContext } from "@/common/stores/TimerStore";
import { GameContext } from "@/modules/hamstersweeper/stores/GameStore";

const winMessages = ["Win!", "Nice!", "Thanks!", "Good!"];
const loseMessages = ["Ouch!", "It hurts!", "Lose!", "Try again!"];

const Result = observer(() => {
  const gameStore = useContext(GameContext);
  const timerStore = useContext(TimerContext);

  let result: ReactNode = "";

  if (gameStore.status === "Win") {
    const time = Math.floor(timerStore.time / 1000);
    const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
    const seconds = `${time % 60}`.padStart(2, "0");
    result = `${sample(winMessages)} (${minutes}:${seconds})`;
  } else if (gameStore.status === "Lose") {
    result = sample(loseMessages);
  }

  return (
    <span className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-mono text-lg">
      {result}
    </span>
  );
});

const outerButtonStyle = "h-8 w-8 text-lg hover:bg-slate-400 active:bg-slate-400 relative z-[3]";

const helpDialogContent = (
  <>
    <ul className="list-disc pl-5">
      <li>You win if you open all the cells without hamster🐹.</li>
      <li>If you step on the hamster, you lose.</li>
      <li>You can mark the cells by placing cheeses🧀 if you want.</li>
    </ul>
    <ul className="mt-4 list-disc pl-5">
      <li>햄스터🐹가 없는 칸들을 모두 열면 승리합니다.</li>
      <li>햄스터를 밟으면 패배합니다.</li>
      <li>햄스터가 있을 법한 칸에 치즈🧀를 놓아 표시해둘 수 있습니다.</li>
    </ul>
  </>
);

const Header = () => {
  const router = useRouter();
  const globalUIStore = useContext(GlobalUIContext);

  const handleClickBack = () => {
    router.push(allRoutes.hamstersweeper.home);
  };

  const handleClickHelp = () => {
    globalUIStore.createDialog({
      title: "Guide",
      content: helpDialogContent,
    });
  };

  return (
    <div className="relative flex w-full flex-row items-start">
      <button className={`${outerButtonStyle} mr-auto`} onClick={handleClickBack}>
        ⬅️
      </button>
      <Result />
      <button className={outerButtonStyle} onClick={handleClickHelp}>
        ❓
      </button>
    </div>
  );
};

export default Header;
