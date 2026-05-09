import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GameCard = ({ game }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const detailPath = game.type === 'software' ? `/software/${slug}` : `/game/${slug}`;

  return (
    <Link
      to={detailPath}
      onClick={handleClick}
      style={{ textDecoration: 'none' }}
    >
      <div className="game-card">
        <LazyLoadImage
          src={game.image}
          alt={game.title}
          effect="blur"
          className="game-card-img"
          width="100%"
          height="190px"
        />
        <div className="game-card-body">
          <h3 className="game-card-title">{game.title}</h3>
          <div className="game-card-tags">
            {game.genre.slice(0, 2).map((g, i) => (
              <span key={i} className="game-card-tag">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;