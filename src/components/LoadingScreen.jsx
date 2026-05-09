const LoadingScreen = () => {
  return (
    <div style={loaderOverlay}>
      <p style={loaderText}>Loading...</p>
    </div>
  );
};

const loaderOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#0f0f0f',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999999,
};

const loaderText = {
  color: '#fff',
  fontSize: '18px',
};

export default LoadingScreen;