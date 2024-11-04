import con from "../repository/conection.js";


export async function inserirProduto(produto) {
    const comando = `
        insert into agendamento (nome, descricao, preco, imagem_url, tipo) 
					        values (?, ?, ?, ?, ?)
    `;
    
    let resposta = await con.query(comando, [produto.nome, produto.descricao, produto.preco, produto.imagem, produto.tipo])
    let info = resposta[0];
    
    return info.insertId;
}


export async function consultarProduto(idProduto) {
    const comando = `
    SELECT 
    p.nome AS produto,
    p.descricao,
    p.preco,
    p.tipo
FROM 
    pedidos pd
INNER JOIN 
    produtos p ON pd.produto_id = p.id_produto;
`;

    let resposta = await con.query(comando, [idProduto]);
    let registros = resposta[0];

    return registros;
}

export async function alterarProduto(id, produto) {
    const comando = `
         update mome = ?, 
         descricao = ?, 
         preco = ?, 
         imagem_url = ?, 
         tipo = ?

         where id_produto = ?
    `

    let resposta = await con.query(comando, [produto.nome, produto.descricao, produto.preco, produto.imagem, produto.tipo, id])
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerProduto(id) {
    const comando = `
        delete from produtos 
         where id_produto = ?
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}

