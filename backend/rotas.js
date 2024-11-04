import pedidoController from '../backend/src/controller/pedidosController.js'
import produtosController from '../backend/src/controller/produtosController.js'
import usuariosContoller from '../backend/src/controller/usuariosController.js'

export default function adicionarRotas(servidor) {
    servidor.use(pedidoController);
    servidor.use(produtosController);
    servidor.use(usuariosContoller);
    
    
}
