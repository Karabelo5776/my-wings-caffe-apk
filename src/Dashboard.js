import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import NavBar from './NavBar';

function Dashboard({ currentUser, setCurrentUser }) {
  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <div className="dashboard">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="*" element={<Navigate to="products" />} />
        </Routes>
      </div>
      <footer>
        <button id="signout" onClick={handleSignOut}>Sign out</button>
      </footer>
    </div>
  );
}

export default Dashboard;