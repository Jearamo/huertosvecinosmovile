import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;

  user:string = "Jehison";
  pass:string = "admin";

  constructor() { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  ngOnInit() {
  }

}
