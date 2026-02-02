import React from "react";
import "../styles/LeftPanel.css";

const LeftPanel = () => {
  const links = [
    { title: "Home", url: "/" },
    { title: "HRMS", url: "https://venturesofttechhr.stratemis.com/" },
    { title: "IRONCLOUD", url: "https://venturesoft.ai/solutions/comprehensive-it-security-and-compliance-platform/" },
    { title: "Venturesoft.ai", url: "https://venturesoft.ai/" },
    { title: "Services", url: "https://venturesoft.ai/services" },
  ];

  const offices = [
    {
      name: "US ",
      address: "5000 Hopyard Rd Suite 120, Pleasanton, CA 94588",
      phone: "+1-925-935-5220"
    },
    {
      name: "UAE", 
      address: "Dubai South, A2, 4th Floor, Office No.20, Dubai, United Arab Emirates",
      phone: ""
    },
    {
      name: "INDIA",
      address: "Novel Tech Park, 1st floor 46/4, Garvebavi Palya, Electronic City, Bengaluru – 560068",
      phone: "+918041705135"
    }
  ];

  return (
    <div className="left-panel">
      <h3>Navigation</h3>
      {links.map((link, index) => (
        <div key={index} className="nav-item">
          <a 
            href={link.url} 
            {...(link.url.startsWith('/') ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {link.title}
          </a>
        </div>
      ))}
      
      <div className="locations-section">
        <h3>Office Locations</h3>
        {offices.map((office, index) => (
          <div key={index} className="office-item">
            <strong>{office.name}</strong>
            <span>{office.address}</span>
            {office.phone && <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`}>{office.phone}</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
