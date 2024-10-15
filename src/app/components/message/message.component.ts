import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  template: `
    <ion-list *ngIf="messages.length > 0">
      <ion-item *ngFor="let message of messages" [ngClass]="message.type">
        <ion-icon [name]="getIconName(message.type)" slot="start"></ion-icon>
        <ion-label>{{ message.text }}</ion-label>
      </ion-item>
    </ion-list>
  `,
  styles: [`
    ion-list {
      margin-bottom: 20px;
      margin-top:10px
    }
    .success { --ion-color-primary: var(--ion-color-success); }
    .error { --ion-color-primary: var(--ion-color-danger); }
    .info { --ion-color-primary: var(--ion-color-primary); }
  `]
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  getIconName(type: string): string {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'info': return 'information-circle';
      default: return 'information-circle';
    }
  }
}