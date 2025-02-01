import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { mergeStyles } from "@/common/utils/StyleUtils";
import { GameContext, Position } from "@/modules/hamtris/stores/GameStore";

interface CellViewProps {
  position: Position;
}

const CellView = observer(({ position }: CellViewProps) => {
  const gameStore = useContext(GameContext);
  const cell = gameStore.board[position.y][position.x];

  return (
    <div
      className={mergeStyles("h-6 w-6 border-b-[1px] border-r-[1px] border-gray-400", {
        "border-t-[1px]": position.y === 0,
        "border-l-[1px]": position.x === 0,
      })}
    ></div>
  );
});

export default CellView;
