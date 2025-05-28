import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/interceptor';

export const loginUser = (onSuccessCallback) => {
    const login = useMutation({
        mutationFn: async (loginData) => {
            const response = await axiosInstance({
                url: '/Auth/login',
                method: 'POST',
                data: loginData,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Login successful, token stored.');
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    })

    return login;
};

export const registerUser = (onSuccessCallback) => {

    const signUp = useMutation({
        mutationFn: async (signUpData) => {
            const response = await axiosInstance({
                url: '/Auth/signup', // Assuming this is your signup endpoint
                method: 'POST',
                data: signUpData,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Registration success:', data);
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    })

    return signUp;
};
