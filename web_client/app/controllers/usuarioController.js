module.exports.cadastro = (app,fetch,req,res)=>{
    const UsuariosDAO  = new app.app.models.UsuariosDAO();
    const dados = req.body;
    UsuariosDAO.cadastrar(fetch,dados,res);
}

module.exports.login = (app,fetch,req,res)=>{
    const UsuariosDAO = new app.app.models.UsuariosDAO();
    const dados = req.body;
    UsuariosDAO.autenticUsuario(app,fetch,dados,req,res);
}