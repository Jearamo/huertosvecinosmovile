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

  constructor(private alertController: AlertController, private toastController: ToastController) { }
  // AÑADOR UN POST
  async addPost() {
    if (this.newPost.title && this.newPost.author && this.newPost.content) {
      // Crear una copia del newPost y añadir la fecha actual
      const postToAdd = { ...this.newPost, date: new Date() };
      
      // Añadir el nuevo post al principio del array
      this.posts.unshift(postToAdd);
      
      // Limpiar el formulario
      this.newPost = { title: '', author: '', content: '' };
      
      // Cambiar la vista a la lista de posts
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

  editPost(index: number) {
    // Aquí iría la lógica para editar un post
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
  

  ngOnInit() {
  }

}
