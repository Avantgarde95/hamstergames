import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { mergeStyles } from "@/common/utils/StyleUtils";
import { BlockType, GameContext } from "@/modules/hamtris/stores/GameStore";

const drawMap: Record<BlockType, { style: string; content: string }> = {
  I: { style: "bg-[#00f0f0]", content: "🔎" },
  O: { style: "bg-[#f1ef2f]", content: "🐹" },
  Z: { style: "bg-[#cf3616]", content: "🍟" },
  S: { style: "bg-[#8aea28]", content: "🌳" },
  J: { style: "bg-[#0000f0]", content: "🐟" },
  L: { style: "bg-[#dda422]", content: "🧀" },
  T: { style: "bg-[#882ced]", content: "🦄" },
};

const CellsView = observer(() => {
  const gameStore = useContext(GameContext);
  console.log(gameStore.draw);

  return (
    <>
      {gameStore.draw.map(({ type, position, isPlaced }, index) => (
        <div
          key={index}
          className={mergeStyles(
            "absolute flex h-6 w-6 flex-row items-center justify-center overflow-hidden text-base",
            drawMap[type].style,
            isPlaced ? "bg-opacity-25" : "bg-opacity-45"
          )}
          style={{ left: `${1.5 * position.x}rem`, top: `${1.5 * position.y}rem` }}
        >
          {drawMap[type].content}
        </div>
      ))}
    </>
  );
});

export default CellsView;
