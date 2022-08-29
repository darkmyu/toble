import { css, Global } from '@emotion/react';

export default function GlobalStyle() {
  return <Global styles={style} />;
}

const style = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css');

  * {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
      Droid Sans, Helvetica Neue, sans-serif;
  }

  button,
  input {
    font-family: inherit;
  }
`;
