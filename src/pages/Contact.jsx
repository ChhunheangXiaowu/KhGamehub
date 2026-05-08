const Contact = () => {
  return (
    <div className="container main">
      <h1 style={{marginBottom:'20px'}}>Contact Us</h1>
      <div style={{lineHeight:'1.8',fontSize:'16px'}}>
        <p>If you have any questions, DMCA request, feedback or suggestion, you can contact us via email.</p>

        <h3 style={{marginTop:'30px'}}>Email</h3>
        <p>chhunheangxiaowu@gmail.com</p>

        <h3 style={{marginTop:'30px'}}>Working Time</h3>
        <p>We reply within 24–48 hours.</p>

        <h3 style={{marginTop:'30px'}}>Contact Reason</h3>
        <ul>
          <li>DMCA Copyright Removal</li>
          <li>Website Feedback</li>
          <li>Bug Report</li>
          <li>General Inquiry</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;