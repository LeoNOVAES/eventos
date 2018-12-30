module.exports.sair = (app,req,res)=>{

    req.session.destroy((err)=>{
        res.render("index",({res:{},error:{},user:{},autentic:{},token:{}}));
    });
    
}