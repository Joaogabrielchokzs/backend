import con from "../repository/conection";


export async function inserirPedidos(pedido) {
    const comando = `
        insert into tb_diario (data_pedido, total, produto_id, quantidade, preco_unitario, peso_kg, cor_bolo, tipo_doce) 
					        values (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let resposta = await con.query(comando, [pedido.data_pedido, pedido.total, pedido.produtoId, pedido.quantidade, pedido.preco_unitario, pedido.peso_kg, pedido.cor_bolo, pedido.tipo_doce])
    let info = resposta[0];

    return info.insertId;
}


export async function consultarPedidos(idPedido) {
    const comando = `
    SELECT 
    pd.quantidade AS produto,
    pd.peso_kg AS peso,
    pd.tipo_doce AS tipo,
    pd.cor_bolo AS cor
FROM 
    pedidos pd
INNER JOIN 
    produtos p ON pd.produto_id = p.id;
    `;

    let resposta = await con.query(comando, [idPedido]);
    let registros = resposta[0];

    return registros;
}


export async function alterarPedido(id, pedido) {
    const comando = `
         update pedidos 
        data_pedido = ?,
        total = ?, 
        roduto_id = ?,
        quantidade = ?,
        preco_unitario = ?, 
        peso_kg = ?, 
        cor_bolo = ?, 
        tipo_doce = ?
            where id_pedido = ?
    `

    let resposta = await con.query(comando, [pedido.data_pedido, pedido.total, pedido.produtoId, pedido.quantidade, pedido.preco_unitario, pedido.peso_kg, pedido.cor_bolo, pedido.tipo_doce, id])
    let info = resposta[0];
    return info.affectedRows;
}


export async function removerPedido(id) {
    const comando = `
        delete from pedidos 
         where id_pedido = ?
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}

