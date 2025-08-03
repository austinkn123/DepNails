import useSWRMutation from 'swr/mutation';
import axiosInstance from '../utils/interceptor';
import { toast } from 'react-toastify';

// A generic fetcher for mutations that uses axiosInstance.post
async function postFetcher(url, { arg }) {
    const response = await axiosInstance.post(url, arg);
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
    const { trigger, isMutating, error } = useSWRMutation('/Auth/signup', postFetcher, {
        onSuccess: (data, key, config) => {
            console.log('Registration success:', data);
            if (onSuccessCallback) onSuccessCallback(data, config.arg);
        },
        onError: (err) => {
            console.error('Registration failed:', err);
            if (onErrorCallback) onErrorCallback(err);
        },
    });

    return { signUp: trigger, isPending: isMutating, error };
};

export const useConfirmEmailUser = (onSuccessCallback, onErrorCallback) => {
    const { trigger, isMutating, error, data, reset } = useSWRMutation('/Auth/confirm-email', postFetcher, {
        onSuccess: (data, key, config) => {
            console.log('Email confirmation successful:', data);
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (err) => {
            console.error('Email confirmation failed:', err);
            if (onErrorCallback) onErrorCallback(err);
        },
    });

    return { confirmEmail: trigger, isPending: isMutating, error, data, isSuccess: !!data, reset };
};

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
