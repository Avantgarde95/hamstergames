"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";

import allRoutes from "@/common/models/Routes";
import { GlobalUIContext } from "@/common/stores/GlobalUIStore";

const outerButtonStyle = "h-8 w-8 text-lg hover:bg-slate-400 active:bg-slate-400";

const helpDialogContent = (
  <>
    <ul className="list-disc pl-5">
      <li>햄스터🐹가 없는 칸들을 모두 열면 승리합니다.</li>
      <li>햄스터를 밟으면 패배합니다.</li>
      <li>햄스터가 있을 법한 칸에 치즈🧀를 놓아 표시해둘 수 있습니다.</li>
    </ul>
    <ul className="mt-4 list-disc pl-5">
      <li>You win if you open all the cells without hamster🐹.</li>
      <li>If you step on the hamster, you lose.</li>
      <li>You can mark the cells by placing cheeses🧀 if you want.</li>
    </ul>
  </>
);

const Menu = () => {
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
    <div className="flex w-full flex-row items-start">
      <button className={`${outerButtonStyle} mr-auto`} onClick={handleClickBack}>
        ⬅️
      </button>
      <button className={outerButtonStyle} onClick={handleClickHelp}>
        ❓
      </button>
    </div>
  );
};

export default Menu;
