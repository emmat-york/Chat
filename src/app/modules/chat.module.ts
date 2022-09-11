import { NgModule } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [SharedModule]
})
export class ChatModule { }
