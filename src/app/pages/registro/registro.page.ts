import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MessageService } from './../../services/message.service';
import { AuthService } from './../../services/auth.service';

interface RegistroError {
  message: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nuevoUsuario = {
    nick_name: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    email: '',
    password: '',
    bio: '',
    avatar: ''
  };
  confirmarContrasena: string = '';
  showPassword: boolean = false;
  aceptoTerminos: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Limpiar mensajes al entrar en la página
    this.messageService.clearMessages();
    console.log("mensaje borrado")
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(correo);
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    if (!this.nuevoUsuario.nick_name) {
      errores.push('El nombre de usuario es obligatorio');
    }

    if (!this.nuevoUsuario.nombre) {
      errores.push('El nombre es obligatorio');
    }

    if (!this.nuevoUsuario.apellido) {
      errores.push('El apellido es obligatorio');
    }

    if (!this.nuevoUsuario.fecha_nacimiento) {
      errores.push('La fecha de nacimiento es obligatoria');
    } else {
      // Validar que sea mayor de edad (opcional)
      const fechaNacimiento = new Date(this.nuevoUsuario.fecha_nacimiento);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      if (edad < 13) {
        errores.push('Debes ser mayor de 13 años para registrarte');
      }
    }

    if (!this.nuevoUsuario.email) {
      errores.push('El correo electrónico es obligatorio');
    } else if (!this.validarCorreo(this.nuevoUsuario.email)) {
      errores.push('El correo electrónico no es válido');
    }

    if (!this.nuevoUsuario.password) {
      errores.push('La contraseña es obligatoria');
    } else if (this.nuevoUsuario.password.length < 8) {
      errores.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (this.nuevoUsuario.password !== this.confirmarContrasena) {
      errores.push('Las contraseñas no coinciden');
    }

    if (!this.aceptoTerminos) {
      errores.push('Debes aceptar los términos y condiciones');
    }

    if (errores.length > 0) {
      errores.forEach(error => 
        this.messageService.addMessage({ type: 'error', text: error })
      );
      return false;
    }

    return true;
  }

  async registrar() {
    this.messageService.clearMessages();
    
    if (!this.validarFormulario()) {
      return;
    }

    try {
      await this.authService.register(this.nuevoUsuario);
      this.messageService.addMessage({ 
        type: 'success', 
        text: 'Usuario registrado correctamente' 
      });
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error) {
      let errorMessage = 'Error al registrar usuario';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      this.messageService.addMessage({ 
        type: 'error', 
        text: errorMessage
      });
    }
  }
}