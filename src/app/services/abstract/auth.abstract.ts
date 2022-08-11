import { Observable } from "rxjs";
import { AuthBodyPayload, SignInResponse, SignUpResponse, TokenData } from "src/app/models/auth.model";

export abstract class AuthInterface {
    public abstract signIn(authBodyPayload: AuthBodyPayload): Observable<SignInResponse>;
    public abstract signUp(authBodyPayload: AuthBodyPayload): Observable<SignUpResponse>;
    public abstract logOut(): void;
    public abstract setToken(tokenData: TokenData): void;
    public abstract getToken(): string;
}