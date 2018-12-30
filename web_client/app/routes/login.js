module.exports = (app,fetch)=>{

    app.post('/login',(req,res)=>{

        app.app.controllers.usuarioController.login(app,fetch,req,res);
    });

}