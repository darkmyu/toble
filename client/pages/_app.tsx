import { AppProps } from 'next/app';
import GlobalStyle from '../app/components/common/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
