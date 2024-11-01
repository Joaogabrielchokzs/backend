import { autenticar } from '../../utils/jwt.js';
import * as db from '../controller/pedidoController.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/pedido', autenticar, async (req, resp) => {
    try {
        let idUsuario = req.user.id; 
        let registros = await db.consultarPedidosPorUsuario(idUsuario);
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/pedido/', autenticar, async (req, resp) => {
    try {
        let pedido = req.body;
        pedido.usuario_id = req.user.id; 

        let id = await db.inserirPedido(pedido);
        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/pedido/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let pedido = req.body;

        let linhasAfetadas = await db.alterarPedido(id, pedido);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum pedido encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/pedido/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerPedido(id);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum pedido encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;

