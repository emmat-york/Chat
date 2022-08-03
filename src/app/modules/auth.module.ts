import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../components/auth/auth.component';
import { SignUpComponent } from '../components/auth/sign-up/sign-up.component';
import { SignInComponent } from '../components/auth/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class AuthModule { }
