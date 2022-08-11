import { Injectable } from '@angular/core';
import { AuthInterface } from './abstract/auth.abstract';
import { HttpClient } from '@angular/common/http';
import { AuthBodyPayload, SignInResponse, SignUpResponse, TokenData } from '../models/auth.model';
import { signInEndpoint, signUpEndpoint } from '../database/firebase.database';
import { Observable, tap } from 'rxjs';

const ID_TOKEN = "idToken";
const EXPIRES_IN = "expiresIn";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthInterface {
  constructor(private readonly http: HttpClient) { }

  public signIn(authBodyPayload: AuthBodyPayload): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(signInEndpoint, authBodyPayload)
      .pipe(tap(({ idToken, expiresIn }) => {
        this.setToken({ idToken, expiresIn });
      }));
  }

  public signUp(authBodyPayload: AuthBodyPayload): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(signUpEndpoint, authBodyPayload)
      .pipe(tap(({ idToken, expiresIn }) => {
        this.setToken({ idToken, expiresIn });
      }));
  }

  public logOut(): void {
    this.setToken(null);
  }

  public getToken(): string {
    const currentTimestamp = new Date();
    const expiresInTimestamp = new Date(localStorage.getItem(EXPIRES_IN));

    if (currentTimestamp > expiresInTimestamp) {
      this.logOut();
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
    } else {
      localStorage.clear();
    }
  }
}
