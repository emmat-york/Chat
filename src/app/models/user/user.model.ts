export interface UserState {
    isAdmin: boolean;
    name: string;
    email: string;
    localId: string;
    birthDate?: string;
    messanger?: any[];
    phone?: string;
    info?: string;
}

export interface setUserResponse {
    name: string;
}
