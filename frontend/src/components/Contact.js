import React from 'react';

const Contact = () => {
  const handleEmailClick = () => {
    window.open('https://gmail.com', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:401-309-5655', '_self');
  };

  return (
    <div className="container">
      <div className="contact-info" style={{ maxWidth: 600, margin: '0 auto', marginTop: 40 }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '30px', fontWeight: 700, fontSize: 32, textAlign: 'center' }}>Contact Us</h1>
        <div className="card" style={{ padding: 32, borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #e3e3e3' }}>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <h2 style={{ color: '#007bff', marginBottom: '20px', fontWeight: 600, fontSize: 24 }}>
              Kali Consulting LLC
            </h2>
            <div className="contact-item" style={{ margin: '18px 0', fontSize: 18 }}>
              <strong>Email:</strong>
              <br />
              <a 
                href="mailto:DevyRuxpin@gmail.com" 
                className="contact-link"
                onClick={handleEmailClick}
                style={{ fontSize: '1.2rem', color: '#007bff', textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                DevyRuxpin@gmail.com
              </a>
            </div>
            <div className="contact-item" style={{ margin: '18px 0', fontSize: 18 }}>
              <strong>Phone:</strong>
              <br />
              <a 
                href="tel:401-309-5655" 
                className="contact-link"
                onClick={handlePhoneClick}
                style={{ fontSize: '1.2rem', color: '#007bff', textDecoration: 'underline' }}
              >
                401-309-5655
              </a>
            </div>
            <div className="contact-item" style={{ margin: '18px 0', fontSize: 18 }}>
              <strong>Business Hours:</strong>
              <br />
              <span style={{ color: '#6c757d' }}>
                Monday - Friday: 9:00 AM - 6:00 PM EST
              </span>
            </div>
            <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontWeight: 600, fontSize: 20 }}>
                Get in Touch
              </h3>
              <p style={{ color: '#6c757d', lineHeight: '1.6', fontSize: 16 }}>
                We're here to help with your web development needs.<br />
                Whether you have questions about our services or want to discuss a project, feel free to reach out via email or phone.
              </p>
            </div>
            <div style={{ marginTop: '20px', padding: '15px', background: '#e9ecef', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#6c757d', fontSize: '0.95rem' }}>
                <strong>Note:</strong> Clicking the email link will open Gmail in a new tab.<br />
                Clicking the phone number will initiate a call if your device supports it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 