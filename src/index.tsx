import { createRoot } from "react-dom/client";
import { configure } from "mobx";

import App from "@/App";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const rootElement = document.querySelector("#root");

if (rootElement === null) {
  throw new Error("No root element!");
}

const root = createRoot(rootElement);

root.render(<App />);
