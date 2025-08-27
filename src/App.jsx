import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthForm from './components/AuthForm/AuthForm';
import Sidebar from './components/Sidebar/Sidebar';
import MainRoute from './routes/MainRoute';
import Navbar from './Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import './App.css';

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
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;