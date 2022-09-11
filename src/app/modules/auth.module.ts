import { NgModule } from '@angular/core';
import { AuthComponent } from '../components/auth/auth.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule]
})
export class AuthModule { }
