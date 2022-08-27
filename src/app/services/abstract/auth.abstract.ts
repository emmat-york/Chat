import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthPage, AuthPayload, SignInResponse, SignUpResponse, TokenData } from "src/app/models/auth.model";

export abstract class AuthInterface {
    public abstract signIn$(authPayload: AuthPayload): Observable<SignInResponse>;

    public abstract signUp$(authPayload: AuthPayload): Observable<SignUpResponse>;

    public abstract signOut(): void;

    public abstract getToken(): string;

    public abstract setToken(tokenData: TokenData): void;

    public abstract handleAuthErrors(authPage: AuthPage, error: HttpErrorResponse): void;
}
