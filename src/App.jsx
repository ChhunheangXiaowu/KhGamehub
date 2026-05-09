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

// WRAP ROUTES TO USE LOCATION (FIX BLACK SCREEN)
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
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

  // MOBILE CHECK
  useEffect(() => {
    const checkMobile = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // DISABLE RIGHT CLICK + F12
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // MOBILE BLOCK
  if (isMobile) {
    return (
      <div style={{
        width: '100vw', height: '100vh', backgroundColor: '#0f0f0f', color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px', textAlign: 'center', position: 'fixed', top: 0, left: 0, zIndex: 999999
      }}>
        <h1>🔒 Desktop Only</h1>
        <p style={{ fontSize: '18px', marginTop: '12px', opacity: 0.8 }}>
          This website is only accessible on desktop devices.
        </p>
      </div>
    );
  }

  // MAIN APP
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