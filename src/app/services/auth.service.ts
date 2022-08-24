import { Injectable } from '@angular/core';
import { AuthInterface } from './abstract/auth.abstract';
import { HttpClient } from '@angular/common/http';
import { AuthPayload, SignInResponse, SignUpResponse, TokenData } from '../models/auth.model';
import { FIREBASE_DATA_BUCKET } from '../database/firebase.database';
import { Observable, tap } from 'rxjs';

const { AUTH: { SIGN_IN, SIGN_UP, ID_TOKEN, EXPIRES_IN } } = FIREBASE_DATA_BUCKET;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthInterface {
  constructor(private readonly http: HttpClient) { }

  public signIn$(authPayload: AuthPayload): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGN_IN, authPayload)
      .pipe(tap(({ idToken, expiresIn }) => {
        this.setToken({ idToken, expiresIn });
      }));
  }

  public signUp$(authPayload: AuthPayload): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(SIGN_UP, authPayload)
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
