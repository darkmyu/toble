import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Auth from '../app/components/auth/Auth';
import AuthModal from '../app/components/auth/AuthModal';
import GlobalStyle from '../app/components/common/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Auth />
        <AuthModal />
        <ReactQueryDevtools />
        <GlobalStyle />
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
