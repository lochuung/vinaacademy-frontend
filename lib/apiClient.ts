'use client';

import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

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

function handleMissingRefreshToken(currentUrl: string, errorMessage: string, error: any) {
    console.warn('⚠️ No refresh token found, redirecting to login');
    window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
    removeStorageItem(ACCESS_TOKEN_NAME);
    return Promise.reject(error);
}

async function refreshAuthToken(error: any, originalRequest: any): Promise<any> {
    console.log('🔄 Token expired, attempting to refresh...');
    const refreshToken = getStorageItem(REFRESH_TOKEN_NAME);
    const currentUrl = window.location.href;

    if (currentUrl.includes('/login')) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau');
        return Promise.reject(error);
    }

    if (currentUrl.includes('/register')) {
        console.warn('⚠️ Already on register page, not redirecting again');
        return Promise.reject(error);
    }

    if (!refreshToken) {
        return handleMissingRefreshToken(currentUrl, error.response?.data?.message, error);
    }

    try {
        console.log('🔄 Sending refresh token request');
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });
        console.log('✅ Token refreshed successfully');
        const { access_token, refresh_token } = data['data'];
        setStorageItem(ACCESS_TOKEN_NAME, access_token);
        originalRequest.headers['X-Retry'] = 'true';
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        console.log('🔁 Retrying original request');
        return apiClient(originalRequest);
    } catch (refreshError) {
        console.error('❌ Error refreshing token:', refreshError);
        removeStorageItem(ACCESS_TOKEN_NAME);
        removeStorageItem(REFRESH_TOKEN_NAME);
        console.warn('⚠️ Tokens removed, redirecting to login');
        window.location.href = '/login';
        return Promise.reject(refreshError);
    }
}

apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        return response;
    },
    async (error) => {
        const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau';
        console.error(`❌ Response error: ${error.response?.status || 'NETWORK ERROR'}`, error.response?.data || error.message);

        // Don't show toast for authentication errors (will be handled by auth flow)
        if (error.response?.status !== 401) {
            toast.error(errorMessage || 'Có lỗi xảy ra, vui lòng thử lại sau');
        }

        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest && !originalRequest.headers['X-Retry']) {
            return refreshAuthToken(error, originalRequest);
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