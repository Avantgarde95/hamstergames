import { ReactNode, RefObject, useRef } from "react";
import Transition, { TransitionProps, TransitionStatus } from "react-transition-group/Transition";

type TransitionWithRefProps<E extends HTMLElement> = Omit<TransitionProps<E>, "children" | "nodeRef"> & {
  children: (args: { state: TransitionStatus; ref: RefObject<E | null> }) => ReactNode;
};

/**
 * Simple wrapper of `<Transition>` which creates a **ref** for you.
 * Useful when creating a transition group.
 */
export const TransitionWithRef = <E extends HTMLElement = HTMLElement>({
  children,
  ...others
}: TransitionWithRefProps<E>) => {
  const ref = useRef<E | null>(null);

  return (
    <Transition nodeRef={ref} {...(others as TransitionProps<E>)}>
      {state => children({ state, ref })}
    </Transition>
  );
};
