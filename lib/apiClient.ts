'use client';

import axios, {AxiosResponse} from 'axios';
// Remove Cookies import as we're using localStorage now

const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';


// Safe storage functions that work in both client and server environments
const getStorageItem = (key: string): string | null => {
    return localStorage.getItem(key);
};

const setStorageItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

const removeStorageItem = (key: string): void => {
    localStorage.removeItem(key);
};

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = getStorageItem(ACCESS_TOKEN_NAME);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.log(`🔄 Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
        return config;
    }, (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
)


apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        return response;
    },
    async (error) => {
        console.error(`❌ Response error: ${error.response?.status || 'NETWORK ERROR'}`, error.response?.data || error.message);  
        const originalRequest = error.config;
        if (error.response?.status === 401 &&
            originalRequest &&
            !originalRequest.headers['X-Retry']) {
            console.log('🔄 Token expired, attempting to refresh...');
            const refreshToken = getStorageItem(REFRESH_TOKEN_NAME);
            if (!refreshToken) {
                console.warn('⚠️ No refresh token found, redirecting to login');
                window.location.href = '/login';
                return Promise.reject(error);
            }
            try {
                console.log('🔄 Sending refresh token request');
                const requestTokenResponse: AxiosResponse = await axios.post('/api/auth/refresh', {refreshToken});
                console.log('✅ Token refreshed successfully');

                const {access_token, refresh_token} = requestTokenResponse.data['data'];

                setStorageItem(ACCESS_TOKEN_NAME, access_token);
                setStorageItem(REFRESH_TOKEN_NAME, refresh_token);
                console.log('💾 New tokens stored in localStorage');

                if (originalRequest.headers) {
                    originalRequest.headers['X-Retry'] = 'true';
                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                }
                console.log('🔁 Retrying original request');
                return apiClient(originalRequest);
            } catch (error) {
                console.error('❌ Error refreshing token:', error);
                removeStorageItem(ACCESS_TOKEN_NAME);
                removeStorageItem(REFRESH_TOKEN_NAME);
                console.warn('⚠️ Tokens removed, redirecting to login');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
)

export function setTokens(accessToken: string, refreshToken: string): void {
    setStorageItem(ACCESS_TOKEN_NAME, accessToken);
    setStorageItem(REFRESH_TOKEN_NAME, refreshToken);
}

export function removeTokens(): void {
    removeStorageItem(ACCESS_TOKEN_NAME);
    removeStorageItem(REFRESH_TOKEN_NAME);
}

export function getAccessToken(): string | null {
    const token = getStorageItem(ACCESS_TOKEN_NAME);
    return token;
}

export function getRefreshToken(): string | null {
    const token = getStorageItem(REFRESH_TOKEN_NAME);
    return token;
}

export default apiClient;