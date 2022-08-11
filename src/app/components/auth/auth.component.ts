import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthPage, AuthBodyPayload } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

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
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.initializeAuthForm();
  }

  public onChangeAuthPage(event: Event): void {
    event.preventDefault();
    this.authPage = this.authPage === "Sign In" ? "Sign Up" : "Sign In";
    this.authFormGroup.reset();
  }

  public onFormSubmit(): void {
    this.isSubmitting = true;
    this.authFormGroup.markAllAsTouched();

    if (this.authFormGroup.invalid) {
      return;
    }

    const authBodyPayload: AuthBodyPayload = {
      ...this.authFormGroup.value,
      returnSecureToken: true
    };

    if (this.authPage === "Sign In") {
      this.authService.signIn(authBodyPayload)
      .pipe(take(1))
      .subscribe(() => {
        this.authFormGroup.reset();
      });
    } else {
      this.authService.signUp(authBodyPayload)
      .pipe(take(1))
      .subscribe(() => {
        this.authFormGroup.reset();
      });
    }
  }

  private initializeAuthForm(): void {
    this.authFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordCheckbox: [false]
    });
  }
}
