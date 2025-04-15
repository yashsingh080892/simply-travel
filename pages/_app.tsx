import "../styles/globals.scss";
import "../styles/login.scss";
import "../styles/buttons.scss";
import type { AppProps } from 'next/app'
import Layout from './../components/layout'
import {wrapper} from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default wrapper.withRedux(MyApp);
