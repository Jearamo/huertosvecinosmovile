import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Message {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private formData: any = {};
  private formClearedSubject = new Subject<void>(); // Agregar un Subject para la limpieza
  messages$ = this.messagesSubject.asObservable();
  formCleared$ = this.formClearedSubject.asObservable(); // Observable para la limpieza del formulario

  addMessage(message: Message) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  clearFormData() {
    this.formData = {}; // Limpiar los datos
    this.formClearedSubject.next(); // Notificar que el formulario ha sido limpiado
  }
}
