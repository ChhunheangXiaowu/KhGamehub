const AboutUs = () => {
  return (
    <div className="container main">
      <h1 style={{marginBottom:'20px'}}>About Us</h1>
      <div style={{lineHeight:'1.8',fontSize:'16px'}}>
        <p>Welcome to GameHub — your best place to find free PC Games and Software.</p>

        <h3 style={{marginTop:'30px'}}>Our Mission</h3>
        <p>We aim to provide a simple, fast and clean platform for users to find games and software easily without annoying ads.</p>

        <h3 style={{marginTop:'30px'}}>What We Offer</h3>
        <ul>
          <li>Free PC Games Collection</li>
          <li>Useful Software Tools</li>
          <li>Simple clean design</li>
          <li>Fast browsing and search system</li>
        </ul>

        <h3 style={{marginTop:'30px'}}>Note</h3>
        <p>All files are shared by community users. We do not host any files on our server.</p>
      </div>
    </div>
  );
};

export default AboutUs;