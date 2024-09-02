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
  aceptoTerminos: boolean = false;

  constructor(private router: Router, private alertController: AlertController) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async registrar() {
    const camposVacios = Object.values(this.nuevoUsuario).some(value => !value.trim());
    
    if (camposVacios || !this.confirmarContrasena.trim()) {
      await this.mostrarAlerta('Campos vacíos', 'Por favor, rellena todos los campos');
      return;
    }

    if (this.nuevoUsuario.contrasena !== this.confirmarContrasena) {
      await this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (!this.validarCorreo(this.nuevoUsuario.correo)) {
      await this.mostrarAlerta('Error', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (this.nuevoUsuario.contrasena.length < 8) {
      await this.mostrarAlerta('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!this.tieneEdadSuficiente(this.nuevoUsuario.fechaNacimiento)) {
      await this.mostrarAlerta('Error', 'Debes tener al menos 16 años para registrarte.');
      return;
    }

    if (!this.aceptoTerminos) {
      await this.mostrarAlerta('Aceptar términos', 'Debes aceptar los términos para continuar.');
      return;
    }

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