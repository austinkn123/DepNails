import useSWR from 'swr';
import axiosInstance from '../utils/interceptor';

// Define a fetcher function that SWR will use for all requests
// It takes the URL and uses your axios instance to make the request.
const fetcher = (url) => axiosInstance.get(url).then(res => res.data);

export const QueryKeys = {
    appointments: '/appointment/all' // SWR uses a simple string key
};

export const getAllAppointments = () => {
    // useSWR returns data, error, and isLoading directly
    const { data, error, isLoading } = useSWR(QueryKeys.appointments, fetcher);


    return { data, isLoading, error };
};