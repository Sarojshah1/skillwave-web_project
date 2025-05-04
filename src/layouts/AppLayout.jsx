import { Outlet } from 'react-router-dom';
import NavBar from '../shared/components/NavBar/NavBar'
import Footer from '../shared/components/Footer/Footer';

const AppLayout = () => (
  <>
    <div className="fixed top-0 left-0 w-full z-50">
      <NavBar />
    </div>
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AppLayout;
