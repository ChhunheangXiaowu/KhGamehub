import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gamesData from '../data/games.json';
import GameCard from '../components/GameCard';
import { useFavorites } from '../context/FavoritesContext';

const GameDetail = () => {
  const { slug } = useParams();

  // 🔑 Find game by SLUG (from title), NOT by ID
  const game = gamesData.find(g => {
    const gameSlug = g.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    return gameSlug === slug;
  });

  const [lightboxImage, setLightboxImage] = useState(null);
  const [copied, setCopied] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = game ? isFavorite(game.id) : false;

  // ❌ If not found → go home
  if (!game) {
    return <Navigate to="/" replace />;
  }

  const currentUrl = window.location.href;

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareFb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const shareTw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(game.title)}&url=${encodeURIComponent(currentUrl)}`;

  const relatedItems = gamesData
    .filter(item => item.id !== game.id && item.genre.some(g => game.genre.includes(g)))
    .slice(0, 4);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="container main">
      <Helmet>
        <title>{game.title} - Free PC Game Download | GameHub</title>
        <meta name="description" content={`${game.title} free PC game download. View system requirements, screenshots, trailer and torrent repack.`} />
      </Helmet>

      <div style={{ position: 'relative' }}>
        <img src={game.image} alt={game.title} className="detail-banner" />
        <button className="detail-fav-btn" onClick={() => toggleFavorite(game)}>
          {isFav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
      
      <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>{game.title}</h1>
      
      <div className="badge-list">
        {game.genre.map((tag, i) => (
          <span key={i} className="badge">{tag}</span>
        ))}
      </div>

      <div className="info-block">
        <h2>Description</h2>
        <p dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>

      <div className="info-block">
        <h2>Minimum System Requirements</h2>
        {Object.entries(game.minRequirements).map(([k, v]) => (
          <p key={k}><strong>{k.toUpperCase()}:</strong> {v}</p>
        ))}
      </div>

      {game.trailer && (
        <>
          <h2 style={{ margin: '20px 0 10px' }}>Gameplay Trailer</h2>
          <iframe className="trailer-frame" src={game.trailer} allowFullScreen></iframe>
        </>
      )}

      <div className="screenshots-section">
        <h2>Game Screenshots</h2>
        <div className="screenshots-grid">
          {game.screenshots.slice(0, 4).map((src, i) => (
            <img 
              key={i} 
              src={src} 
              alt={`Screenshot ${i+1}`} 
              className="screenshot-img" 
              onClick={() => setLightboxImage(src)}
            />
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div className="lightbox-overlay active" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImage(null)}>×</button>
          <img src={lightboxImage} alt="Fullscreen" className="lightbox-image" />
        </div>
      )}

      <a href={game.torrentLink} target="_blank" rel="noopener noreferrer">
        <button className="download-btn">Download via uTorrent</button>
      </a>

      {relatedItems.length > 0 && (
        <div style={{ marginTop: '60px' }} onClick={scrollToTop}>
          <h2 style={{ marginBottom: '20px', fontSize: '26px' }}>You May Also Like</h2>
          <div className="cards-grid">
            {relatedItems.map(item => (
              <GameCard key={item.id} game={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetail;