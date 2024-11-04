import con from "../repository/conection.js"



export async function validarLogin(pessoa){

    const comando = `
        select 
        email
        from login
        where 
        email =?
        and senha=?

    `;

    let registros = await con.query(comando, [pessoa.email, pessoa.senha])
  
    return registros[0][0]

}



export async function verificarLoginExistente(email, telefone) {
    const comando = `
        select * from login
        where email = ?
    `;
    let registros = await con.query(comando, [email, telefone]);
    return registros[0]; 
}

export async function verificarEmail(email) {
    const comando = `
        select email from login
        where email = ?
    `;
    let registros = await con.query(comando, [email]);
    return registros[0].length > 0;
}

export async function redefinirSenha(novaSenha, email, codigo) {
    const comando = `
        update login
        set senha = ? 
        where email = ? and codigo = ?
    `;
    
    const resultado = await con.query(comando, [novaSenha, email, codigo]);
    return resultado[0].affectedRows > 0;
}
 
export async function cadastrarCodigo(codigo, email){
    const comando = `
    update login
    set codigo = ? 
    where email = ? 
    `;
    const resultado = await con.query(comando, [codigo , email]);
    return resultado[0].affectedRows > 0;

}