// publicaciones.ts
export class Publicaciones {
  post_id: number;
  title: string;
  content: string;
  created_dt: string;
  picture?: string;
  Usuario_user_id: number;

  constructor(post_id: number, title: string, content: string, created_dt: string, Usuario_user_id: number, picture?: string) {
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.created_dt = created_dt;
    this.Usuario_user_id = Usuario_user_id;
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
export class usuarios {
  user_id: number;
  nick_name: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  avatar?: string;
  rol_rol_id: number;

  constructor(user_id: number, nick_name: string, nombre: string, apellido: string, email: string, password: string, rol_rol_id: number, avatar?: string) {
    this.user_id = user_id;
    this.nick_name = nick_name;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.rol_rol_id = rol_rol_id;
    this.avatar = avatar;
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
