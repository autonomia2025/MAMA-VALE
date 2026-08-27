import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink-900 selection:bg-gold-500 selection:text-ink-900">
      <ScrollToTop />
      <Navbar />
      <main className={`flex-1 bg-paper ${isHome ? '' : 'pt-[80px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
