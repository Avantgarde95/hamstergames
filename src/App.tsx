import { css, Global } from "@emotion/react";

const globalStyle = (
  <Global
    styles={css`
      html {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        font-family: "Noto Sans KR", sans-serif;
        font-size: 16px;
      }

      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }

      #root {
        width: 100%;
        height: 100%;
      }
    `}
  />
);

const App = () => (
  <>
    {globalStyle}
    <div>Hello</div>
  </>
);

export default App;
