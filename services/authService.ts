'use client';

import {LoginCredentials, RegisterRequest, User, ResetPasswordRequest} from "@/types/auth";
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

export async function register(registerData: RegisterRequest): Promise<boolean> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/register', registerData);
        return response.status === 201;
    } catch (error) {
        console.error('Registration error:', error);
        return false;
    }
}

export async function verifyAccount(token: string, signature: string): Promise<boolean> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/verify', {
            token,
            signature
        });
        return response.status === 200;
    } catch (error) {
        console.error('Verification error:', error);
        return false;
    }
}

export async function resendVerificationEmail(email: string): Promise<boolean> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/resend-verification-email', {
            email
        });
        return response.status === 200;
    } catch (error) {
        console.error('Resend verification error:', error);
        return false;
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
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            return;
        }
        await apiClient.post('/auth/logout', {refreshToken});
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

export async function forgotPassword(email: string): Promise<boolean> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/forgot-password', {
            email
        });
        return response.status === 200;
    } catch (error) {
        console.error('Forgot password error:', error);
        return false;
    }
}

export async function checkResetPasswordToken(token: string, signature: string): Promise<boolean> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/check-reset-password-token', {
            token,
            signature
        });
        return response.data?.data === true;
    } catch (error) {
        console.error('Check reset password token error:', error);
        return false;
    }
}

export async function resetPassword(data: ResetPasswordRequest): Promise<boolean> {
    try {
        const response: AxiosResponse = await apiClient.post('/auth/reset-password', data);
        return response.status === 200;
    } catch (error) {
        console.error('Reset password error:', error);
        return false;
    }
}