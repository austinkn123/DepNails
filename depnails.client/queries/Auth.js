import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/interceptor';

export const loginUser = () => {
    return useMutation({
        mutationFn: async (loginData) => {
            const response = await axiosInstance({
                url: '/Auth/login', // Matches the [HttpPost("login")] attribute in AuthController.cs
                method: 'POST',
                data: loginData, // { username, password }
            });
            return response.data;
        },
        onSuccess: (data) => {
            // Assuming the response data includes a token, e.g., data.accessToken
            if (data && data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                // You might want to store other user info or redirect here
                console.log('Login successful, token stored.');
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle error, e.g., show a notification to the user
        },
    });
};
