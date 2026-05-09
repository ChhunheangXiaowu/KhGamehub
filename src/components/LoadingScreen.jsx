const LoadingScreen = () => {
  return (
    <div style={loaderOverlay}>
      <div style={loaderSpinner}></div>
      <p style={loaderText}>Loading, please wait...</p>
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
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999999,
};

const loaderSpinner = {
  width: '50px',
  height: '50px',
  border: '5px solid #333',
  borderTop: '5px solid #7c3aed',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const loaderText = {
  color: '#fff',
  marginTop: '20px',
  fontSize: '16px',
};

export default LoadingScreen;