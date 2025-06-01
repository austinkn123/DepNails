import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null); // Added accessToken state

    useEffect(() => {
        // Check for token in localStorage on initial load
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            setAccessToken(token); // Set accessToken from localStorage
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setAccessToken(token); 
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setUserData(null); // Clear accessToken on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}> {/* Added accessToken to context value*/}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
