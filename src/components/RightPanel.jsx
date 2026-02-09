import React, { useEffect, useState } from "react";
import "../styles/RightPanel.css";

const RightPanel = () => {
  // ✅ BACKEND BASE URL (static files served from /public folder internally)
  const BACKEND_URL = "http://13.127.8.58:5000";

  // PDFs are natively viewable in browser (no viewer needed)

  return (
    <div className="right-panel">
      <div className="policy-list">
        <h3>Company Policies</h3>
        <button
          className="policy-item training-button policy-button"
          onClick={() => window.open(`${BACKEND_URL}/privacy_policy.pdf`, "_blank")}
        >
          <span className="training-text">Privacy Policy</span>
          <span className="training-type">PDF</span>
        </button>

        <button
          className="policy-item training-button policy-button"
          onClick={() => window.open(`${BACKEND_URL}/terms_of_service_updated.pdf`, "_blank")}
        >
          <span className="training-text">Terms of Service</span>
          <span className="training-type">PDF</span>
        </button>

        <button
          className="policy-item training-button policy-button"
          onClick={() => window.open(`${BACKEND_URL}/code_of_conduct.pdf`, "_blank")}
        >
          <span className="training-text">Code of Conduct</span>
          <span className="training-type">PDF</span>
        </button>

        <button
          className="policy-item training-button policy-button"
          onClick={() => window.open(`${BACKEND_URL}/leave_policy.pdf`, "_blank")}
        >
          <span className="training-text">Leave Policy</span>
          <span className="training-type">PDF</span>
        </button>
      </div>

      <div className="mandatory-tasks-section">
        <h3>Mandatory Training</h3>
        <div className="training-buttons">
          <button
            className="training-button posh-button"
            onClick={() => window.open(`${BACKEND_URL}/POSH_Training_material.pdf`, "_blank")}
          >
            <span className="training-text">POSH Training</span>
            <span className="training-type">PDF</span>
          </button>

          <button
            className="training-button security-button"
            onClick={() => window.open(`${BACKEND_URL}/Information%20Security%20training.pdf`, "_blank")}
          >
            <span className="training-text">Information Security Training</span>
            <span className="training-type">PDF</span>
          </button>

          <button
            className="training-button posh-test-button"
            onClick={() => {
              // navigate within the SPA to the POSH test page
              if (window.history && window.history.pushState) {
                window.history.pushState({}, "", "#/posh-test");
              } else {
                window.location.hash = "/posh-test";
              }
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }}
          >
            <span className="training-text">POSH Test</span>
            <span className="training-type">PAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
