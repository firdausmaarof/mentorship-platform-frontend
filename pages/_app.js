import { useRouter } from 'next/router';

import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import { ApiAuthProvider } from 'contexts/api/auth';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith('/mentee')) {
    return (
      <ApiAuthProvider>
        <Component {...pageProps} />
      </ApiAuthProvider>
    );
  } else {
    return <Component {...pageProps} />;
  }
}
