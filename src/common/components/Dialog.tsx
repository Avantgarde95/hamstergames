"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import GlobalContext from "@/common/components/GlobalContext";

const Dialog = observer(() => {
  const { globalUIStore } = useContext(GlobalContext);

  const handleClickBackdrop = () => {
    globalUIStore.destroyDialog();
  };

  const handleClickClose = () => {
    globalUIStore.destroyDialog();
  };

  return (
    <>
      {globalUIStore.openDialog && (
        <div className="absolute left-0 top-0 flex h-full w-full animate-[fade-in_0.4s_forwards] flex-row items-center justify-center bg-slate-500 bg-opacity-30">
          <button className="absolute left-0 top-0 h-full w-full cursor-default" onClick={handleClickBackdrop} />
          <div className="relative z-10 max-h-[90%] max-w-[90%] bg-white bg-opacity-90 p-4">
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
    </>
  );
});

export default Dialog;
