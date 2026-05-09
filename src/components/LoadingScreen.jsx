const LoadingScreen = () => {
  return (
    <div style={overlay}>
      <div style={dotLoader}>
        <div style={dot}></div>
        <div style={dot}></div>
        <div style={dot}></div>
      </div>
      <p style={text}>Loading</p>
    </div>
  );
};

const overlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: '#0f0f0f',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999999,
  gap: '16px',
};

const dotLoader = {
  display: 'flex',
  gap: '10px',
};

const dot = {
  width: '12px',
  height: '12px',
  backgroundColor: '#7c3aed',
  borderRadius: '50%',
  animation: 'pulse 0.8s infinite alternate',
};

const text = {
  color: '#ffffff',
  fontSize: '15px',
  letterSpacing: '1.5px',
  fontWeight: 400,
};

export default LoadingScreen;