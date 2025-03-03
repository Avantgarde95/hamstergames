import { useRouter } from "next/navigation";
import { useContext } from "react";

import GlobalContext from "@/common/components/GlobalContext";
import allRoutes from "@/common/models/Routes";
import StatusView from "@/modules/hamtris/components/StatusView";
import { mergeStyles } from "@/common/utils/StyleUtils";

const heightStyle = "h-8";

const outerButtonStyle = "absolute w-8 text-lg hover:bg-slate-700 active:bg-slate-700 z-[3] top-1/2 -translate-y-1/2";

const helpDialogContent = "Hello";

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
