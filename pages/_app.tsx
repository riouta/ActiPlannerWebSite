// pages/_app.js or pages/_app.tsx
import '../styles/globals.css';
import '../styles/login.css';
import '../styles/signup.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
