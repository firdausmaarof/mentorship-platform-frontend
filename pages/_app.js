import { useRouter } from 'next/router';
import Head from 'next/head';

import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import { ApiAuthProvider } from 'contexts/api/auth';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith('/mentee')) {
    return (
      <ApiAuthProvider>
        <Head>
          <title>Mentorship Platform</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </ApiAuthProvider>
    );
  } else {
    return <Component {...pageProps} />;
  }
}
