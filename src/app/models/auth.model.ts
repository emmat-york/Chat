export type AuthPage = "Sign In" | "Sign Up";

export interface AuthBodyPayload {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface SignInResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

export interface SignUpResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string; // The uid of the newly created user.
}

export interface TokenData {
    idToken: string;
    expiresIn: string;
}