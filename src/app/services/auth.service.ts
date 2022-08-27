import { Injectable } from '@angular/core';
import { AuthInterface } from './abstract/auth.abstract';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignInErrors, AuthPage, AuthPayload, SignInResponse, SignUpResponse, TokenData, SignUpErrors } from '../models/auth.model';
import { FIREBASE_DATA_BUCKET } from '../database/firebase.database';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

const { AUTH: { SIGN_IN, SIGN_UP, ID_TOKEN, EXPIRES_IN, ERRORS: { SIGN_IN_ERRORS, SIGN_UP_ERRORS } } } = FIREBASE_DATA_BUCKET;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthInterface {
  public readonly authError$ = new BehaviorSubject<SignInErrors | SignUpErrors>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  public signIn$(authPayload: AuthPayload): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGN_IN, authPayload)
      .pipe(
        tap(({ idToken, expiresIn }) => {
          this.setToken({ idToken, expiresIn });
        }));
  }

  public signUp$(authPayload: AuthPayload): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(SIGN_UP, authPayload)
      .pipe(
        tap(({ idToken, expiresIn }) => {
          this.setToken({ idToken, expiresIn });
        }));
  }

  public signOut(): void {
    this.setToken(null);
  }

  public getToken(): string {
    const currentTimestamp = new Date();
    const expiresInTimestamp = new Date(localStorage.getItem(EXPIRES_IN));

    if (currentTimestamp > expiresInTimestamp) {
      this.signOut();
      return null;
    } else {
      return localStorage.getItem(ID_TOKEN);
    }
  }

  public setToken(tokenData: TokenData): void {
    if (tokenData) {
      const mappedExpiresInToMiliseconds = Number(tokenData.expiresIn) * 1000;
      const currentTimestamp = new Date().getTime();

      const expiresInTimestamp = new Date(currentTimestamp + mappedExpiresInToMiliseconds);

      localStorage.setItem(ID_TOKEN, tokenData.idToken);
      localStorage.setItem(EXPIRES_IN, expiresInTimestamp.toString());
      this.router.navigate(["/chat"]);
    } else {
      localStorage.clear();
      this.router.navigate(["/auth"]);
    }
  }

  public handleAuthErrors(authPage: AuthPage, error: HttpErrorResponse): void {
    let errorMessage: SignInErrors | SignUpErrors;

    if (authPage === "Sign In") {
      errorMessage = (SIGN_IN_ERRORS[error.error.error.message as SignInErrors]) as SignInErrors;
    } else {
      errorMessage = (SIGN_UP_ERRORS[error.error.error.message as SignUpErrors]) as SignUpErrors;
    }

    this.authError$.next(errorMessage);
  }
}
