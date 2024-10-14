import { Component, OnInit } from '@angular/core';
import { Publicaciones } from '../../services/publicaciones'; // Asegúrate de usar la ruta correcta
import { ServicebdService } from '../../services/servicebd.service'; // Asegúrate de usar la ruta correcta


@Component({
  selector: 'app-testeos',
  templateUrl: './testeos.page.html',
  styleUrls: ['./testeos.page.scss'],
})
export class TesteosPage {
  publicaciones: Publicaciones[] = [];
  dbReady = false;

  constructor(private servicebd: ServicebdService) {}

  ngOnInit() {
    this.servicebd.dbState().subscribe((ready) => {
      if (ready) {
        this.dbReady = true;
        console.log('La base de datos está lista');
        this.servicebd.fetchPublicaciones().subscribe((data) => {
          this.publicaciones = data;
        });
      } else {
        console.log('La base de datos aún no está lista');
      }
    });
  }

  addPublicacion(titulo: string, content: string) {
    this.servicebd.insertarPublicacion(titulo, content);
  }

  editPublicacion(id: number, titulo: string, content: string) {
    this.servicebd.modificarPublicacion(id.toString(), titulo, content); // Convierte a string aquí si es necesario para el servicio
  }

  deletePublicacion(id: number) {
    this.servicebd.eliminarNoticia(id.toString()); // Convierte a string aquí si es necesario para el servicio
  }
}


