import { useFavorites } from '../context/FavoritesContext';
import GameCard from '../components/GameCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container main">
      <h1 style={{ marginBottom: '30px' }}>My Favorites</h1>

      {favorites.length === 0 ? (
        <p style={{ fontSize: '18px', color: '#999' }}>
          You haven't added any favorites yet. Browse games/software and click the heart icon to save them!
        </p>
      ) : (
        <div className="cards-grid">
          {favorites.map(item => (
            <GameCard key={item.id} game={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;