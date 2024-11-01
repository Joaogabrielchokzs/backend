import clienteController from'././../backend/src/Controller/clienteControlller.js'
import pedidoController from'././../backend/src/Controller/pedidoController.js'

export default function adicionarRotas(servidor) {
    servidor.use(clienteController);
    servidor.use(pedidoController);
}
