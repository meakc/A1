// ClientsSection.js
import React from 'react';
import './ClientsSection.css'; // We'll create this CSS file next
import img1 from '../image/simg1.png';
import img2 from '../image/simg2.png';
import img3 from '../image/simg3.png';
import img4 from '../image/simg4.png';
const ClientsSection = () => {
  const clients = [
    { id: 1, logo: img1, alt: 'Client 1' },
    { id: 2, logo: img2, alt: 'Client 2' },
    { id: 3, logo: img3, alt: 'Client 3' },
    { id: 4, logo: img4, alt: 'Client 4' },
    // Add more client logos as needed
  ];

  return (
    <div className="clients-section">
      <div className="marquee">
        <div className="marquee-content">
          {clients.concat(clients).map((client) => (
            <img key={client.id} src={client.logo} alt={client.alt} className="client-logo" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;