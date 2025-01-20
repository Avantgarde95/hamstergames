import { createRoot } from "react-dom/client";

import App from "@/App";

const rootElement = document.querySelector("#root");

if (rootElement === null) {
  throw new Error("No root element!");
}

const root = createRoot(rootElement);

root.render(<App />);
