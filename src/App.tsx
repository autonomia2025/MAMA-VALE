import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ContrapesosPage from './pages/ContrapesosPage';
import AplicacionesPage from './pages/AplicacionesPage';
import CatalogoPage from './pages/CatalogoPage';
import NosotrosPage from './pages/NosotrosPage';
import CotizarPage from './pages/CotizarPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contrapesos" element={<ContrapesosPage />} />
          <Route path="/aplicaciones" element={<AplicacionesPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/cotizar" element={<CotizarPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
