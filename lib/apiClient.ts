'use client';

import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';

// Safe storage functions that work with cookies
const getStorageItem = (key: string): string | undefined => {
    return Cookies.get(key);
};

const setStorageItem = (key: string, value: string): void => {
    Cookies.set(key, value, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
};

const removeStorageItem = (key: string): void => {
    Cookies.remove(key);
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

            const currentUrl = window.location.href;

            if (currentUrl.includes('/login')) {
                console.warn('⚠️ Already on login page, not redirecting again');
                return Promise.reject(error);
            }
            if (currentUrl.includes('/register')) {
                console.warn('⚠️ Already on register page, not redirecting again');
                return Promise.reject(error);
            }

                
            if (!refreshToken) {
                console.warn('⚠️ No refresh token found, redirecting to login');
                window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
                removeStorageItem(ACCESS_TOKEN_NAME);
                return Promise.reject(error);
            }
            try {
                console.log('🔄 Sending refresh token request');
                const requestTokenResponse: AxiosResponse = await axios.post('/api/auth/refresh', { refreshToken });
                console.log('✅ Token refreshed successfully');

                const { access_token, refresh_token } = requestTokenResponse.data['data'];

                setStorageItem(ACCESS_TOKEN_NAME, access_token);
                setStorageItem(REFRESH_TOKEN_NAME, refresh_token);
                console.log('💾 New tokens stored in cookies');

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

export function getAccessToken(): string | undefined {
    const token = getStorageItem(ACCESS_TOKEN_NAME);
    return token;
}

export function getRefreshToken(): string | undefined {
    const token = getStorageItem(REFRESH_TOKEN_NAME);
    return token;
}

export default apiClient;