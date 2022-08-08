import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthPage, PasswordInput } from 'src/app/models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authPage: AuthPage = "Sign In";
  public passwordInputType: PasswordInput = "password";
  public isSubmitting: boolean;
  public authFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initializeAuthForm();
  }

  public onPasswordVisibilityChange(): void {
    this.passwordInputType = this.passwordInputType === "password" ? "text" : "password";
  }

  public onChangeAuthPage(event: Event): void {
    event.preventDefault();
    this.authPage = this.authPage === "Sign In" ? "Sign Up" : "Sign In";
  }

  public onFormSubmit(): void {
    this.isSubmitting = true;
    console.log("Submit");
  }

  private initializeAuthForm(): void {
    this.authFormGroup = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required, Validators.maxLength(6)]
    });
  }
}
