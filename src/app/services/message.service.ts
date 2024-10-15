import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  addMessage(message: Message) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }
}
