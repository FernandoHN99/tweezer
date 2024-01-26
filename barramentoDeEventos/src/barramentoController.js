import express from "express";
import BarramentoService from './barramentoService.js';
import util from "./Util/util.js";
import ENUM from "./Util/enums.js"; // Importa os tipos de eventos

const router = express.Router();
class BarramentoController {

   constructor() {
      this.barramentoService = new BarramentoService(); // Instancie a service
   }

   async obterTodos(req, res) {
      try {
        const eventos = await this.barramentoService.obterTodosEventos();
        res.send(eventos);
      } catch (error) {
        res.status(500).send({
          error: "Ocorreu um erro ao obter os eventos."
        });
      }
   }

   async obterRequisicaoLogin(req, res) {
      let resultado;
      try {
        const idEvento = req.query.idEvento;
        const evento = await this.barramentoService.obterEvento(idEvento);
        if (evento === null) {
          throw new Error("Evento não encontrado.");
        }
        res.status(200).send(evento);
      } catch (error) {
         resultado = { msg: `${error}`, resultado: {userAuth: false}};
         res.status(500).send(resultado);
      }
   }

   async receberEventos(req, res){
      const {tipo, dados} = req.body;
      const evento = await this.barramentoService.adicionarEvento(tipo, dados);

      switch (tipo) {
         case ENUM.tiposEventos.USUARIO_LOGADO:
            await util.sendRequestPOST(`${ENUM.enderecosIP.SERVICO_USUARIO}/usuarios/eventos`, dados); 
            res.status(200).send({evento: evento});
            break;
         default:
            console.log("Tipo de evento não reconhecido:", evento.tipo);
            break;
      }
   }
}

router.get("/auth-user", async (req, res) => {
   const controller = new BarramentoController();
   await controller.obterRequisicaoLogin(req, res);
});

router.post("/", async (req, res) => {
   const controller = new BarramentoController();
   controller.receberEventos(req, res);
});

router.get("/", async (req, res) => {
   const controller = new BarramentoController();
   await controller.obterTodos(req, res);
});

export { BarramentoController, router };