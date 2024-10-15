import { Component, OnInit } from '@angular/core';
import { Publicaciones } from '../../services/publicaciones';
import { ServicebdService } from '../../services/servicebd.service';
import { CommentsModalComponent } from '../../components/comments-modal/comments-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-testeos',
  templateUrl: './testeos.page.html',
  styleUrls: ['./testeos.page.scss'],
})
export class TesteosPage implements OnInit {
  publicaciones: Publicaciones[] = [];
  dbReady = false;
  isMenuOpen = false;

  constructor(private servicebd: ServicebdService, private modalController: ModalController) {}

  ngOnInit() {
    this.servicebd.dbState().subscribe((ready) => {
      if (ready) {
        this.dbReady = true;
        this.loadPublicaciones();
        console.log('La base de datos está lista');
      } else {
        console.log('La base de datos aún no está lista');
      }
    });
  }

  loadPublicaciones() {
    this.servicebd.fetchPublicaciones().subscribe((data) => {
      this.publicaciones = data;
    });
  }

  addPublicacion(titulo: string, content: string) {
    this.servicebd.insertarPublicacion(titulo, content)
      .then(() => {
        console.log("Publicación agregada con éxito");
        this.loadPublicaciones(); // Recargar publicaciones después de agregar
      })
      .catch(error => {
        console.error("Error al agregar publicación: ", error);
      });
  }

  editPublicacion(id: number, titulo: string, content: string) {
    this.servicebd.modificarPublicacion(id.toString(), titulo, content)
      .then(() => {
        console.log("Publicación editada con éxito");
        this.loadPublicaciones(); // Recargar publicaciones después de editar
      })
      .catch(error => {
        console.error("Error al editar publicación: ", error);
      });
  }

  deletePublicacion(id: number) {
    this.servicebd.eliminarNoticia(id.toString())
      .then(() => {
        console.log("Publicación eliminada con éxito");
        this.loadPublicaciones(); // Recargar publicaciones después de eliminar
      })
      .catch(error => {
        console.error("Error al eliminar publicación: ", error);
      });
  }

  async openComments(postId: number) {
    const modal = await this.modalController.create({
      component: CommentsModalComponent,
      componentProps: {
        postId: postId
      },
      cssClass: 'comments-modal'
    });
    return await modal.present();
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Puedes agregar estas funciones si las necesitas en el futuro
  comentar() {
    console.log('Comentar');
    this.closeMenu();
  }

  responder() {
    console.log('Responder');
    this.closeMenu();
  }

  reportar() {
    console.log('Reportar');
    this.closeMenu();
  }
}