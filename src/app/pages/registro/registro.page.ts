import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nuevoUsuario = {
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    correo: '',
    contrasena: ''
  };
  confirmarContrasena: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private alertController: AlertController) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async registrar() {
    // Validar si las contraseñas coinciden
    if (this.nuevoUsuario.contrasena !== this.confirmarContrasena) {
      await this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validar formato del correo electrónico
    if (!this.validarCorreo(this.nuevoUsuario.correo)) {
      await this.mostrarAlerta('Error', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Validar longitud de la contraseña
    if (this.nuevoUsuario.contrasena.length < 8) {
      await this.mostrarAlerta('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Validar edad mínima
    if (!this.tieneEdadSuficiente(this.nuevoUsuario.fechaNacimiento)) {
      await this.mostrarAlerta('Error', 'Debes tener al menos 16 años para registrarte.');
      return;
    }

    // Registrar el nuevo usuario
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(this.nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente.');

    this.router.navigate(['/login']);
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  tieneEdadSuficiente(fechaNacimiento: string): boolean {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad >= 16;
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
