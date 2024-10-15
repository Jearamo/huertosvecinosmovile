import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private servicebd: ServicebdService
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.servicebd.getComentarios(this.postId).then(data => {
      this.comentarios = data;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  comentar() {
    // Implementa la lógica para añadir un comentario
  }

  responder() {
    // Implementa la lógica para responder a un comentario
  }

  reportar() {
    // Implementa la lógica para reportar un comentario
  }
}