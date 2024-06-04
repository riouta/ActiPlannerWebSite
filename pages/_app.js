// pages/_app.js or pages/_app.tsx
import '../styles/globals.css';
import '../styles/login.css';
import '../styles/signup.css';



function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
