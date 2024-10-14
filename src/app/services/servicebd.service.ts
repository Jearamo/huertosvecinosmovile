import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicaciones } from './publicaciones';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas
  tablaPublicaciones: string = "CREATE TABLE IF NOT EXISTS publicaciones(postid INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, content TEXT NOT NULL);";

  //variables para los insert por defecto en nuestras tablas
  registroPublicaciones: string = "INSERT or IGNORE INTO publicaciones(postid, titulo, content) VALUES (1,'Soy un titulo', 'Soy el texto de esta publicación que se esta insertando de manera autmática')";

  //variables para guardar los datos de las consultas en las tablas
  listadoPublicaciones = new BehaviorSubject([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD();
   }

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchPublicaciones(): Observable<Publicaciones[]>{
    return this.listadoPublicaciones.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
createBD() {
  this.platform.ready().then(() => {
    console.log("Plataforma lista, intentando crear la BD");
    this.sqlite.create({
      name: 'publicaciones.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      this.presentAlert('Base de Datos', 'Base de Datos inicializada correctamente');
      this.crearTablas();  // Llamada a la función crearTablas
    }).catch(e => {
      this.presentAlert('Error', 'Error en crear la BD: ' + JSON.stringify(e));
    });
  });
}

// Mueve la función crearTablas aquí fuera
async crearTablas() {
  try {
    await this.database.executeSql(this.tablaPublicaciones, []);  // Creación de la tabla
    await this.database.executeSql(this.registroPublicaciones, []);  // Inserción por defecto
    this.seleccionarPublicaciones();  // Selecciona las publicaciones y actualiza el listado
    this.isDBReady.next(true);  // Marca la base de datos como lista
  } catch (e) {
    this.presentAlert('Error', 'Error en crear las tablas: ' + JSON.stringify(e));
    console.error('Error en crear tablas: ', e);
  }
}


  seleccionarPublicaciones(){
    return this.database.executeSql('SELECT * FROM publicaciones', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Publicaciones[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            postid: res.rows.item(i).postid,
            titulo: res.rows.item(i).titulo,
            content: res.rows.item(i).content
          })
        }
        
       }
       //actualizar el observable
       this.listadoPublicaciones.next(items as any);

    })
  }

  eliminarNoticia(postid:string){
    return this.database.executeSql('DELETE FROM publicaciones WHERE postid = ?',[postid]).then(res=>{
      this.presentAlert("Eliminar","Publicación Eliminada");
      this.seleccionarPublicaciones();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarPublicacion(postid: string, titulo: string, content: string) {
    this.presentAlert("service", "ID: " + postid);
    
    return this.database.executeSql('UPDATE publicaciones SET titulo = ?, content = ? WHERE postid = ?', [titulo, content, postid])
      .then(res => {
        if (res.rowsAffected > 0) {
          this.presentAlert("Modificar", "Noticia Modificada");
        } else {
          this.presentAlert("Modificar", "No se encontró la publicación");
        }
        this.seleccionarPublicaciones(); // Actualiza el listado de publicaciones
      })
      .catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      });
  }
  

  insertarPublicacion(titulo:string, content:string){
    return this.database.executeSql('INSERT INTO publicaciones(titulo,content) VALUES (?,?)',[titulo, content]).then(res=>{
      this.presentAlert("Insertar","Noticia Registrada");
      this.seleccionarPublicaciones();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
    
  }


}
