"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import GlobalContext from "@/common/components/GlobalContext";
import { TransitionWithRef } from "@/common/components/Transition";
import { mergeStyles } from "@/common/utils/StyleUtils";

const Dialog = observer(() => {
  const { globalUIStore } = useContext(GlobalContext);

  const handleClickBackdrop = () => {
    globalUIStore.destroyDialog();
  };

  const handleClickClose = () => {
    globalUIStore.destroyDialog();
  };

  return (
    <TransitionWithRef<HTMLDivElement> in={globalUIStore.openDialog} timeout={280} mountOnEnter unmountOnExit>
      {({ state, ref }) => (
        <div
          ref={ref}
          className={mergeStyles(
            "absolute left-0 top-0 z-40 flex h-full w-full flex-row items-center justify-center bg-slate-500 bg-opacity-30 opacity-0 transition-opacity duration-[280ms]",
            state === "entering" || state === "entered" ? "opacity-100" : "opacity-0"
          )}
        >
          <button className="absolute left-0 top-0 h-full w-full cursor-default" onClick={handleClickBackdrop} />
          <div className="relative z-50 max-h-[90%] max-w-[90%] bg-white bg-opacity-90 p-4">
            <div className="mb-2 flex flex-row items-center">
              <span className="text-xl font-bold">{globalUIStore.dialogTitle}</span>
              <button className="ml-auto hover:bg-slate-300 active:bg-slate-400" onClick={handleClickClose}>
                ✖️
              </button>
            </div>
            {globalUIStore.dialogContent}
          </div>
        </div>
      )}
    </TransitionWithRef>
  );
});

export default Dialog;
