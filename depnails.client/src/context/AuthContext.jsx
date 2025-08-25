import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUserProfile } from '../../queries/Auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    // Fetch user profile when authenticated
    const { userProfile: fetchedProfile, isLoading, error, refetch } = useUserProfile(isAuthenticated && !!idToken);

    useEffect(() => {
        // Check for tokens in localStorage on initial load
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedIdToken = localStorage.getItem('idToken');
        
        if (storedAccessToken && storedIdToken) {
            setIsAuthenticated(true);
            setAccessToken(storedAccessToken);
            setIdToken(storedIdToken);
        }
    }, []);

    useEffect(() => {
        // Update user profile when fetched
        if (fetchedProfile && !error) {
            setUserProfile(fetchedProfile);
        }
    }, [fetchedProfile, error]);

    const login = (authResponse) => {
        const { accessToken: newAccessToken, idToken: newIdToken } = authResponse;
        
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('idToken', newIdToken);
        
        setAccessToken(newAccessToken);
        setIdToken(newIdToken);
        setIsAuthenticated(true);
        
        // Trigger profile fetch
        if (newIdToken) {
            refetch();
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        setIsAuthenticated(false);
        setAccessToken(null);
        setIdToken(null);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            accessToken, 
            idToken,
            userProfile,
            isLoadingProfile: isLoading,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
