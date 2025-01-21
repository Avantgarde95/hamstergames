import { configure } from "mobx";
import NextTopLoader from "nextjs-toploader";

import { CommonChildrenProps } from "@/common/models/Props";

import "@/common/styles/Global.css";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const Layout = ({ children }: CommonChildrenProps) => (
  <html lang="ko" className="m-0 h-full w-full p-0 font-sans">
    <head>
      {/* Pretendard. */}
      <link
        rel="stylesheet"
        as="style"
        crossOrigin=""
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
      />
      {/* Fira Code. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet" />
    </head>
    <body className="m-0 h-full w-full p-0">
      <NextTopLoader />
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </body>
  </html>
);

export default Layout;
