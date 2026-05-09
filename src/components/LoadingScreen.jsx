const LoadingScreen = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

const styles = {
  overlay: {
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
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #222',
    borderTop: '5px solid #7c3aed',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
  text: {
    color: '#fff',
    marginTop: '15px',
    fontSize: '16px',
  },
};

export default LoadingScreen;