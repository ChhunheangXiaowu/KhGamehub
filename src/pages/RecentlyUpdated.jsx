import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/FilterSidebar';
import { useGameFilter } from '../hooks/useGameFilter';

const PAGE_SIZE = 6;

const RecentlyUpdated = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const filteredGames = useGameFilter();

  const sortedRecent = [...filteredGames].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const totalPages = Math.ceil(sortedRecent.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedGames = sortedRecent.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="container main">
      <Helmet>
        <title>Recently Updated Games | GameHub</title>
        <meta name="description" content="Browse latest recently updated PC games on GameHub." />
      </Helmet>

      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Recently Updated Games</h1>

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
            baseUrl="/recently-updated"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentlyUpdated;