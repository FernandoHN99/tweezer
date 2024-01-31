export default class ENUM {
  
  static get tiposEventos() {
    return {
      USUARIO_LOGADO: "usuario_logado",
      POST_CRIADO: "post_criado"
    };
  }

  static get portas() {
    return {
      PORTA_USUARIO: 5001,
      PORTA_POSTS: 5002,
      PORTA_BARRAMENTO: 10000,
      PORTA_API_SPOTIFY: 8888,
    };
  }

  static get enderecosIP() {
    return {
      SERVICO_USUARIO: `http://tweezer-usuarios.127.0.0.1.nip.io`,
      SERVICO_POSTS: `http://tweezer-posts.127.0.0.1.nip.io`,
      SERVICO_BARRAMENTO: `http://tweezer-barramento.127.0.0.1.nip.io`,
      SERVICO_API_SPOTIFY: `http://tweezer-apispotify.127.0.0.1.nip.io`,
      
    };
  }

  static URL_EXTERNA_FRONTEND = "http://tweezer.127.0.0.1.nip.io";


  static get tiposParamsTopGlobais() {
    return {
      MUSICAS: "musicas",
      ALBUNS: "albuns",
      ARTISTAS: "artistas"
    };
  }

}

export { ENUM };
