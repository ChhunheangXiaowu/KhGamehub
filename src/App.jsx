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