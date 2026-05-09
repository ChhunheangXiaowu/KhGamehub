import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import gamesData from '../data/games.json';

const GameDetail = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const found = gamesData.find((g) =>
      g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
    );
    setGame(found);
  }, [slug]);

  if (!game) return (
    <div style={{ color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
      Game Not Found
    </div>
  );

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff' }}>

      {/* HEADER BANNER */}
      <div style={{
        width: '100%',
        height: '320px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), #0b0b0b), url(${game.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '30px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <img
            src={game.image}
            alt={game.title}
            style={{ width: '180px', borderRadius: '12px', boxShadow: '0 8px 24px #000' }}
          />
          <div>
            <h1 style={{ fontSize: '36px', margin: '0 0 8px' }}>{game.title}</h1>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {game.genre.map((g, i) => (
                <span key={i} style={{
                  background: '#7c3aed',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px' }}>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>About This Game</h2>
          <p style={{ lineHeight: '1.7', opacity: '0.85' }}>
            {game.description || 'No description available.'}
          </p>
        </div>

        <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Downloads</h2>

        {/* BASE GAME */}
        <div style={{
          background: '#151515',
          border: '1px solid #222',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '19px' }}>📥 Base Game</h3>
          <a
            href={game.downloadLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#22c55e',
              color: '#000',
              fontWeight: '600',
              padding: '11px 26px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Download Base Game
          </a>
        </div>

        {/* MULTIPLE UPDATES */}
        {game.updates && game.updates.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '19px', marginBottom: '15px' }}>🔧 Updates / Patches</h3>

            {game.updates.map((update, index) => (
              <div
                key={index}
                style={{
                  background: '#151515',
                  border: '1px solid #222',
                  borderRadius: '12px',
                  padding: '20px 25px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: '500' }}>
                  {update.name}
                </span>
                <a
                  href={update.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#3b82f6',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default GameDetail;