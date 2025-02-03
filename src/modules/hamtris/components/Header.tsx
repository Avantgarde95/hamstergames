import { useRouter } from "next/navigation";
import { useContext } from "react";

import GlobalContext from "@/common/components/GlobalContext";
import allRoutes from "@/common/models/Routes";

const outerButtonStyle = "h-8 w-8 text-lg hover:bg-slate-700 active:bg-slate-700 relative z-[3]";

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
    <div className="relative flex w-full flex-row items-start">
      <button className={`${outerButtonStyle} mr-auto`} onClick={handleClickBack}>
        ⬅️
      </button>
      <button className={outerButtonStyle} onClick={handleClickHelp}>
        ❓
      </button>
    </div>
  );
};

export default Header;
