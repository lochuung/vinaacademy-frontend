'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthContextType, LoginCredentials, User} from "@/types/auth";
import {useRouter} from "next/navigation";
import * as authService from "@/services/authService";

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => false,
    logout: async () => {
    },
    refreshAuth: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const currentUser: User | null = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    return;
                }
                const refreshUser = await authService.refreshToken();
                if (refreshUser) {
                    setUser(refreshUser);
                }
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
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        await authService.logout();
        setUser(null);
        router.push('/login');
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
            refreshAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}