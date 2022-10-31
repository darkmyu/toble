import { css } from '@emotion/react';
import { black, personal } from './palette';

export const editorStyles = css`
  color: ${black[800]};
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  blockquote {
    margin: 2rem 0;
    background: whitesmoke;
    border-left: 5px solid ${personal[800]};
    padding: 1rem;
    padding-left: 2rem;
  }

  a {
    color: ${personal[800]};
    text-decoration-line: none;

    &:hover {
      text-decoration-line: underline;
    }
  }
`;
