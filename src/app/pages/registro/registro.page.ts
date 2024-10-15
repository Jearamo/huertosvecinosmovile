import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MessageService } from './../../services/message.service';

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

  constructor(private router: Router,private alertController: AlertController,private messageService: MessageService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async registrar() {
    this.messageService.clearMessages();
    let errores: string[] = [];

    // Verificar si todos los campos están vacíos
    const todosVacios = Object.values(this.nuevoUsuario).every(value => !value.trim()) 
                        && !this.confirmarContrasena.trim();

    if (todosVacios) {
      this.messageService.addMessage({ type: 'error', text: 'Por favor, rellena todos los campos' });
      return;
    }

    // Si al menos un campo está lleno, procedemos con las validaciones específicas
    Object.entries(this.nuevoUsuario).forEach(([key, value]) => {
      if (!value.trim()) {
        errores.push(`El campo ${this.getCampoNombre(key)} es obligatorio`);
      }
    });

    if (!this.confirmarContrasena.trim()) {
      errores.push('Debes confirmar la contraseña');
    }

    if (this.nuevoUsuario.contrasena !== this.confirmarContrasena) {
      errores.push('Las contraseñas no coinciden');
    }

    if (!this.validarCorreo(this.nuevoUsuario.correo)) {
      errores.push('El correo electrónico no es válido');
    }

    if (this.nuevoUsuario.contrasena.length < 8) {
      errores.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (!this.tieneEdadSuficiente(this.nuevoUsuario.fechaNacimiento)) {
      errores.push('Debes tener al menos 16 años para registrarte');
    }

    if (!this.aceptoTerminos) {
      errores.push('Debes aceptar los términos y condiciones');
    }

    // Mostrar errores o proceder con el registro
    if (errores.length > 0) {
      errores.forEach(error => this.messageService.addMessage({ type: 'error', text: error }));
    } else {
      this.messageService.addMessage({ type: 'success', text: 'Usuario registrado correctamente' });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  getCampoNombre(key: string): string {
    const nombres: { [key: string]: string } = {
      nombreUsuario: 'Nombre de Usuario',
      nombre: 'Nombre',
      apellido: 'Apellido',
      fechaNacimiento: 'Fecha de Nacimiento',
      correo: 'Correo',
      contrasena: 'Contraseña'
    };
    return nombres[key] || key;
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