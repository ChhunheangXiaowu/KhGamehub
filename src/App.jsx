import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TopGames from './pages/TopGames';
import TopSoftware from './pages/TopSoftware';
import RecentlyUpdated from './pages/RecentlyUpdated';
import GameDetail from './pages/GameDetail';
import GenrePage from './pages/GenrePage';
import DMCA from './pages/DMCA';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchPage from './pages/SearchPage';
import LoadingScreen from './components/LoadingScreen';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // REAL LOAD: hides when page is fully ready
    const handleLoad = () => setLoading(false);
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [location.pathname]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-games" element={<TopGames />} />
        <Route path="/top-software" element={<TopSoftware />} />
        <Route path="/recently-updated" element={<RecentlyUpdated />} />
        <Route path="/game/:slug" element={<GameDetail />} />
        <Route path="/software/:slug" element={<GameDetail />} />
        <Route path="/genre/:genreName" element={<GenrePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dmca" element={<DMCA />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile block
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable right click + F12
  useEffect(() => {
    const blockContext = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    };
    window.addEventListener('contextmenu', blockContext);
    window.addEventListener('keydown', blockKeys);
    return () => {
      window.removeEventListener('contextmenu', blockContext);
      window.removeEventListener('keydown', blockKeys);
    };
  }, []);

  // Mobile screen
  if (isMobile) {
    return (
      <div style={{
        width: '100vw', height: '100vh', backgroundColor: '#0f0f0f', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', position: 'fixed', top: 0, left: 0, zIndex: 999999
      }}>
        <h2>🔒 DESKTOP ONLY</h2>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <FavoritesProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritesProvider>
    </HelmetProvider>
  );
}

export default App;