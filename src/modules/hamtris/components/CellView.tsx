import { observer } from "mobx-react-lite";

import { Position } from "@/modules/hamtris/stores/GameStore";

interface CellViewProps {
  position: Position;
}

const CellView = observer(({ position }: CellViewProps) => (
  <div className="h-6 w-6 border-[1px] border-gray-400"></div>
));

export default CellView;
