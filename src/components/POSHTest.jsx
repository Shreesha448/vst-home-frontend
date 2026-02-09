import React from "react";
import "../styles/CenterPanel.css";

const POSHTest = () => {
  const BACKEND_URL = "http://13.127.8.58:5000";

  return (
    <div className="posh-test-page" style={{ padding: 12 }}>
      <h2>POSH Test</h2>
      <p>
        This page contains the POSH Test. You can open the test PDF in a new
        tab or return to the main feed.
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          className="training-button posh-test-button"
          onClick={() => window.open(`${BACKEND_URL}/POSH_Test.pdf`, "_blank")}
        >
          Open POSH Test (PDF)
        </button>

        <button
          className="training-button"
          onClick={() => {
            // go back to main center content
            if (window.history && window.history.pushState) {
              window.history.pushState({}, "", window.location.pathname + window.location.search);
            }
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default POSHTest;
