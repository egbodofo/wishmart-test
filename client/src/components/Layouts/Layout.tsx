import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const Layout = (props: any) => {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
export default Layout;
