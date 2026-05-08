import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const GameCarousel = ({ games }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carouselGames = games.slice(0, 10);

  return (
    <div className="mb-10">
      <Slider {...settings}>
        {carouselGames.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <div className="relative h-[500px]">
              <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
                <h2 className="text-3xl font-bold">{game.title}</h2>
                <div className="flex gap-2 mt-2">
                  {game.genre.map((tag, i) => (
                    <span key={i} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default GameCarousel;