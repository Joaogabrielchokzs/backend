import { autenticar } from '../../utils/jwt.js';

import * as db from '../repository/produtosRepository.js';

import { Router } from "express";
const endpoints = Router();


endpoints.get('/produto', autenticar, async (req, resp) => {
    try {
        let idProduto = req.user.id;
        let registros = await db.consultarProduto(idProduto);
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/produto/', autenticar, async (req, resp) => {
    try {
        let produto = req.body;
        produto.idProduto = req.user.id;

        console.log(produto)

        let id = await db.inserirProduto(produto);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.put('/produto/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let produto = req.body;

        let linhasAfetadas = await db.alterarProduto(id, produto);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Este produto não foi encontrado/listado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.delete('/produto/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerProduto(id);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum produto encontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

  export default endpoints;