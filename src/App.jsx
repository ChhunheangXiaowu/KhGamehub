import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  // MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Blocks phones + small tablets (width < 768px)
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IF MOBILE → SHOW BLOCK SCREEN
  if (isMobile) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0f0f0f',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999999
      }}>
        <h1>🔒 Desktop Only</h1>
        <p style={{ fontSize: '18px', marginTop: '12px', opacity: 0.8 }}>
          This website is only accessible on desktop devices.
        </p>
        <p style={{ fontSize: '14px', marginTop: '6px', opacity: 0.6 }}>
          Please open it on your computer.
        </p>
      </div>
    );
  }

  // NORMAL APP FOR DESKTOP
  return (
    <HelmetProvider>
      <FavoritesProvider>
        <Router>
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
        </Router>
      </FavoritesProvider>
    </HelmetProvider>
  );
}

export default App;