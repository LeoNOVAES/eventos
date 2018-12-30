module.exports = (app)=>{
    app.get('/publicar',(req,res)=>{
        app.app.controllers.publicarEventoController.publicar(app,req,res);
    });
}