import { autenticar } from '../../utils/jwt.js';
import * as db from '../controller/clienteController.js'; 
import { Router } from "express";

const endpoints = Router();

endpoints.get('/usuarios', autenticar, async (req, resp) => {
    try {
        let idUsuario = req.user.id; 
        let registros = await db.consultarUsuario(idUsuario); 
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/usuario/', async (req, resp) => { 
    try {
        let usuario = req.body;

        console.log(usuario);

        let id = await db.inserirUsuario(usuario); 

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

endpoints.put('/usuario/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let usuario = req.body;

        let linhasAfetadas = await db.alterarUsuario(id, usuario);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum usuário encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/usuario/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerUsuario(id);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum usuário encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;
