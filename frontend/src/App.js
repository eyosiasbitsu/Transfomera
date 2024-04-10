// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import TechnicianHomePage from './pages/technician/TechnicianHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/technician/home" element={<TechnicianHomePage />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
