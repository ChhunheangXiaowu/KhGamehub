import { useSearchParams } from 'react-router-dom';
import gamesData from '../data/games.json';

export const useGameFilter = () => {
  const [searchParams] = useSearchParams();

  const genre = searchParams.get('genre');
  const year = searchParams.get('year');
  const sort = searchParams.get('sort');
  const type = searchParams.get('type');

  let filtered = [...gamesData];

  // Filter by Type (Game / Software)
  if (type) {
    filtered = filtered.filter(g => g.type === type);
  }

  // Filter by Genre
  if (genre) {
    filtered = filtered.filter(g => g.genre.includes(genre));
  }

  // Filter by Year
  if (year) {
    filtered = filtered.filter(g => new Date(g.releaseDate).getFullYear() === Number(year));
  }

  // Sort
  if (sort === 'newest') {
    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }

  return filtered;
};