import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ChatComponent } from './components/chat/chat.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';

const routes: Routes = [
  // Chat module
  { path: "", redirectTo: "chat", pathMatch: "full" },
  { path: "chat", component: ChatComponent },
  // Auth module
  { path: "auth", component: AuthComponent },
  // 404 not found
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
