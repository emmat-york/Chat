import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ChatComponent } from './components/chat/chat.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "chat", pathMatch: "full" },
  { path: "chat", component: ChatComponent },
  { path: "auth", component: AuthComponent, children: [
    { path: "sign-in", component: SignInComponent },
    { path: "sign-up", component: SignUpComponent }
  ]},
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
