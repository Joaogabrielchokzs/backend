import db from '../../config/db.js'; 

export const consultarPedidosPorUsuario = async (usuario_id) => {
    const [rows] = await db.query('SELECT * FROM pedidos WHERE usuario_id = ?', [usuario_id]);
    return rows;
};

export const inserirPedido = async (pedido) => {
    const { produto_id, quantidade, preco_unitario, peso_kg, cor_bolo, tipo_doce } = pedido;
    const [result] = await db.query(
        'INSERT INTO pedidos (usuario_id, produto_id, quantidade, preco_unitario, peso_kg, cor_bolo, tipo_doce) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [pedido.usuario_id, produto_id, quantidade, preco_unitario, peso_kg, cor_bolo, tipo_doce]
    );
    return result.insertId; 
};

export const alterarPedido = async (id, pedido) => {
    const { produto_id, quantidade, preco_unitario, peso_kg, cor_bolo, tipo_doce } = pedido;
    const [result] = await db.query(
        'UPDATE pedidos SET produto_id = ?, quantidade = ?, preco_unitario = ?, peso_kg = ?, cor_bolo = ?, tipo_doce = ? WHERE id = ?',
        [produto_id, quantidade, preco_unitario, peso_kg, cor_bolo, tipo_doce, id]
    );
    return result.affectedRows; 
};

export const removerPedido = async (id) => {
    const [result] = await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
    return result.affectedRows; 
};
