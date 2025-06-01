import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/interceptor';

export const loginUser = (onSuccessCallback, onErrorCallback) => {
    const login = useMutation({
        mutationFn: async (loginData) => {
            const response = await axiosInstance({
                url: '/Auth/login',
                method: 'POST',
                data: loginData,
            });
            return response.data;
        },
        onSuccess: (data, variables, context) => {
            console.log('Login successful, token stored.');
            if (onSuccessCallback) onSuccessCallback(data, variables, context);
        },
        onError: (error) => {
            console.error('Login failed:', error);
            if (onErrorCallback) onErrorCallback(error);
        },
    })

    return login;
};

export const registerUser = (onSuccessCallback, onErrorCallback) => {

    const signUp = useMutation({
        mutationFn: async (signUpData) => {
            const response = await axiosInstance({
                url: '/Auth/signup', // Assuming this is your signup endpoint
                method: 'POST',
                data: signUpData,
            });
            return response.data;
        },
        onSuccess: (data, variables, context) => {
            console.log('Registration success:', data);
            if (onSuccessCallback) onSuccessCallback(data, variables, context);
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            if (onErrorCallback) onErrorCallback(error);
        },
    })

    return signUp;
};

export const confirmEmailUser = (onSuccessCallback, onErrorCallback) => {
    const confirmEmail = useMutation({
        mutationFn: async (confirmationData) => {
            const response = await axiosInstance({
                url: '/Auth/confirm-email', // Assuming this is your email confirmation endpoint
                method: 'POST',
                data: confirmationData, // Sending email and mapped token in the request body
            });
            return response.data;
        },
        onSuccess: (data, variables, context) => {
            console.log('Email confirmation successful:', data);
            if (onSuccessCallback) onSuccessCallback(data, variables, context);
        },
        onError: (error) => {
            console.error('Email confirmation failed:', error);
            if (onErrorCallback) onErrorCallback(error);
        },
    });

    return confirmEmail;
};

export const logoutUser = (onSuccessCallback, onErrorCallback) => {
    const logout = useMutation({
        mutationFn: async (logoutData) => { // logoutData might include the access token, depending on backend
            const response = await axiosInstance({
                url: '/Auth/logout',
                method: 'POST',
                data: logoutData, // Send necessary data, e.g., { accessToken: 'token' }
            });
            return response.data;
        },
        onSuccess: (data, variables, context) => {
            console.log('Logout successful.');
            if (onSuccessCallback) onSuccessCallback(data, variables, context);
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            if (onErrorCallback) onErrorCallback(error);
        },
    });

    return logout;
};
