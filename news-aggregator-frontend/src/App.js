import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NewsFeed from './components/NewsFeed';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ProfileDetail from './components/ProfileDetail';
import './App.css';

const App = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">News Aggregator</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Profile name={user.name} />
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-outline-light ms-2" onClick={logout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="flex-grow-1 container-fluid mt-5 pt-5">
          <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/profile"  element={user ?  <ProfileDetail /> : <Navigate to="/" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;