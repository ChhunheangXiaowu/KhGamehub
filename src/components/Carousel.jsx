import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ games }) => {
  const [current, setCurrent] = useState(0);
  const carouselGames = games.slice(0, 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselGames.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselGames.length]);

  return (
    <div className="carousel">
      {carouselGames.map((game, idx) => (
        <Link 
          to={`/game/${game.id}`} 
          key={game.id}
          className={`carousel-slide ${idx === current ? 'active' : ''}`}
        >
          <img src={game.image} alt={game.title} />
          <div className="carousel-overlay">
            <h2>{game.title}</h2>
            <div className="badge-list">
              {game.genre.map((tag, i) => (
                <span key={i} className="badge">{tag}</span>
              ))}
            </div>
            <p style={{color:'#b0b0c3'}}>Release Date: {game.releaseDate}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Carousel;