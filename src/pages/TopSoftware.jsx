import { useState } from 'react';
import gamesData from '../data/games.json';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const TopSoftware = () => {
  const topSoftware = gamesData
    .filter(item => item.type === 'software')
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 50);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const paginated = topSoftware.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="container main">
      <h2 style={{ margin: '20px 0', fontSize: '28px' }}>Top 50 Most Downloaded Software</h2>
      <div className="cards-grid">
        {paginated.map(item => <GameCard key={item.id} game={item} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(topSoftware.length / perPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TopSoftware;