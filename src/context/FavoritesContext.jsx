import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage on initial load
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('gamehub_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gamehub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add/remove favorite
  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const isFav = prev.some(fav => fav.id === item.id);
      if (isFav) {
        return prev.filter(fav => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Check if item is favorite
  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use favorites
export const useFavorites = () => useContext(FavoritesContext);