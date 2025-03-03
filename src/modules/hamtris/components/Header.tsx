import { useRouter } from "next/navigation";
import { useContext } from "react";

import GlobalContext from "@/common/components/GlobalContext";
import allRoutes from "@/common/models/Routes";
import StatusView from "@/modules/hamtris/components/StatusView";
import { mergeStyles } from "@/common/utils/StyleUtils";

const heightStyle = "h-8";

const outerButtonStyle = "absolute w-8 text-lg hover:bg-slate-700 active:bg-slate-700 z-[3] top-1/2 -translate-y-1/2";

const helpDialogContent = (
  <>
    <ul className="list-disc pl-5">
      <li>
        💻: You can control the block by pressing the arrow keys.
        <br />
        (Left/Right: Move, Up: Rotate, Down: Descend)
      </li>
      <li>📱: You can move/rotate/lower the block by pressing the buttons below.</li>
    </ul>
    <ul className="mt-4 list-disc pl-5">
      <li>
        💻: 키보드의 방향키를 눌러 블록을 움직일 수 있습니다.
        <br />
        (좌우: 이동, 위: 회전, 아래: 하강)
      </li>
      <li>📱: 아래쪽의 버튼들을 눌러 블록을 이동/회전/하강시킬 수 있습니다.</li>
    </ul>
  </>
);

const Header = () => {
  const router = useRouter();
  const { globalUIStore } = useContext(GlobalContext);

  const handleClickBack = () => {
    router.push(allRoutes.hamtris.home);
  };

  const handleClickHelp = () => {
    globalUIStore.createDialog({
      title: "Guide",
      content: helpDialogContent,
    });
  };

  return (
    <div className={mergeStyles("relative flex w-full flex-row items-center", heightStyle)}>
      <button
        className={mergeStyles(outerButtonStyle, heightStyle, "left-0 -translate-x-full")}
        onClick={handleClickBack}
      >
        ⬅️
      </button>
      <StatusView />
      <button
        className={mergeStyles(outerButtonStyle, heightStyle, "right-0 translate-x-full")}
        onClick={handleClickHelp}
      >
        ❓
      </button>
    </div>
  );
};

export default Header;
