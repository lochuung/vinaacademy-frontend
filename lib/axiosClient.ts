import axios from 'axios';

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

const setTokens = (access_token: string, refresh_token: string) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}

apiClient.interceptors.request.use((config) => {
    const access_token = getAccessToken();
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
}, (error) => Promise.reject(error));

let isRefreshing = false;
let refreshSubscribers: ((token: string)=> void)[] = [];

const refreshAccessToken = async () => {
    try {
        const refresh_token = getRefreshToken();
        if (!refresh_token) {
            return Promise.reject('No refresh token');
        }
        const response = await apiClient.post(`/api/auth/login`, { refresh_token });
        const { access_token } = response.data;
        setTokens(access_token, refresh_token);

        refreshSubscribers.forEach((callback) => callback(access_token));
        refreshSubscribers = [];
        return access_token;
    } catch (error) {
        console.error('Error refreshing token', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
    }
};


apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshSubscribers.push((token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    resolve(apiClient(originalRequest));
                });
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
            refreshAccessToken()
                .then((access_token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                    resolve(apiClient(originalRequest));
                })
                .catch((error) => {
                    reject(error);
                })
                .finally(() => {
                    isRefreshing = false;
                });
        });
    }

    return Promise.reject(error);
});