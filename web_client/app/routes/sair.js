module.exports = (app,fetch)=>{
    app.get('/sair',(req,res)=>{
        app.app.controllers.sairController.sair(app,req,res);
    });

}