import axios from 'axios';
import { axiosIntercepter } from '../utils/interceptor';

export const useApi = (url, method, data) => {
    const makeRequest = async () => {
        try {
            // Use the interceptor here if needed
            const response = await axios({
                url,
                method,
                data,
                //headers: {
                //    'x-token': 'your-auth-token', // Add any necessary headers here
                //},
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error:', error.message);
            return { success: false, error };
        }
    };


    return { loading: true, makeRequest, data };
};