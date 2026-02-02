import { useEffect, useState } from "react";
import logo from "../assets/VST-Logo.png";
import "../styles/Header.css";

function Header() {
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("Fetching...");
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const town = data?.address?.town || data?.address?.city || data?.address?.village || "";
          const state = data?.address?.state || "";
          if (town && state) {
            setLocation(`${town}, ${state}`);
          } else {
            setLocation(town || state || "Unknown");
          }
        } catch (err) {
          setLocation("Location unavailable");
        }
      });
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <header className="header">
      {/* Left side - Logo */}
      <div className="logo">
        <img src={logo} alt="VentureSoft Logo" />
      </div>

      {/* Center - Brand Title */}
      <div className="header-brand">
        <h1>
          <span className="brand-venture">Venture</span>
          <span className="brand-soft">Soft</span>
          <span className="brand-dash">-</span>
          <span className="brand-intrasite">IntraNet</span>
        </h1>
      </div>

      {/* Right side - User Button and Date/Time */}
      <div className="header-info">
        <button 
          className="user-button"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="user-avatar">
            <span>👤</span>
          </div>
          <span className="user-button-text">User</span>
        </button>

        {/* Date/Time inside header */}
        <div className="header-datetime">
          <div className="info-box date-box">
            <span>📅 {dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="info-box time-box">
            <span>🕐 {dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* User Dropdown Menu */}
        {showUserMenu && (
          <div className="user-dropdown">
            <div className="user-dropdown-header">
              <div className="user-avatar">
                <span>👤</span>
              </div>
              <div className="user-info">
                <span className="user-name">Guest User</span>
              </div>
            </div>
            <div className="user-dropdown-actions">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item logout-btn">Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
