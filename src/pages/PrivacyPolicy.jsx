const PrivacyPolicy = () => {
  return (
    <div className="container main">
      <h1 style={{marginBottom:'20px'}}>Privacy Policy</h1>
      <div style={{lineHeight:'1.8',fontSize:'16px'}}>
        <p>Your privacy is very important to us. This policy explains how we collect, use and protect your information.</p>

        <h3 style={{marginTop:'30px'}}>Information We Collect</h3>
        <p>We do not collect personal data such as name, email or address. We only collect anonymous traffic data for website improvement.</p>

        <h3 style={{marginTop:'30px'}}>Cookies</h3>
        <p>Our website uses cookies to remember your theme preference (dark/light mode). No personal data is stored.</p>

        <h3 style={{marginTop:'30px'}}>Third Party</h3>
        <p>We do not share any user information with third parties.</p>

        <h3 style={{marginTop:'30px'}}>Policy Updates</h3>
        <p>We may update this privacy policy at any time without notice.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;