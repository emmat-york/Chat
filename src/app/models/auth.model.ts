export type AuthPage = "Sign In" | "Sign Up";

export type SignInErrors = "EMAIL_NOT_FOUND" | "INVALID_PASSWORD" | "USER_DISABLED";

export type SignUpErrors = "EMAIL_EXISTS" | "OPERATION_NOT_ALLOWED" | "TOO_MANY_ATTEMPTS_TRY_LATER";

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
