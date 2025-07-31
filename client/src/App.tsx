import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css'; // Assuming you have a global CSS file for styles
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Route principale /login */}
      <Route path="/login" element={<Login />} />

      {/* Route par défaut : toute autre route redirige vers /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;