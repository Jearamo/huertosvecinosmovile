// publicaciones.ts
export class Publicaciones {
  post_id: number;
  title: string;
  content: string;
  created_dt: string;
  picture?: string;
  Usuario_user_id: number;
  tema_id_tema: number;

  constructor(post_id: number, title: string, content: string, created_dt: string, Usuario_user_id: number, tema_id_tema: number, picture?: string) {
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.created_dt = created_dt;
    this.Usuario_user_id = Usuario_user_id;
    this.tema_id_tema = tema_id_tema;
    this.picture = picture;
  }
}

export class Comentario {
  comment_id: number;
  content: string;
  created_date: string;
  Usuario_user_id: number;
  Publicaciones_post_id: number;

  constructor(comment_id: number, content: string, created_date: string, Usuario_user_id: number, Publicaciones_post_id: number) {
    this.comment_id = comment_id;
    this.content = content;
    this.created_date = created_date;
    this.Usuario_user_id = Usuario_user_id;
    this.Publicaciones_post_id = Publicaciones_post_id;
  }
}

// usuario.ts
export class Usuario {
  user_id: number;
  nick_name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  rol_rol_id: number;

  constructor(user_id: number, nick_name: string, email: string, password: string, rol_rol_id: number, bio?: string, avatar?: string) {
    this.user_id = user_id;
    this.nick_name = nick_name;
    this.email = email;
    this.password = password;
    this.rol_rol_id = rol_rol_id;
    this.bio = bio;
    this.avatar = avatar;
  }
}

// tema.ts
export class Tema {
  id_tema: number;
  nombre: string;

  constructor(id_tema: number, nombre: string) {
    this.id_tema = id_tema;
    this.nombre = nombre;
  }
}

// reporte.ts
export class Reporte {
  report_id: number;
  reason: string;
  created_date_report: string;
  Usuario_user_id: number;
  status: string;
  tipo: string;
  conclusion_reporte?: string;

  constructor(report_id: number, reason: string, created_date_report: string, Usuario_user_id: number, status: string, tipo: string, conclusion_reporte?: string) {
    this.report_id = report_id;
    this.reason = reason;
    this.created_date_report = created_date_report;
    this.Usuario_user_id = Usuario_user_id;
    this.status = status;
    this.tipo = tipo;
    this.conclusion_reporte = conclusion_reporte;
  }
}

// Ejemplo de uso
const nuevaPublicacion = new Publicaciones(1, "Título de la publicación", "Contenido de la publicación", "2024-10-14T10:00:00", 1, 1);

const nuevoComentario = new Comentario(1, "Este es un comentario.", "2024-10-14T10:15:30", 1, 1);

const nuevoUsuario = new Usuario(1, "usuario123", "usuario@example.com", "contraseña123", 1, "Biografía del usuario", "avatar.jpg");

const nuevoTema = new Tema(1, "Tecnología");

const nuevoReporte = new Reporte(1, "Contenido inapropiado", "2024-10-14T11:00:00", 1, "Pendiente", "Publicación");