import { Header } from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import { globalStyles } from '@/styles/global';
import { Container } from '@/styles/pages/app';
import type { AppProps } from 'next/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
