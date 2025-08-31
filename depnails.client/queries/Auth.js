import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import axiosInstance from '../utils/interceptor';
import { toast } from 'react-toastify';

// A generic fetcher for mutations that uses axiosInstance.post
async function postFetcher(url, { arg }) {
    const response = await axiosInstance.post(url, arg);
    return response.data;
}

// A generic fetcher for GET requests
async function getFetcher(url) {
    const response = await axiosInstance.get(url);
    return response.data;
}

export const useLoginUser = (onSuccessCallback, onErrorCallback) => {
    const { trigger, isMutating, error } = useSWRMutation('/Auth/login', postFetcher, {
        onSuccess: (data, key, config) => {
            toast.success('Login successful!');
            console.log('Login successful, token stored.');
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.message || err.message || 'Login failed.';
            toast.error(errorMessage);
            console.error('Login failed:', err);
            if (onErrorCallback) onErrorCallback(err);
        },
    });

    return { login: trigger, isPending: isMutating, error };
};

export const useRegisterUser = (onSuccessCallback, onErrorCallback) => {
    const { trigger, isMutating, error } = useSWRMutation(
        '/Auth/signup',
        postFetcher,
        {
            onSuccess: (data, key, config) => {
                console.log('Registration success:', data);
                // Access the variables from the config object
                if (onSuccessCallback) {
                    // Pass the original form values from extraData to the callback
                    onSuccessCallback(data, key, config.extraData);
                }
            },
            onError: (err) => {
                console.error('Registration failed:', err);
                if (onErrorCallback) onErrorCallback(err);
            },
        }
    );

    return { signUp: trigger, isPending: isMutating, error };
};

// Confirm email flow removed: signup now auto-confirms and logs in

export const useLogoutUser = (onSuccessCallback, onErrorCallback) => {
    const { trigger, isMutating } = useSWRMutation('/Auth/logout', postFetcher, {
        onSuccess: (data) => {
            toast.success('Logout successful!');
            console.log('Logout successful.');
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (err) => {
            toast.error(err.message || 'Logout failed.');
            console.error('Logout failed:', err);
            if (onErrorCallback) onErrorCallback(err);
        },
    });

    return { logout: trigger, isPending: isMutating };
};

export const useUserProfile = (shouldFetch = false) => {
    const { data, error, isLoading, mutate } = useSWR(
        shouldFetch ? '/Auth/profile' : null, 
        getFetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            errorRetryCount: 1,
        }
    );

    return { 
        userProfile: data, 
        isLoading, 
        error, 
        refetch: mutate 
    };
};
