'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthContextType, LoginCredentials, RegisterRequest, User} from "@/types/auth";
import {usePathname, useRouter} from "next/navigation";
import * as authService from "@/services/authService";
import { toast } from "react-toastify";
import { getAccessToken } from "@/lib/apiClient";

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => false,
    logout: async () => {
    },
    refreshAuth: async () => false,
    register: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Skip check if no user and no token
                if (!user && !getAccessToken()) {
                    return;
                }
                
                // Try to get current user first
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    return;
                }
                
                // If failed, try refresh token as fallback
                const refreshUser = await authService.refreshToken();
                setUser(refreshUser);
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuthentication();
    }, []);

    // Login function
    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setIsLoading(true);
        try {
            const loggedInUser = await authService.login(credentials);
            if (loggedInUser) {
                setUser(loggedInUser);
                toast.success(`Welcome back, ${loggedInUser.fullName || loggedInUser.username || loggedInUser.email || 'user'}!`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials and try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Register function
    const register = async (data: RegisterRequest): Promise<boolean> => {
        setIsLoading(true);
        try {
            const success = await authService.register(data);
            if (success) {
                toast.success('Registration successful! Please login with your new account.');
            }
            return success;
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again later.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const currentPath = usePathname();

    // Logout function
    const logout = async () => {
        await authService.logout();
        setUser(null);
        toast.info('You have been logged out.');
        router.push(`/login?redirect=${currentPath}`);
    };

    // Refresh authentication function
    const refreshAuth = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const refreshedUser = await authService.refreshToken();
            if (refreshedUser) {
                setUser(refreshedUser);
                return true;
            }
            setUser(null);
            return false;
        } catch (error) {
            console.error('Auth refresh failed:', error);
            setUser(null);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            refreshAuth,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}