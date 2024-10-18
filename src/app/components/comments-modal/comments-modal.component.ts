import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent implements OnInit {
  @Input() postId!: number;
  comentarios: any[] = [];

  constructor(
    private modalController: ModalController,
    private servicebd: ServicebdService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.servicebd.obtenerComentariosConUsuario(this.postId).then(data => {
      this.comentarios = data;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async comentar() {
    const alert = await this.alertController.create({
      header: 'Agregar Comentario',
      inputs: [
        {
          name: 'content',
          type: 'textarea',
          placeholder: 'Escribe tu comentario aquí'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Comentar',
          handler: (data) => {
            if (data.content) {
              // Asumimos que el Usuario_user_id es 1 por ahora
              this.servicebd.insertarComentario(data.content, 1, this.postId)
                .then(() => {
                  console.log('Comentario agregado con éxito');
                  this.loadComments();
                })
                .catch(error => {
                  console.error('Error al agregar comentario: ', error);
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async responder(comentarioId: number) {
    const alert = await this.alertController.create({
      header: 'Responder Comentario',
      inputs: [
        {
          name: 'content',
          type: 'textarea',
          placeholder: 'Escribe tu respuesta aquí'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Responder',
          handler: (data) => {
            if (data.content) {
              this.servicebd.insertarComentario(data.content, 1, this.postId)
                .then(() => {
                  console.log('Respuesta agregada con éxito');
                  this.loadComments();
                })
                .catch(error => {
                  console.error('Error al agregar respuesta: ', error);
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async reportar(comentarioId: number) {
    const alert = await this.alertController.create({
      header: 'Reportar Comentario',
      inputs: [
        {
          name: 'reason',
          type: 'textarea',
          placeholder: 'Razón del reporte'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Reportar',
          handler: (data) => {
            if (data.reason) {
              this.servicebd.insertarReporte(data.reason, 1, 'Pendiente', 'Comentario', '')
                .then(() => {
                  console.log('Reporte enviado con éxito');
                })
                .catch(error => {
                  console.error('Error al enviar reporte: ', error);
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}