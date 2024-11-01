import db from '../../config/db.js';

export async function inserirCliente(cliente) {
    const comando = `
        insert into usuarios (email, senha, nome, telefone, tipo_usuario) 
        values (?, ?, ?, ?, ?)
    `;
    
    let resposta = await db.query(comando, [cliente.email, cliente.senha, cliente.nome, cliente.telefone, cliente.tipo_usuario]);
    let info = resposta[0];
    
    return info.insertId;
}

export async function consultarCliente(idCliente) {
    const comando = `
        select   
            email, 
        from usuarios
        where id = ?
    `;

    let resposta = await db.query(comando, [idCliente]);
    let registros = resposta[0];

    return registros;
}

export async function alterarCliente(id, cliente) {
    const comando = `
        update usuarios 
        set email = ?,
        senha = ?,
        where id = ?
    `;

    let resposta = await db.query(comando, [cliente.email, cliente.nome, cliente.telefone, cliente.tipo_usuario, id]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerCliente(id) {
    const comando = `
        delete from usuarios 
        where id = ?
    `;

    let resposta = await db.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function consultarTodosClientes() {
    const comando = `
        select * from usuarios
    `;

    let resposta = await db.query(comando);
    return resposta[0];
}
