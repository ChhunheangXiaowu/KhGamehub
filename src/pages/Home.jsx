import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/FilterSidebar';
import gamesData from '../data/games.json';

const PAGE_SIZE = 6;

const Home = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // ✅ FIXED: FILTER & SORT ALL GAMES (NO BROKEN HOOK)
  const filteredGames = (() => {
    const genre = searchParams.get('genre');
    const year = searchParams.get('year');
    const type = searchParams.get('type');
    const sort = searchParams.get('sort');

    // START WITH ALL GAMES
    let result = [...gamesData];

    // 1. FILTER TYPE
    if (type) {
      result = result.filter(g => g.type === type);
    }

    // 2. FILTER GENRE
    if (genre) {
      result = result.filter(g => g.genre.includes(genre));
    }

    // 3. FILTER YEAR (from releaseDate DD-MM-YYYY)
    if (year) {
      result = result.filter(g => {
        if (!g.releaseDate) return false;
        const parts = g.releaseDate.split('-');
        return parts[2] === year;
      });
    }

    // 4. SORT ALL GAMES (FIXED: WORKS FOR EVERY GAME)
    if (sort === 'newest') {
      result.sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate.split('-').reverse().join('-')) : new Date(0);
        const dateB = b.releaseDate ? new Date(b.releaseDate.split('-').reverse().join('-')) : new Date(0);
        return dateB - dateA;
      });
    } else if (sort === 'oldest') {
      result.sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate.split('-').reverse().join('-')) : new Date(0);
        const dateB = b.releaseDate ? new Date(b.releaseDate.split('-').reverse().join('-')) : new Date(0);
        return dateA - dateB;
      });
    }

    return result;
  })();

  const [featured, setFeatured] = useState([]);

  const trendingGames = [...gamesData]
    .sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate.split('-').reverse().join('-')) : new Date(0);
      const dateB = b.releaseDate ? new Date(b.releaseDate.split('-').reverse().join('-')) : new Date(0);
      return dateB - dateA;
    })
    .slice(0, 8);

  const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    setFeatured(gamesData.slice(0, 5));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container main">
      <Helmet>
        <title>GameHub - Download Free PC Games & Software</title>
        <meta name="description" content="Download free PC games, repacks, torrent games with system requirements and trailers." />
      </Helmet>

      {featured.length > 0 && (
        <div className="carousel">
          {featured.map((item, i) => (
            <div
              key={i}
              className={`carousel-slide ${i === 0 ? 'active' : ''}`}
              onClick={scrollToTop}
            >
              <img src={item.image} alt={item.title} />
              <div className="carousel-overlay">
                <h2>{item.title}</h2>
                <div className="badge-list">
                  {item.genre.map((g, j) => (
                    <span key={j} className="badge">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ fontSize: '26px', marginBottom: '20px' }}>🔥 Trending Now</h2>
      <div className="cards-grid" onClick={scrollToTop}>
        {trendingGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <h2 style={{ fontSize: '26px', margin: '60px 0 20px' }}>All Games & Software</h2>
      
      <div className="page-grid">
        <FilterSidebar />
        <div>
          <div className="cards-grid">
            {paginatedGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            baseUrl="/" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;