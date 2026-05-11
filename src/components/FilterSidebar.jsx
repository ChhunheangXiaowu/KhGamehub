import { useNavigate, useSearchParams } from 'react-router-dom';
import gamesData from '../data/games.json';

const FilterSidebar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const allGenres = [...new Set(gamesData.flatMap(g => g.genre))];

  // ✅ FIXED: Extract YEAR from DD-MM-YYYY (NO MORE NaN)
  const allYears = [...new Set(
    gamesData
      .map(g => {
        if (!g.releaseDate) return null;
        const parts = g.releaseDate.split('-');
        return parts[2] || null; // GET YEAR FROM LAST PART
      })
      .filter(y => y && !isNaN(y)) // REMOVE INVALID
  )].sort((a, b) => b - a);

  const currentGenre = searchParams.get('genre') || '';
  const currentYear = searchParams.get('year') || '';
  const currentSort = searchParams.get('sort') || 'default';
  const currentType = searchParams.get('type') || '';

  const applyFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1');
    navigate(`?${params.toString()}`);
  };

  const resetFilters = () => {
    navigate(window.location.pathname);
  };

  return (
    <div className="sidebar">
      <h3>Filters</h3>

      {/* Sort */}
      <div style={{marginBottom:'20px'}}>
        <p style={{marginBottom:'8px',fontWeight:'500'}}>Sort By</p>
        <select
          value={currentSort}
          onChange={(e)=>applyFilter('sort',e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'8px',background:'var(--dark-card)',border:'1px solid var(--glass-border)',color:'var(--text-color)'}}
        >
          <option value="default">Default</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Type Filter */}
      <div style={{marginBottom:'20px'}}>
        <p style={{marginBottom:'8px',fontWeight:'500'}}>Type</p>
        <div
          onClick={() => applyFilter('type', '')}
          style={{
            padding:'6px 10px',
            borderRadius:'8px',
            cursor:'pointer',
            marginBottom:'4px',
            background: currentType === '' ? 'var(--primary)' : 'transparent'
          }}
        >
          All
        </div>
        <div
          onClick={() => applyFilter('type', 'game')}
          style={{
            padding:'6px 10px',
            borderRadius:'8px',
            cursor:'pointer',
            marginBottom:'4px',
            background: currentType === 'game' ? 'var(--primary)' : 'transparent'
          }}
        >
          Game
        </div>
        <div
          onClick={() => applyFilter('type', 'software')}
          style={{
            padding:'6px 10px',
            borderRadius:'8px',
            cursor:'pointer',
            marginBottom:'4px',
            background: currentType === 'software' ? 'var(--primary)' : 'transparent'
          }}
        >
          Software
        </div>
      </div>

      {/* Genre Filter */}
      <div style={{marginBottom:'20px'}}>
        <p style={{marginBottom:'8px',fontWeight:'500'}}>Genre</p>
        {allGenres.map(g=>(
          <div
            key={g}
            onClick={()=>applyFilter('genre', currentGenre===g ? '' : g)}
            style={{
              padding:'6px 10px',
              borderRadius:'8px',
              cursor:'pointer',
              marginBottom:'4px',
              background: currentGenre===g ? 'var(--primary)' : 'transparent'
            }}
          >
            {g}
          </div>
        ))}
      </div>

      {/* Year Filter ✅ WORKING PERFECTLY */}
      <div style={{marginBottom:'20px'}}>
        <p style={{marginBottom:'8px',fontWeight:'500'}}>Release Year</p>
        
        <div
          onClick={() => applyFilter('year', '')}
          style={{
            padding:'6px 10px',
            borderRadius:'8px',
            cursor:'pointer',
            marginBottom:'4px',
            background: currentYear === '' ? 'var(--primary)' : 'transparent'
          }}
        >
          All
        </div>

        {allYears.map(y=>(
          <div
            key={y}
            onClick={()=>applyFilter('year', currentYear===String(y) ? '' : y)}
            style={{
              padding:'6px 10px',
              borderRadius:'8px',
              cursor:'pointer',
              marginBottom:'4px',
              background: currentYear===String(y) ? 'var(--primary)' : 'transparent'
            }}
          >
            {y}
          </div>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1px solid var(--glass-border)',background:'transparent',color:'var(--text-color)',cursor:'pointer'}}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;