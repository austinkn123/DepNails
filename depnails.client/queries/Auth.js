import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/interceptor';
import { useAuth } from '../src/context/AuthContext'; // Import useAuth

export const loginUser = () => {
    const { login } = useAuth(); // Get login from useAuth
    return useMutation({
        mutationFn: async (loginData) => {
            const response = await axiosInstance({
                url: '/Auth/login', 
                method: 'POST',
                data: loginData, 
            });
            return response.data;
        },
        onSuccess: (data) => {
            // Assuming the response data includes a token, e.g., data.accessToken
            if (data && data.accessToken) {
                login(data.accessToken); // Use login from AuthContext
                // You might want to store other user info or redirect here
                console.log('Login successful, token stored.');
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};

export const registerUser = () => {
    const { login } = useAuth(); // Get login from useAuth for potential auto-login
    return useMutation({
        mutationFn: async (signUpData) => {
            const response = await axiosInstance({
                url: '/Auth/signup', // Assuming this is your signup endpoint
                method: 'POST',
                data: signUpData,
            });
            return response.data;
        },
        onSuccess: (data) => {
            // Handle successful registration, e.g., storing tokens or user info
            console.log('Registration successful:', data);
            // Optionally, log the user in automatically after registration
            if (data && data.accessToken) {
                login(data.accessToken); // Use login from AuthContext
            }
            // You might want to automatically log the user in or redirect
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    });
};
