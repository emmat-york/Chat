import { Observable } from "rxjs";
import { UserState } from "src/app/models/user/user.model";

export abstract class UserInterface {
    public abstract setUser$(localId: string, initialState: UserState): Observable<UserState>;
    
    public abstract getUser$(localId: string): Observable<UserState>;
}
