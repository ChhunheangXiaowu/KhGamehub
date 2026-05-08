import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/FilterSidebar';
import gamesData from '../data/games.json';

const PAGE_SIZE = 6;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);
  const page = Number(searchParams.get('page')) || 1;

  // Get all filters
  const genre = searchParams.get('genre');
  const year = searchParams.get('year');
  const sort = searchParams.get('sort');
  const type = searchParams.get('type');

  // Sync input with URL
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const doSearch = () => {
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery, page: '1' });
    }
  };

  // Clear search
  const clearSearch = () => {
    setLocalQuery('');
    setSearchParams({});
  };

  // ✅ FULL FILTER LOGIC (Search + Type + Genre + Year + Sort)
  let results = [...gamesData].filter(game => {
    // Search query
    if (query && !game.title.toLowerCase().includes(query.toLowerCase()))
      return false;

    // Type filter (Game / Software)
    if (type && game.type !== type)
      return false;

    // Genre filter
    if (genre && !game.genre.includes(genre))
      return false;

    // Year filter
    if (year) {
      const releaseYear = new Date(game.releaseDate).getFullYear();
      if (releaseYear !== Number(year)) return false;
    }

    return true;
  });

  // Sorting
  if (sort === 'newest') {
    results.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sort === 'oldest') {
    results.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }

  // Pagination
  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedResults = results.slice(start, start + PAGE_SIZE);

  return (
    <div className="container main">
      <Helmet>
        <title>{query ? `${query} - Search Results | GameHub` : 'Search Games | GameHub'}</title>
        <meta name="description" content={`Search results for ${query} - Download free PC games`} />
      </Helmet>

      <h1 style={{ marginBottom: '20px' }}>
        {query ? `Search Results: "${query}"` : 'Search Games'}
      </h1>

      {/* Search Input With Clear Button */}
      <div style={{ marginBottom: '30px', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search game title..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && doSearch()}
          style={{
            width: '100%',
            padding: '14px 50px 14px 18px',
            borderRadius: '12px',
            background: 'var(--dark-card)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-color)',
            fontSize: '16px',
            outline: 'none',
          }}
        />

        {localQuery && (
          <button
            onClick={clearSearch}
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-color)',
              fontSize: '18px',
              cursor: 'pointer',
              opacity: 0.7,
            }}
          >
            ❌
          </button>
        )}
      </div>

      <p style={{ opacity: 0.7, marginBottom: '20px' }}>
        {results.length} results found
      </p>

      <div className="page-grid">
        <FilterSidebar />
        <div>
          {paginatedResults.length > 0 ? (
            <div className="cards-grid">
              {paginatedResults.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '18px', opacity: 0.7 }}>
              No games found.
            </p>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl={`/search?q=${query}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;