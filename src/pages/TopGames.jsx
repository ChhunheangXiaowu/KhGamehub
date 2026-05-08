import { useState } from 'react';
import gamesData from '../data/games.json';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const TopGames = () => {
  const topGames = gamesData
    .filter(item => item.type === 'game')
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 50);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const paginated = topGames.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="container main">
      <h2 style={{ margin: '20px 0', fontSize: '28px' }}>Top 50 Most Downloaded PC Games</h2>
      <div className="cards-grid">
        {paginated.map(game => <GameCard key={game.id} game={game} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(topGames.length / perPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TopGames;