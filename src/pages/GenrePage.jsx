import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/FilterSidebar';
import { useGameFilter } from '../hooks/useGameFilter'; // ✅ USE YOUR FILTER HOOK

const PAGE_SIZE = 6;

const GenrePage = () => {
  const { genreName } = useParams();
  const allFiltered = useGameFilter(); // ✅ GET FILTERED DATA

  // ✅ ONLY SHOW ITEMS THAT MATCH THE PAGE GENRE
  const filtered = allFiltered.filter(game =>
    game.genre
      .map(g => g.toLowerCase())
      .includes(genreName.toLowerCase())
  );

  // Pagination
  const page = 1;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedGames = filtered.slice(0, PAGE_SIZE);

  return (
    <div className="container main">
      <Helmet>
        <title>{genreName} | GameHub</title>
      </Helmet>

      <h1 style={{ marginBottom: '20px' }}>{genreName}</h1>

      <div className="page-grid">
        <FilterSidebar />
        <div>
          <div className="cards-grid">
            {paginatedGames.length > 0 ? (
              paginatedGames.map(game => <GameCard key={game.id} game={game} />)
            ) : (
              <p>No games found</p>
            )}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl={`/genre/${genreName}`}
          />
        </div>
      </div>
    </div>
  );
};

export default GenrePage;