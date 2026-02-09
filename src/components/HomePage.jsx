import React, { useEffect, useState } from "react";
import Header from "./Header";
import LeftPanel from "./LeftPanel";
import CenterPanel from "./CenterPanel";
import RightPanel from "./RightPanel";
import POSHTest from "./POSHTest";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import "../App.css";

const HomePage = () => {
  // API base URL
  const API_BASE = "http://43.205.192.22:5000";

  useEffect(() => {
    // Fetch RSS data on component mount
    const fetchRSSData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/rss`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        console.log("RSS data:", data);
      } catch (err) {
        console.error("Failed to fetch RSS:", err);
      }
    };

    fetchRSSData();
  }, []);

  // Simple hash-based routing for the center panel (no react-router added)
  const [route, setRoute] = useState(window.location.hash || "");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
  <>
    {/* Header Section */}
    <Header />

    {/* Main Content Area */}
    <div className="homepage">
      <div className="app-container">
        
        {/* Left Panel - Navigation */}
        <aside className="left-panel">
          <LeftPanel />
        </aside>

        {/* Center Panel - Main Content */}
        <main className="center-panel">
          {route === "#/posh-test" ? <POSHTest /> : <CenterPanel />}
        </main>

        {/* Right Panel - Policies/Info */}
        <aside className="right-panel">
          <RightPanel />
        </aside>
      </div>
    </div>

    {/* Footer - Outside layout */}
    <footer className="footer">
      <Footer />
    </footer>

    {/* Back to Top Button */}
    <BackToTop />
  </>
);

};

export default HomePage;
