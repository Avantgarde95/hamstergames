import { mergeStyles } from "@/common/utils/StyleUtils";
import { ComponentProps, MouseEvent, TouchEvent, useState } from "react";

type BlinkButtonProps = ComponentProps<"button"> & {
  clickClassName: string;
};

/**
 * Wrapper of <button> - We can add a style which disappears after clicking or touching.
 */
const BlinkButton = ({
  className,
  clickClassName,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  ...others
}: BlinkButtonProps) => {
  const [isActive, setActive] = useState(false);

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    setActive(true);
    onMouseDown && onMouseDown(event);
  };

  const handleMouseUp = (event: MouseEvent<HTMLButtonElement>) => {
    setActive(false);
    onMouseUp && onMouseUp(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    setActive(false);
    onMouseLeave && onMouseLeave(event);
  };

  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    setActive(true);
    onTouchStart && onTouchStart(event);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    setActive(false);
    onTouchEnd && onTouchEnd(event);
  };

  return (
    <button
      className={mergeStyles(className, { [clickClassName]: isActive })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...others}
    />
  );
};

export default BlinkButton;
