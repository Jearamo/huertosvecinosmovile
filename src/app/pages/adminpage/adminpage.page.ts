import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {
    // ARRAY PARA ALMACENAR LOS POST
  currentView: string = 'list';
  posts: any[] = [
    { title: 'Primer post', author: 'Usuario1', date: new Date(), content: 'Contenido del primer post' },
    { title: 'Segundo post', author: 'Usuario2', date: new Date(), content: 'Contenido del segundo post' },
  ];
  newPost: any = { title: '', author: '', content: '' };

  // ARRAY PARA ALMACENAR LOS USUARIOS ACTIVOS
  activos: any[] = [
    { author: 'Antonio03', estado: 'Activo' },
    { author: 'Matias_', estado: 'Activo' },
  ];

  // ARRAY PARA ALMACENAR LOS USUARIOS BANEADOS
  baneados: any[] = [
    { author: 'Juanito', estado: 'Baneado' },
    { author: 'alberto', estado: 'Baneado' },
  ];

  constructor(private alertController: AlertController, private toastController: ToastController) { }
  // AÑADOR UN POST
  async addPost() {
    if (this.newPost.title && this.newPost.author && this.newPost.content) {
      const postToAdd = { ...this.newPost, date: new Date() };
      this.posts.unshift(postToAdd);
      this.newPost = { title: '', author: '', content: '' };
      this.currentView = 'list';
      console.log('Post añadido:', postToAdd);
      // Mostrar un toast de éxito
      const toast = await this.toastController.create({
        message: 'Publicación añadida con éxito',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();
    } else {
      console.log('Por favor, completa todos los campos');
      
      // Mostrar una alerta si los campos están incompletos
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, completa todos los campos antes de añadir la publicación.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // EDICIÓN DE POSTS
  editPost(index: number) {
    console.log('Editar post:', this.posts[index]);
  }

  async deletePost(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.posts.splice(index, 1);
            this.toastController.create({
              message: 'Publicación eliminada',
              duration: 2000,
              color: 'danger'
            }).then(toast => toast.present());
          }
        }
      ]
    });
    await alert.present();
  }

  // BANEAR USUARIOS
  async banUser(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar baneo',
      message: '¿Estás seguro de que quieres banear a este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Banear',
          handler: () => {
            this.toastController.create({
              message: 'Usuario baneado',
              duration: 2000,
              color: 'danger'
            }).then(toast => toast.present());
          }
        }
      ]
    });
    await alert.present();
  }

  // DESBANEAR USUARIOS
  async unbanUser(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar desbaneo',
      message: '¿Estás seguro de que quieres desbanear a este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Desbanear',
          handler: () => {
            this.posts.splice(index, 1);
            this.toastController.create({
              message: 'Usuario desbaneado',
              duration: 2000,
              color: 'success'
            }).then(toast => toast.present());
          }
        }
      ]
    });
    await alert.present();
  }
  
  ngOnInit() {
  }

}
