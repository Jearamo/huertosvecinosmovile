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
    bio?: string,
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
  
      // Si las validaciones pasan, procedemos con el registro
      await this.dbService.insertarUsuario(
        userData.nick_name,
        userData.nombre,
        userData.apellido,
        userData.fecha_nacimiento,
        userData.email,
        userData.password,
        userData.bio || '',
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
}