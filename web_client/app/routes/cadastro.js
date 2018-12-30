module.exports = (app,fetch)=>{

    app.post('/cadastro',(req,res)=>{

        app.app.controllers.usuarioController.cadastro(app,fetch,req,res);
    });

}