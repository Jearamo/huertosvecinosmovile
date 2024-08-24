import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  showPassword: boolean = false;

  constructor() { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  ngOnInit() {
  }

}
