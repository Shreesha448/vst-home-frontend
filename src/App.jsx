import React from "react";
import HomePage from "./components/HomePage";
import MockLogin from "./components/MockLogin";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import "./App.css";

const AuthGate = () => {
  const { user } = useAuth();

  // If logged in → show HomePage
  if (user) {
    return <HomePage />;
  }

  // Else → show Login
  return <MockLogin />;
};

function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

export default App;
