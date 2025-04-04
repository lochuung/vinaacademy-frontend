'use client';

import {LoginCredentials, User} from "@/types/auth";
import apiClient, {getRefreshToken, removeTokens, setTokens} from "@/lib/apiClient";
import {AxiosResponse} from "axios";


export async function login(credentials: LoginCredentials): Promise<User | null> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/login', credentials);
        const {access_token, refresh_token} = response.data['data'];
        setTokens(access_token, refresh_token);

        return getCurrentUser();
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const response: AxiosResponse = await apiClient.get('/users/me');
        return response.data['data'];
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

export async function logout(): Promise<void> {
    try {
        await apiClient.post('/auth/logout');
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        removeTokens();
    }
}

export async function refreshToken(): Promise<User | null> {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            return null;
        }
        const response: AxiosResponse = await apiClient.post('/auth/refresh', {refreshToken});
        const {access_token, refresh_token} = response.data['data'];
        setTokens(access_token, refresh_token);

        return getCurrentUser();
    } catch (error) {
        console.error('Error refreshing token:', error);
        removeTokens();
    }
    return null;
}