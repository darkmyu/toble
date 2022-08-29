import { AppProps } from 'next/app';
import GlobalStyle from '../src/components/common/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
