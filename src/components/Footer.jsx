import { Link } from 'react-router-dom';

const Footer = () => {
  // Scroll to top when click footer link
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/top-games" onClick={scrollToTop}>Top PC Games</Link></li>
            <li><Link to="/top-software" onClick={scrollToTop}>Top Software</Link></li>
            <li><Link to="/recently-updated" onClick={scrollToTop}>Recently Updated</Link></li>
          </ul>
        </div>

        <div className="footer-col">
  <h3>Legal</h3>
  <ul>
    <li><Link to="/dmca" onClick={scrollToTop}>DMCA</Link></li>
    <li><Link to="/privacy-policy" onClick={scrollToTop}>Privacy Policy</Link></li>
    <li><Link to="/terms-of-service" onClick={scrollToTop}>Terms of Service</Link></li>
  </ul>
</div>

<div className="footer-col">
  <h3>About</h3>
  <ul>
    <li><Link to="/about-us" onClick={scrollToTop}>About Us</Link></li>
    <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
  </ul>
</div>

      </div>

      <div className="container footer-bottom">
        © 2025 GameHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;