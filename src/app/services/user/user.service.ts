import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { FIREBASE_DATA_BUCKET } from "../../database/firebase.database";
import { setUserResponse, UserState } from "../../models/user/user.model";
import { UserInterface } from "./user.abstract";

const { USERS_STORAGE: { URL } } = FIREBASE_DATA_BUCKET;

@Injectable({
    providedIn: "root"
})
export class UserService implements UserInterface {
    public readonly userData$ = new BehaviorSubject<UserState>(null);

    constructor(private readonly http: HttpClient) { }

    public setUser$(localId: string, initialState: UserState): Observable<UserState> {
        return this.http.post<setUserResponse>(`${URL}/users/${localId}.json`, {})
            .pipe(switchMap(() => {
                return this.http.put<UserState>(`${URL}/users/${localId}.json`, initialState);
            }));
    }

    public getUser$(localId: string): Observable<UserState> {
        return this.http.get<UserState>(`${URL}/users/${localId}.json`);
    }
}
