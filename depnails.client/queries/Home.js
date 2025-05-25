import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/interceptor'; // Assuming axiosInstance is your configured axios

export const QueryKeys = {
    appointments: ['/appointment/all']
};

export const getAllAppointments = () => {
    const { data, isLoading: loading } = useQuery({
        queryKey: QueryKeys.appointments,
        queryFn: async () => {
            // Correctly pass the URL and method to axiosInstance
            const response = await axiosInstance({ 
                url: QueryKeys.appointments[0], // Use the first element of the array as the URL path
                method: 'GET' 
            }); 
            return response.data;
        }
    });

    return { data, loading };
};