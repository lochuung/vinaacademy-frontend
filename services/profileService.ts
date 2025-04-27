import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api-response";
import { User, ViewUser } from "@/types/auth";
import { UserDto } from "@/types/course";
import { ChangePasswordRequest, UpdateUserInfoRequest } from "@/types/profile-type";
import { AxiosResponse } from "axios";


export const changePassword = async (changePasswordRequest : ChangePasswordRequest ): Promise<Boolean | null> => {
    try {
        const response: AxiosResponse = await apiClient.put(`/auth/change-password`, changePasswordRequest);
        return response.data.data;
    } catch (error) {
        console.error("changePassword error:", error);
        return false;
    }
};

export const updateUserInfo = async (updateUserInfoRequest: UpdateUserInfoRequest ): Promise<User | null> => {
    try {
        const response: AxiosResponse = await apiClient.put(`/users/update-info`, updateUserInfoRequest);
        
        return response.data.data;
    } catch (error) {
        console.error("updateUserInfo error:", error);
        return null;
    }
};

export const getViewUserInfo = async (userId: string ): Promise<ViewUser | null> => {
    try {
        const response: AxiosResponse = await apiClient.get(`/users/view/${userId}`);
        
        return response.data.data;
    } catch (error) {
        console.error("get View User Info error:", error);
        return null;
    }
};