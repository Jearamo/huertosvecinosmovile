export class Publicaciones {
    postid!: number;
    titulo!: string;
    content!: string;
  
    constructor(postid: number, titulo: string, content: string) {
      this.postid = postid;
      this.titulo = titulo;
      this.content = content;
    }
  }
  
  export class Comentario {
    comentarioId!: number;
    postId!: number; 
    userId!: string;
    texto!: string;
    createdAt!: string;
  }
  
  // Ejemplo de uso
  const nuevaPublicacion = new Publicaciones(1, "Título de la publicación", "Contenido de la publicación");
  
  const nuevoComentario = new Comentario();
nuevoComentario.comentarioId = 1;
nuevoComentario.postId = 1;
nuevoComentario.userId = "user123";
nuevoComentario.texto = "Este es un comentario.";
nuevoComentario.createdAt = "2024-10-14T10:15:30";