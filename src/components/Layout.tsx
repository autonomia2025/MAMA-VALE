import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-paper text-ink-900 selection:bg-gold-500 selection:text-ink-900">
      {/* Global static noise grain texture (mounted once, 3% opacity, pointer-events-none, below navbar) */}
      <div aria-hidden="true" className="global-grain-texture" />
      <ScrollToTop />
      <Navbar />
      <main className={`flex-1 w-full max-w-full bg-paper ${isHome ? '' : 'pt-[80px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
