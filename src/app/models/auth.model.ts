export type AuthPage = "Sign In" | "Sign Up";

export interface AuthPayload {
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
    localId: string;
}

export interface TokenData {
    idToken: string;
    expiresIn: string;
}
