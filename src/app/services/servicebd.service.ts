import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicaciones } from './publicaciones';
import { Comentario } from './publicaciones';
import { Usuario } from './publicaciones';
import { Tema } from './publicaciones';
import { Reporte } from './publicaciones';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  public database!: SQLiteObject;

  // Variables de creación de Tablas
  private tablaRol: string = `
    CREATE TABLE IF NOT EXISTS rol (
      rol_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_rol TEXT NOT NULL
    );
  `;

  private tablaUsuarios: string = `
    CREATE TABLE IF NOT EXISTS usuarios (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nick_name TEXT NOT NULL UNIQUE,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      fecha_nacimiento TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      bio TEXT,
      avatar TEXT,
      rol_rol_id INTEGER DEFAULT 2,
      FOREIGN KEY (rol_rol_id) REFERENCES rol(rol_id)
    );
  `;

  tablaTema: string = `CREATE TABLE IF NOT EXISTS tema (
    id_tema INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL
  );`;

  tablaPublicaciones: string = `CREATE TABLE IF NOT EXISTS publicaciones (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(20) NOT NULL,
    content VARCHAR(150) NOT NULL,
    created_dt DATE DEFAULT CURRENT_TIMESTAMP,
    picture VARCHAR(50),
    Usuario_user_id INTEGER,
    tema_id_tema INTEGER,
    FOREIGN KEY (Usuario_user_id) REFERENCES Usuario(user_id),
    FOREIGN KEY (tema_id_tema) REFERENCES tema(id_tema)
  );`;

  tablaComentarios: string = `CREATE TABLE IF NOT EXISTS comentarios (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content VARCHAR(200) NOT NULL,
    created_date DATE DEFAULT CURRENT_TIMESTAMP,
    Usuario_user_id INTEGER,
    Publicaciones_post_id INTEGER,
    FOREIGN KEY (Usuario_user_id) REFERENCES Usuario(user_id),
    FOREIGN KEY (Publicaciones_post_id) REFERENCES Publicaciones(post_id)
  );`;

  tablaReporte: string = `CREATE TABLE IF NOT EXISTS reporte (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reason VARCHAR(150) NOT NULL,
    created_date_report DATE DEFAULT CURRENT_TIMESTAMP,
    Usuario_user_id INTEGER,
    status VARCHAR(15) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    conclusion_reporte VARCHAR(150),
    FOREIGN KEY (Usuario_user_id) REFERENCES Usuario(user_id)
  );`;

  // Variables para los inserts por defecto
  registroPublicaciones: string = "INSERT or IGNORE INTO publicaciones(post_id, title, content) VALUES (1, 'Soy un titulo', 'Soy el texto de esta publicación que se está insertando de manera automática')";

  // Variables para guardar los datos de las consultas
  listadopublicaciones = new BehaviorSubject<Publicaciones[]>([]);
  listadoUsuarios = new BehaviorSubject<Usuario[]>([]);
  listadoTemas = new BehaviorSubject<Tema[]>([]);
  listadoReportes = new BehaviorSubject<Reporte[]>([]);

  // Variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite,private platform: Platform,private alertController: AlertController) {
    this.createBD();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Métodos para manipular los observables
  fetchPublicaciones(): Observable<Publicaciones[]> {
    return this.listadopublicaciones.asObservable();
  }

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listadoUsuarios.asObservable();
  }

  fetchTemas(): Observable<Tema[]> {
    return this.listadoTemas.asObservable();
  }

  fetchReportes(): Observable<Reporte[]> {
    return this.listadoReportes.asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  private async insertDefaultRoles() {
    try {
      const roles = [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user' }
      ];
      for (const role of roles) {
        await this.database.executeSql(
          'INSERT OR IGNORE INTO rol (rol_id, name_rol) VALUES (?, ?)',
          [role.id, role.name]
        );
      }
      console.log('Default roles inserted successfully');
    } catch (error) {
      console.error('Error inserting default roles:', error);
    }
  }
  
  // Función para crear la Base de Datos
  createBD() {
    this.platform.ready().then(() => {
      console.log("Plataforma lista, intentando crear la BD");
      this.sqlite.create({
        name: 'publicaciones.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentAlert('Base de Datos', 'Base de Datos inicializada correctamente');
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Error', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql('DROP TABLE IF EXISTS Usuarios', []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaTema, []);
      await this.database.executeSql(this.tablaPublicaciones, []);
      await this.database.executeSql(this.tablaComentarios, []);
      await this.database.executeSql(this.tablaReporte, []);
      await this.database.executeSql(this.registroPublicaciones, []);
      await this.insertDefaultRoles();
      this.seleccionarPublicaciones();
      this.seleccionarUsuarios();
      this.seleccionarTemas();
      this.seleccionarReportes();
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Error', 'Error en crear las tablas: ' + JSON.stringify(e));
      console.error('Error en crear tablas: ', e);
    }
  }

  // Métodos para Publicaciones
  seleccionarPublicaciones() {
    return this.database.executeSql('SELECT * FROM Publicaciones', []).then(res => {
      let items: Publicaciones[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            post_id: res.rows.item(i).post_id,
            title: res.rows.item(i).title,
            content: res.rows.item(i).content,
            created_dt: res.rows.item(i).created_dt,
            picture: res.rows.item(i).picture,
            Usuario_user_id: res.rows.item(i).Usuario_user_id,
            tema_id_tema: res.rows.item(i).tema_id_tema
          });
        }
      }
      this.listadopublicaciones.next(items);
    });
  }

  async buscarUsuarioPorEmail(email: string): Promise<boolean> {
    const sql = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
    const result = await this.database.executeSql(sql, [email]);
    return result.rows.item(0).count > 0; // Esto debería devolver true si hay un usuario con ese correo
  }

  insertarPublicacion(title: string, content: string, picture: string, Usuario_user_id: number, tema_id_tema: number) {
    return this.database.executeSql('INSERT INTO Publicaciones(title, content, picture, Usuario_user_id, tema_id_tema) VALUES (?, ?, ?, ?, ?)', [title, content, picture, Usuario_user_id, tema_id_tema]).then(res => {
      this.presentAlert("Insertar", "Publicación Registrada");
      this.seleccionarPublicaciones();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarPublicacion(post_id: number, title: string, content: string, picture: string) {
    return this.database.executeSql('UPDATE publicaciones SET title = ?, content = ?, picture = ? WHERE post_id = ?', [title, content, picture, post_id])
      .then(res => {
        if (res.rowsAffected > 0) {
          this.presentAlert("Modificar", "Publicación Modificada");
        } else {
          this.presentAlert("Modificar", "No se encontró la publicación");
        }
        this.seleccionarPublicaciones();
      })
      .catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      });
  }

  eliminarPublicacion(post_id: number) {
    return this.database.executeSql('DELETE FROM publicaciones WHERE post_id = ?', [post_id]).then(res => {
      this.presentAlert("Eliminar", "Publicación Eliminada");
      this.seleccionarPublicaciones();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  // Métodos para Comentarios
  insertarComentario(content: string, Usuario_user_id: number, Publicaciones_post_id: number) {
    return this.database.executeSql('INSERT INTO Comentarios(content, Usuario_user_id, Publicaciones_post_id) VALUES (?, ?, ?)', [content, Usuario_user_id, Publicaciones_post_id]).then(res => {
      this.presentAlert("Insertar", "Comentario Registrado");
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  getComentarios(Publicaciones_post_id: number): Promise<Comentario[]> {
    return this.database.executeSql('SELECT * FROM comentarios WHERE Publicaciones_post_id = ?', [Publicaciones_post_id]).then(res => {
      let items: Comentario[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            comment_id: res.rows.item(i).comment_id,
            content: res.rows.item(i).content,
            created_date: res.rows.item(i).created_date,
            Usuario_user_id: res.rows.item(i).Usuario_user_id,
            Publicaciones_post_id: res.rows.item(i).Publicaciones_post_id
          });
        }
      }
      return items;
    }).catch(e => {
      this.presentAlert('Error', 'Error al obtener comentarios: ' + JSON.stringify(e));
      return [];
    });
  }

  eliminarComentario(comment_id: number) {
    return this.database.executeSql('DELETE FROM comentarios WHERE comment_id = ?', [comment_id]).then(res => {
      this.presentAlert("Eliminar", "Comentario Eliminado");
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  // Métodos para Usuarios
  seleccionarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuarios', []).then(res => { // Cambiado de Usuario a usuarios
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            user_id: res.rows.item(i).user_id,
            nick_name: res.rows.item(i).nick_name,
            email: res.rows.item(i).email,
            password: res.rows.item(i).password,
            bio: res.rows.item(i).bio,
            avatar: res.rows.item(i).avatar,
            rol_rol_id: res.rows.item(i).rol_rol_id
          });
        }
      }
      this.listadoUsuarios.next(items);
    });
  }

  async insertarUsuario(
    nick_name: string,
    nombre: string,
    apellido: string,
    fecha_nacimiento: string,
    email: string,
    password: string,
    bio: string = '',
    avatar: string = '',
    rol_rol_id: number = 2
  ) {
    try {
      const sql = `
        INSERT INTO usuarios (
          nick_name, nombre, apellido, fecha_nacimiento, 
          email, password, bio, avatar, rol_rol_id
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const result = await this.database.executeSql(sql, [
        nick_name, nombre, apellido, fecha_nacimiento,
        email, password, bio, avatar, rol_rol_id
      ]);
      
      console.log('Usuario insertado:', result);
      return true;
    } catch (error) {
      console.error('Error en insertarUsuario:', error);
      throw error;
    }
  }

  async getTableInfo(tableName: string) {
    try {
      const result = await this.database.executeSql(`PRAGMA table_info(${tableName})`, []);
      let columns = [];
      for (let i = 0; i < result.rows.length; i++) {
        columns.push(result.rows.item(i));
      }
      console.log(`Estructura de la tabla ${tableName}:`, columns);
      return columns;
    } catch (error) {
      console.error(`Error obteniendo información de la tabla ${tableName}:`, error);
      throw error;
    }
  }

  // Métodos para Temas
  seleccionarTemas() {
    return this.database.executeSql('SELECT * FROM tema', []).then(res => {
      let items: Tema[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_tema: res.rows.item(i).id_tema,
            nombre: res.rows.item(i).nombre
          });
        }
      }
      this.listadoTemas.next(items);
    });
  }

  insertarTema(nombre: string) {
    return this.database.executeSql('INSERT INTO tema(nombre) VALUES (?)', [nombre]).then(res => {
      this.presentAlert("Insertar", "Tema Registrado");
      this.seleccionarTemas();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
    const result = await this.database.executeSql(query, [email]);
    return result.rows.item(0).count > 0;
  }

  // Método para verificar si existe un nickname
  async checkNicknameExists(nickname: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) as count FROM usuarios WHERE nick_name = ?';
    const result = await this.database.executeSql(query, [nickname]);
    return result.rows.item(0).count > 0;
  }

  // Métodos para Reportes
  seleccionarReportes() {
    return this.database.executeSql('SELECT * FROM reporte', []).then(res => {
      let items: Reporte[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            report_id: res.rows.item(i).report_id,
            reason: res.rows.item(i).reason,
            created_date_report: res.rows.item(i).created_date_report,
            Usuario_user_id: res.rows.item(i).Usuario_user_id,
            status: res.rows.item(i).status,
            tipo: res.rows.item(i).tipo,
            conclusion_reporte: res.rows.item(i).conclusion_reporte
          });
        }
      }
      this.listadoReportes.next(items);
    });
  }

  insertarReporte(reason: string, Usuario_user_id: number, status: string, tipo: string, conclusion_reporte: string) {
    return this.database.executeSql('INSERT INTO reporte(reason, Usuario_user_id, status, tipo, conclusion_reporte) VALUES (?, ?, ?, ?, ?)', [reason, Usuario_user_id, status, tipo, conclusion_reporte]).then(res => {
      this.presentAlert("Insertar", "Reporte Registrado");
      this.seleccionarReportes();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarReporte(report_id: number, status: string, conclusion_reporte: string) {
    return this.database.executeSql('UPDATE reporte SET status = ?, conclusion_reporte = ? WHERE report_id = ?', [status, conclusion_reporte, report_id])
      .then(res => {
        if (res.rowsAffected > 0) {
          this.presentAlert("Modificar", "Reporte Actualizado");
        } else {
          this.presentAlert("Modificar", "No se encontró el reporte");
        }
        this.seleccionarReportes();
      })
      .catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      });
  }

  eliminarReporte(report_id: number) {
    return this.database.executeSql('DELETE FROM reporte WHERE report_id = ?', [report_id]).then(res => {
      this.presentAlert("Eliminar", "Reporte Eliminado");
      this.seleccionarReportes();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  // Métodos adicionales para rol
  insertarRol(name_rol: string) {
    return this.database.executeSql('INSERT INTO rol(name_rol) VALUES (?)', [name_rol]).then(res => {
      this.presentAlert("Insertar", "Rol Registrado");
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  obtenerRoles(): Promise<{rol_id: number, name_rol: string}[]> {
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      let roles: {rol_id: number, name_rol: string}[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          roles.push({
            rol_id: res.rows.item(i).rol_id,
            name_rol: res.rows.item(i).name_rol
          });
        }
      }
      return roles;
    });
  }

  // Método para obtener publicaciones con información del usuario y tema
  obtenerPublicacionesConDetalles(): Promise<any[]> {
    const query = `
      SELECT p.*, u.nick_name, t.nombre as tema_nombre
      FROM publicaciones p
      LEFT JOIN usuarios u ON p.Usuario_user_id = u.user_id
      LEFT JOIN tema t ON p.tema_id_tema = t.id_tema
      ORDER BY p.created_dt DESC
    `;
    return this.database.executeSql(query, []).then(res => {
      let publicaciones: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          publicaciones.push({
            post_id: res.rows.item(i).post_id,
            title: res.rows.item(i).title,
            content: res.rows.item(i).content,
            created_dt: res.rows.item(i).created_dt,
            picture: res.rows.item(i).picture,
            Usuario_user_id: res.rows.item(i).Usuario_user_id,
            tema_id_tema: res.rows.item(i).tema_id_tema,
            nick_name: res.rows.item(i).nick_name,
            tema_nombre: res.rows.item(i).tema_nombre
          });
        }
      }
      return publicaciones;
    });
  }

  // Método para buscar publicaciones por título o contenido
  buscarPublicaciones(termino: string): Promise<any[]> {
    const query = `
      SELECT p.*, u.nick_name, t.nombre as tema_nombre
      FROM publicaciones p
      LEFT JOIN usuarios u ON p.Usuario_user_id = u.user_id
      LEFT JOIN tema t ON p.tema_id_tema = t.id_tema
      WHERE p.title LIKE ? OR p.content LIKE ?
      ORDER BY p.created_dt DESC
    `;
    const searchTerm = `%${termino}%`;
    return this.database.executeSql(query, [searchTerm, searchTerm]).then(res => {
      let publicaciones: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          publicaciones.push({
            post_id: res.rows.item(i).post_id,
            title: res.rows.item(i).title,
            content: res.rows.item(i).content,
            created_dt: res.rows.item(i).created_dt,
            picture: res.rows.item(i).picture,
            Usuario_user_id: res.rows.item(i).Usuario_user_id,
            tema_id_tema: res.rows.item(i).tema_id_tema,
            nick_name: res.rows.item(i).nick_name,
            tema_nombre: res.rows.item(i).tema_nombre
          });
        }
      }
      return publicaciones;
    });
  }

  // Método para obtener publicaciones
  async obtenerPublicaciones(): Promise<any[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM publicaciones', []);
      const publicaciones = [];
      for (let i = 0; i < result.rows.length; i++) {
        publicaciones.push(result.rows.item(i));
      }
      return publicaciones; // Asegúrate de devolver el array
    } catch (error) {
      console.error('Error al obtener publicaciones: ', error);
      throw error;
    }
  }

  // Método para obtener usuarios
  async obtenerUsuarios(): Promise<any[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM usuarios', []); // Cambiado de Usuario a usuarios
      const usuarios = [];
      for (let i = 0; i < result.rows.length; i++) {
        usuarios.push(result.rows.item(i));
      }
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios: ', error);
      throw error;
    }
  }

  // Método para obtener temas
  async obtenerTemas(): Promise<any[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM temas', []);
      const temas = [];
      for (let i = 0; i < result.rows.length; i++) {
        temas.push(result.rows.item(i));
      }
      return temas; // Devolver el array de temas
    } catch (error) {
      console.error('Error al obtener temas: ', error);
      throw error;
    }
  }

  // Método para obtener reportes
  async obtenerReportes(): Promise<any[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM reportes', []);
      const reportes = [];
      for (let i = 0; i < result.rows.length; i++) {
        reportes.push(result.rows.item(i));
      }
      return reportes; // Devolver el array de reportes
    } catch (error) {
      console.error('Error al obtener reportes: ', error);
      throw error;
    }
  }

  // Método para obtener comentarios de un usuario
  async obtenerComentariosConUsuario(userId: number): Promise<any[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM comentarios WHERE Usuario_user_id = ?', [userId]);
      const comentarios = [];
      for (let i = 0; i < result.rows.length; i++) {
        comentarios.push(result.rows.item(i));
      }
      return comentarios; // Devolver el array de comentarios
    } catch (error) {
      console.error('Error al obtener comentarios: ', error);
      throw error;
    }
  }
  
  actualizarPublicacion(id: number, title: string, content: string, picture: string, Usuario_user_id: number, tema_id_tema: number): Promise<void> {
    // Aquí iría la lógica para actualizar la publicación en la base de datos
    return new Promise((resolve, reject) => {
      // Supongamos que usas SQLite o alguna lógica similar para actualizar
      const query = 'UPDATE publicaciones SET title = ?, content = ?, picture = ?, Usuario_user_id = ?, tema_id_tema = ? WHERE id = ?';
      const params = [title, content, picture, Usuario_user_id, tema_id_tema, id];
  
      this.database.executeSql(query, params)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }
  
}