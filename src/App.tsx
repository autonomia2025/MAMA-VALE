import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EquipamientoPage from './pages/EquipamientoPage';
import ElevadoresPage from './pages/ElevadoresPage';
import AlineadoresPage from './pages/AlineadoresPage';
import DesmontadorasPage from './pages/DesmontadorasPage';
import LubricacionPage from './pages/LubricacionPage';
import RedesPage from './pages/RedesPage';
import ConsumiblesPage from './pages/ConsumiblesPage';
import ContrapesosPage from './pages/ContrapesosPage';
import ProyectosPage from './pages/ProyectosPage';
import NosotrosPage from './pages/NosotrosPage';
import CotizarPage from './pages/CotizarPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipamiento" element={<EquipamientoPage />} />
          <Route path="/equipamiento/elevadores" element={<ElevadoresPage />} />
          <Route path="/equipamiento/alineadores" element={<AlineadoresPage />} />
          <Route path="/equipamiento/desmontadoras" element={<DesmontadorasPage />} />
          <Route path="/equipamiento/lubricacion" element={<LubricacionPage />} />
          <Route path="/equipamiento/redes" element={<RedesPage />} />
          <Route path="/consumibles" element={<ConsumiblesPage />} />
          <Route path="/consumibles/contrapesos" element={<ContrapesosPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/cotizar" element={<CotizarPage />} />

          {/* Redirecciones permanentes */}
          <Route path="/contrapesos" element={<Navigate to="/consumibles/contrapesos" replace />} />
          <Route path="/aplicaciones" element={<Navigate to="/consumibles/contrapesos" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
