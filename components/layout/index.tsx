import { useRouter } from 'next/router';
import Header from './../header';
// import Footer from './../footer'

// @ts-ignore
const Layout = ({ children }) => {
  const { query } = useRouter();

  console.log(query);
  return (
    <>
      <Header v4={query.version == '2' || query.version == '1'} />
      <main>{children}</main>
      {/*<Footer />*/}
    </>
  );
};

export default Layout;
