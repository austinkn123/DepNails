import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // This will be proxied to the target defined in Vite config
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    (request) => {
        // Modify the request object here
        // Example: Add a header or modify data
        console.log('Request Intercepted:', request);
        return request;
    },
    (error) => {
        // Handle request error
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
            // Handle 401 unauthorized error
            console.warn('Unauthorized:', response);
        }
        return response;
    },
    (error) => {
        // Handle response error
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
