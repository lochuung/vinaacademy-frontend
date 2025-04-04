import {BaseDto} from "@/types/api-response";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}


export type User = BaseDto & {
    id: string; // UUID
    fullName: string;
    email: string;
    username: string;
    phone?: string;
    avatarUrl?: string;
    description?: string;
    isCollaborator: boolean;
    birthday?: string; // ISO date string
    roles: Role[];
    isActive: boolean;
};


export type Role = BaseDto & {
    id: number;
    name?: string;
    code: string;
    permissions: Permission[];
};


export type Permission = BaseDto & {
    id: number;
    name: string;
    code: string;
};

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => void;
    refreshAuth: () => Promise<boolean>;
}