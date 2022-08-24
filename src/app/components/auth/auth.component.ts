import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { AuthPage, AuthPayload } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authPage: AuthPage = "Sign In";
  public isSubmitting: boolean;
  public authFormGroup: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.initializeAuthForm();
  }

  public onChangeAuthPage(): void {
    this.authPage = this.authPage === "Sign In" ? "Sign Up" : "Sign In";
    this.authFormGroup.reset();
  }

  public onFormSubmit(): void {
    this.authFormGroup.markAllAsTouched();

    if (this.authFormGroup.invalid) {
      return;
    }

    this.isSubmitting = true;

    const authPayload: AuthPayload = {
      ...this.authFormGroup.value,
      returnSecureToken: true
    };

    if (this.authPage === "Sign In") {
      this.onSignIn(authPayload);
    } else {
      this.onSignUp(authPayload);
    }
  }

  private onSignIn(authPayload: AuthPayload): void {
    this.authService.signIn$(authPayload)
      .pipe(
        take(1),
        switchMap(({ localId }) => {
          return this.userService.getUser$(localId);
        })
      )
      .subscribe((userState) => {
        this.userService.userData$.next(userState);
        this.router.navigate(["/chat"]);
      });
  }

  private onSignUp(authPayload: AuthPayload): void {
    this.authService.signUp$(authPayload)
      .pipe(
        take(1),
        switchMap(({ localId, email }) => {
          const initialUserState = {
            isAdmin: false,
            name: email,
            email,
            localId
          };

          return this.userService.setUser$(localId, initialUserState);
        })
      )
      .subscribe((userState) => {
        this.userService.userData$.next(userState);
        this.router.navigate(["/chat"]);
      });
  }

  private initializeAuthForm(): void {
    this.authFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordCheckbox: [false]
    });
  }
}
