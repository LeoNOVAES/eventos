module.exports = (app,fetch)=>{
    app.get('/',(req,res)=>{
        app.app.controllers.indexController.home(app,fetch,req,res);
    })

}