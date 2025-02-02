import { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";

import { mergeStyles } from "@/common/utils/StyleUtils";
import { blockMap, BlockType, Position } from "@/modules/hamtris/stores/GameStore";
import GameContext from "@/modules/hamtris/components/GameContext";

const drawMap: Record<BlockType, { style: string; content: string }> = {
  I: { style: "bg-[#00f0f0]", content: "🔎" },
  O: { style: "bg-[#f1ef2f]", content: "🐹" },
  Z: { style: "bg-[#cf3616]", content: "🍟" },
  S: { style: "bg-[#8aea28]", content: "🌳" },
  J: { style: "bg-[#0000f0]", content: "🐟" },
  L: { style: "bg-[#dda422]", content: "🧀" },
  T: { style: "bg-[#882ced]", content: "🦄" },
};

const cellStyle = "flex h-6 w-6 flex-row items-center justify-center overflow-hidden text-base";

interface PlacedCellViewProps {
  position: Position;
}

export const PlacedCellView = observer(({ position }: PlacedCellViewProps) => {
  const { gameStore } = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  return (
    <div
      className={mergeStyles(
        cellStyle,
        "relative border-b-[1px] border-r-[1px] border-gray-400 bg-opacity-25",
        cell.type && drawMap[cell.type].style,
        {
          "border-t-[1px]": position.y === 0,
          "border-l-[1px]": position.x === 0,
        }
      )}
    >
      {cell.type && drawMap[cell.type].content}
    </div>
  );
});

export const FallingBlockView = observer(() => {
  const { gameStore } = useContext(GameContext);
  const fallingBlock = gameStore.fallingBlock;

  if (fallingBlock === null) {
    return null;
  }

  const position = fallingBlock.position;
  const matrix = blockMap[fallingBlock.type].matrices[fallingBlock.rotation];

  return (
    <>
      {matrix.map((row, y) =>
        row.map((value, x) => (
          <Fragment key={`${x}-${y}`}>
            {value === 1 && (
              <div
                className={mergeStyles(cellStyle, "absolute bg-opacity-45", drawMap[fallingBlock.type].style)}
                style={{ left: `${1.5 * (x + position.x)}rem`, top: `${1.5 * (y + position.y)}rem` }}
              >
                {drawMap[fallingBlock.type].content}
              </div>
            )}
          </Fragment>
        ))
      )}
    </>
  );
});
