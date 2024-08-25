import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Mostrar contraseña
  showPassword: boolean = false;
  // verificar inicio 
  correo: string = '';
  contrasena: string = '';

  // Usuario admin
  validEmail: string = 'Jehison1';
  validPassword: string = 'admin1234';

  constructor(private router: Router, private alertController: AlertController, private cd: ChangeDetectorRef) { }
  // MOSTRAR CONTRASEÑA
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  // IF PARA INICIO DE SESIÓN
  async login() {
    // Verificar el usuario predefinido
    if (this.correo === this.validEmail && this.contrasena === this.validPassword) {
      localStorage.setItem('usuarioActual', JSON.stringify({
        nombreUsuario: 'Usuario administrador',
        correo: this.validEmail,
        nombre: 'Jehison',
        apellido: 'Arancibia',
        fechaNacimiento: '1990-01-01', // Fecha de ejemplo
        validAdmin: true
      }));
      this.router.navigate(['/tabs/tab1']);
      return;
    }
  
    // Verificar usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(
      (u: any) => u.correo === this.correo && u.contrasena === this.contrasena
    );
  
    if (usuarioEncontrado) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
      this.router.navigate(['/tabs/tab1']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
