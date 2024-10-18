import { Component, OnInit } from '@angular/core';
import { ServicebdService } from '../../services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-testeos',
  templateUrl: './testeos.page.html',
  styleUrls: ['./testeos.page.scss'],
})
export class TesteosPage implements OnInit {
  currentSegment: string = 'publicaciones'; // Define el valor por defecto del segmento
  publicaciones: any[] = []; // Propiedad para publicaciones
  usuarios: any[] = []; // Propiedad para usuarios
  temas: any[] = []; // Propiedad para temas
  reportes: any[] = []; // Propiedad para reportes
  comentarios: any[] = []; // Propiedad para comentarios

  constructor(
    private servicebd: ServicebdService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadData(); // Cargar datos al inicializar
  }

  // Método para manejar el cambio de segmento
  segmentChanged(event: any) {
    this.currentSegment = event.detail.value;
  }

  // Método para cargar todos los datos
  loadData() {
    this.loadPublicaciones();
    this.loadUsuarios();
    this.loadTemas();
    this.loadReportes();
    this.loadComments(); // Cargar comentarios
  }

  // Método para cargar publicaciones
  loadPublicaciones() {
    this.servicebd.obtenerPublicaciones().then(data => {
      this.publicaciones = data;
    });
  }

  // Método para cargar usuarios
  loadUsuarios() {
    this.servicebd.obtenerUsuarios().then(data => {
      this.usuarios = data;
    });
  }

  // Método para cargar temas
  loadTemas() {
    this.servicebd.obtenerTemas().then(data => {
      this.temas = data;
    });
  }

  // Método para cargar reportes
  loadReportes() {
    this.servicebd.obtenerReportes().then(data => {
      this.reportes = data;
    });
  }

  // Método para cargar comentarios
  loadComments() {
    this.servicebd.obtenerComentariosConUsuario(1).then(data => {
      this.comentarios = data;
    });
  }

  // Método para agregar una nueva publicación
  async addPublicacion() {
    const alert = await this.alertController.create({
      header: 'Nueva Publicación',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título'
        },
        {
          name: 'contenido',
          type: 'textarea',
          placeholder: 'Contenido'
        },
        {
          name: 'picture',
          type: 'text', // Esto puede ser un URL o el nombre de una imagen predeterminada
          placeholder: 'URL de la imagen (opcional)'
        },
        {
          name: 'tema_id_tema',
          type: 'number',
          placeholder: 'ID del Tema'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const usuarioId = 1; // Asume el ID del usuario actual
            if (data.titulo && data.contenido && data.tema_id_tema) {
              const picture = data.picture || ''; // Puedes usar un valor vacío si no se proporciona imagen
              this.servicebd.insertarPublicacion(data.titulo, data.contenido, picture, usuarioId, data.tema_id_tema)
                .then(() => this.loadPublicaciones())
                .catch(error => console.error('Error al agregar publicación: ', error));
            }
          }
        }
      ]
    });
    await alert.present();
  }
  

  // Método para editar una publicación
  async editPublicacion(publicacion: any) {
    const alert = await this.alertController.create({
      header: 'Editar Publicación',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: publicacion.titulo,
          placeholder: 'Título'
        },
        {
          name: 'contenido',
          type: 'textarea',
          value: publicacion.contenido,
          placeholder: 'Contenido'
        },
        {
          name: 'picture',
          type: 'text',
          value: publicacion.picture || '', // Valor actual o vacío
          placeholder: 'URL de la imagen (opcional)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const usuarioId = 1; // ID del usuario actual
            if (data.titulo && data.contenido) {
              const picture = data.picture || '';
              this.servicebd.actualizarPublicacion(publicacion.id, data.titulo, data.contenido, picture, usuarioId, publicacion.tema_id_tema)
                .then(() => this.loadPublicaciones())
                .catch((error: any) => {
                  console.error('Error al editar publicación: ', error);
                });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Método para eliminar una publicación
  async deletePublicacion(postId: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Publicación',
      message: '¿Estás seguro de eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.servicebd.eliminarPublicacion(postId)
              .then(() => this.loadPublicaciones())
              .catch(error => console.error('Error al eliminar publicación: ', error));
          }
        }
      ]
    });
    await alert.present();
  }

  // Método para agregar un nuevo usuario
  async addUsuario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre de usuario'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        },
        {
          name: 'bio',
          type: 'textarea',
          placeholder: 'Biografía (opcional)'
        },
        {
          name: 'avatar',
          type: 'text',
          placeholder: 'URL del avatar (opcional)'
        },
        {
          name: 'rol_rol_id',
          type: 'number',
          placeholder: 'ID del Rol'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre && data.email && data.password && data.rol_rol_id) {
              const bio = data.bio || ''; // Valor opcional
              const avatar = data.avatar || ''; // Valor opcional
              this.servicebd.insertarUsuario(data.nombre, data.email, data.password, bio, avatar, data.rol_rol_id)
                .then(() => this.loadUsuarios())
                .catch(error => console.error('Error al agregar usuario: ', error));
            }
          }
        }
      ]
    });
    await alert.present();
  }
  

  // Método para agregar un nuevo tema
  async addTema() {
    const alert = await this.alertController.create({
      header: 'Nuevo Tema',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre del tema'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre) {
              this.servicebd.insertarTema(data.nombre)
                .then(() => this.loadTemas())
                .catch(error => console.error('Error al agregar tema: ', error));
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Método para agregar un nuevo reporte
  async addReporte() {
    const alert = await this.alertController.create({
      header: 'Nuevo Reporte',
      inputs: [
        {
          name: 'razon',
          type: 'textarea',
          placeholder: 'Razón del reporte'
        },
        {
          name: 'tipo',
          type: 'text',
          placeholder: 'Tipo de reporte (Comentario, Publicación, etc.)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.razon && data.tipo) {
              this.servicebd.insertarReporte(data.razon, 1, 'Pendiente', data.tipo, '')
                .then(() => this.loadReportes())
                .catch(error => console.error('Error al agregar reporte: ', error));
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // BORRAR DESPUÉS
  openComments(postId: number) {
    // Lógica para abrir el modal o navegar a la vista de comentarios
    console.log(`Abriendo comentarios para la publicación con ID: ${postId}`);
  }

  // Función para responder a un comentario
  responder(commentId: number) {
    // Lógica para responder a un comentario
    console.log(`Respondiendo al comentario con ID: ${commentId}`);
  }

  // Función para reportar un comentario
  reportar(commentId: number) {
    // Lógica para reportar un comentario
    console.log(`Reportando el comentario con ID: ${commentId}`);
  }

  // Función para agregar un comentario
  comentar() {
    // Lógica para agregar un comentario
    console.log('Agregando comentario');
  }
}