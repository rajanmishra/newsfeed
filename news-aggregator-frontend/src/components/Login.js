import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
        navigate('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('User not found.');
          } else if (error.response.status === 500) {
            setError('Server error. Please try again later.');
          } else {
            setError('An error occurred. Please try again.');
          }
        } else {
          setError('Network error. Please check your connection.');
        }
        console.error('Login error:', error);
      }
    };
  
    return (
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            { 
             error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              </div>
            }  
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;