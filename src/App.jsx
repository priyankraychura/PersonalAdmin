import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import Sidebar from './components/Sidebar/Sidebar';
import MainRoute from './routes/MainRoute';
import Navbar from './Navbar/Navbar';

function App() {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthForm />} />
        <Route path="/*" element={isLoggedIn ? (
          <>
            <Sidebar />
            <div className="main-content">
              <Navbar />
              <main className="dashboard-content">
                <MainRoute />
              </main>
            </div>
          </>
        ) : (
          <Navigate to="/" />
        )} />
      </Routes>
    </div>
  );
}

export default App;