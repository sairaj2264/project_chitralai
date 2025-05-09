import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate // Import Navigate if you want to redirect from "/"
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
// import './App.css'; // You can keep or remove this based on your needs

function App() {
  return (
    <Router>
      <Routes>
        {/* Option 1: Make LandingPage the default for "/" */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Option 2: Redirect "/" to "/landing" (if you prefer /landing as the explicit path) */}
        {/* <Route path="/" element={<Navigate replace to="/landing" />} /> */}
        {/* <Route path="/landing" element={<LandingPage />} /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        {/* You can add a 404 Not Found route here later */}
      </Routes>
    </Router>
  );
}

export default App;
