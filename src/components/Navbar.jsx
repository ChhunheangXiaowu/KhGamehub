import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gamesData from '../data/games.json';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  
  const { favorites } = useFavorites();
  const favCount = favorites.length;

  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('gamehub_theme');
    return saved === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-mode');
      localStorage.setItem('gamehub_theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('gamehub_theme', 'dark');
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight(!isLight);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const allGenres = gamesData
    ? [...new Set(gamesData.flatMap(item => item.genre || []))]
    : [];

  // Submit search
  const handleSearch = () => {
    if(searchText.trim()){
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
      setSearchText('');
      setShowSearchModal(false);
      scrollToTop();
    }
  };

  // Close modal when click outside
  const closeModal = (e) => {
    if(e.target.id === 'searchOverlay'){
      setShowSearchModal(false);
    }
  };

  // CLEAR SEARCH TEXT
  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" className="logo" onClick={scrollToTop}>GameHub</Link>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            
            <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/" onClick={scrollToTop}>Home</Link>
              <Link to="/top-games" onClick={scrollToTop}>Top Games</Link>
              <Link to="/top-software" onClick={scrollToTop}>Software</Link>
              <Link to="/recently-updated" onClick={scrollToTop}>Recent</Link>

              <Link to="/favorites" onClick={scrollToTop} className="fav-nav-link">
                ❤️
                {favCount > 0 && <span className="fav-badge">{favCount}</span>}
              </Link>

              <div className="genre-dropdown"
                onMouseEnter={() => setShowGenres(true)}
                onMouseLeave={() => setShowGenres(false)}
              >
                <button className="genre-button">Genres ▾</button>
                {showGenres && (
                  <div className="genre-menu">
                    {allGenres.map((g, i) => (
                      <div key={i} onClick={() => {
                        navigate(`/genre/${g}`);
                        setShowGenres(false);
                        scrollToTop();
                      }}>
                        {g}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 🔍 SEARCH ICON - NOW NEXT TO DARK/LIGHT MODE */}
            <button 
              onClick={() => setShowSearchModal(true)}
              style={{
                background:'transparent',
                border:'none',
                color:'var(--text-color)',
                fontSize:'20px',
                cursor:'pointer'
              }}
            >
              🔍
            </button>

            {/* DARK / LIGHT MODE */}
            <div className="theme-toggle" onClick={toggleTheme}>
              {isLight ? '🌙' : '☀️'}
            </div>
          </div>
        </div>
      </nav>

      {/* 🔎 SEARCH MODAL OVERLAY + POPUP */}
      {showSearchModal && (
        <div 
          id="searchOverlay"
          onClick={closeModal}
          style={{
            position:'fixed',
            inset:0,
            background:'rgba(0,0,0,0.7)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:9999,
            padding:'20px'
          }}
        >
          <div style={{
            width:'100%',
            maxWidth:'600px',
            background:'var(--dark-card)',
            padding:'30px',
            borderRadius:'16px',
            position:'relative',
            border:'1px solid var(--glass-border)'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowSearchModal(false)}
              style={{
                position:'absolute',
                top:'15px',
                right:'20px',
                background:'transparent',
                border:'none',
                color:'var(--text-color)',
                fontSize:'22px',
                cursor:'pointer'
              }}
            >
              ×
            </button>

            <h3 style={{margin:'0 0 20px 0', textAlign:'center'}}>Search Games</h3>

            {/* SEARCH INPUT WITH CLEAR BUTTON */}
            <div style={{ position:'relative' }}>
              <input
                type="text"
                placeholder="Type game name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                autoFocus
                style={{
                  width:'100%',
                  padding:'15px 45px 15px 20px',
                  borderRadius:'10px',
                  background:'var(--bg)',
                  border:'1px solid var(--glass-border)',
                  color:'var(--text-color)',
                  fontSize:'16px',
                  outline:'none'
                }}
              />

              {/* CLEAR BUTTON */}
              {searchText && (
                <button
                  onClick={clearSearch}
                  style={{
                    position:'absolute',
                    right:'15px',
                    top:'50%',
                    transform:'translateY(-50%)',
                    background:'transparent',
                    border:'none',
                    color:'var(--text-color)',
                    fontSize:'18px',
                    cursor:'pointer',
                    opacity:0.7
                  }}
                >
                  ❌
                </button>
              )}
            </div>

            <button
              onClick={handleSearch}
              style={{
                width:'100%',
                marginTop:'15px',
                padding:'14px',
                borderRadius:'10px',
                border:'none',
                background:'var(--primary)',
                color:'#fff',
                fontSize:'16px',
                cursor:'pointer'
              }}
            >
              🔍 Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;