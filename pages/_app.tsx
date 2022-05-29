import type { AppProps } from 'next/app';
import { CartContextProvider } from '../store/cart-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Component {...pageProps} />
    </CartContextProvider>
  );
}

export default MyApp;
