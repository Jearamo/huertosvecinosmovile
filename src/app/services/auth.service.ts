import { Injectable } from '@angular/core';
import { ServicebdService } from './servicebd.service';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(
    private dbService: ServicebdService,
    private alertController: AlertController
  ) {}

  async register(userData: {
    nick_name: string,
    nombre: string,
    apellido: string,
    fecha_nacimiento: string,
    email: string,
    password: string,
    avatar?: string
  }): Promise<boolean> {
    try {
      // Verificar si el correo ya existe
      const usuarios = await this.dbService.obtenerUsuarios();
      const emailExists = usuarios.some(user => user.email === userData.email);
      
      if (emailExists) {
        throw new AuthError('El correo electrónico ya está registrado');
      }
  
      // Verificar si el nickname ya existe
      const nickExists = usuarios.some(user => user.nick_name === userData.nick_name);
      
      if (nickExists) {
        throw new AuthError('El nombre de usuario ya está en uso');
      }

      // Convertir fecha_nacimiento a formato ISO
      const fechaNacimiento = new Date(userData.fecha_nacimiento);
      if (isNaN(fechaNacimiento.getTime())) {
        throw new AuthError('La fecha de nacimiento es inválida');
      }

      // Formato ISO para fecha_nacimiento
      const fechaNacimientoISO = fechaNacimiento.toISOString().split('T')[0]; // Solo la parte de la fecha (YYYY-MM-DD)
  
      // Si las validaciones pasan, procedemos con el registro
      await this.dbService.insertarUsuario(
        userData.nick_name,
        userData.nombre,
        userData.apellido,
        fechaNacimientoISO, // Usamos la fecha en formato ISO
        userData.email,
        userData.password,
        userData.avatar || '',
        2  // Role ID por defecto (usuario normal)
      );
  
      await this.presentAlert('Registro exitoso', 'Tu cuenta ha sido creada correctamente');
      return true;
    } catch (error) {
      if (error instanceof AuthError) {
        await this.presentAlert('Error', error.message);
        throw error;
      } else {
        const errorMessage = 'Error al registrar usuario';
        await this.presentAlert('Error', errorMessage);
        throw new AuthError(errorMessage);
      }
    }
}

  // Método helper para mostrar alertas
  private async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Getters para el estado de autenticación
  isAuthenticatedUser() {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  async updateCurrentUser(userData: any): Promise<void> {
    this.currentUser.next(userData);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const usuarios = await this.dbService.obtenerUsuarios();
      const user = usuarios.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new AuthError('Correo o contraseña incorrectos');
      }
  
      // Almacenar el usuario en el BehaviorSubject
      this.currentUser.next(user);
      this.isAuthenticated.next(true);
      
      return true;
    } catch (error) {
      const errMessage = (error instanceof AuthError) ? error.message : 'Error desconocido';
      await this.presentAlert('Error', errMessage);
      throw new AuthError(errMessage);
    }
  }
  

  // Método para cerrar sesión
  logout(): void {
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }
}
