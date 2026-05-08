const TermsOfService = () => {
  return (
    <div className="container main">
      <h1 style={{marginBottom:'20px'}}>Terms of Service</h1>
      <div style={{lineHeight:'1.8',fontSize:'16px'}}>
        <p>By using our website, you agree to the following terms.</p>

        <h3 style={{marginTop:'30px'}}>Use of Site</h3>
        <p>You may use this website only for personal and non-commercial use.</p>

        <h3 style={{marginTop:'30px'}}>User Content</h3>
        <p>All downloadable files are shared by users. We are not responsible for any content uploaded by users.</p>

        <h3 style={{marginTop:'30px'}}>Prohibited Actions</h3>
        <ul>
          <li>Do not upload illegal, harmful or copyrighted content</li>
          <li>Do not spam or attack the website</li>
          <li>Do not misuse our service</li>
        </ul>

        <h3 style={{marginTop:'30px'}}>Limitation of Liability</h3>
        <p>We are not responsible for any damage, data loss or problem caused by files downloaded from our site.</p>
      </div>
    </div>
  );
};

export default TermsOfService;  