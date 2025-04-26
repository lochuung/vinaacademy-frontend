export interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
    retypedPassword: string
}

export interface UpdateUserInfoRequest{
    fullName: string
    phone: string | null
    avatar: string | null
    dateOfBirth: Date | null
    description: string | null
}