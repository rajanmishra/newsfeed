// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };
    
    const isTokenValid = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
        return false;
    }
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
    };

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const token = Cookies.get('auth_token');
                if(token && isTokenValid(token)){
                    const user = localStorage.getItem('user');
                    setUser(JSON.parse(user));
                }
            } catch (error) {
                localStorage.removeItem('user');
                localStorage.removeItem('preferences');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUserLoggedIn();
    }, []);


    const login = async (email, password) => {
        try {
            const token = await axios.post('api/auth/login', { email, password });
            Cookies.set('auth_token', token.data?.data?.access_token, { expires: .10 });
            const response = await axios.post('/api/auth/profile')
            setUser(response.data?.data);
            localStorage.setItem('user', JSON.stringify(response.data?.data));
            return Promise.resolve();
        } catch (error) {
            console.error('Login failed:', error);
            return Promise.reject(error);
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post('/api/auth/register', { name, email, password })
            return Promise.resolve();
        } catch (error) {
            console.error('Registration failed:', error);
            return Promise.reject(error);
        }
    };

    const preferences = async () => {
        try {
            let response = localStorage.getItem('preferences');
            if(response){
                return Promise.resolve(JSON.parse(response));
            }
            response = await axios.get('/api/user/preferences')
            localStorage.setItem('preferences', JSON.stringify(response));
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('preferences');
        setUser(null);
        await axios.post('/api/auth/logout');
        Cookies.remove('auth_token');
    };


    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, preferences }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
