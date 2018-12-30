module.exports.home = (app,fetch,req,res)=>{
    res.render("index",({res:{},error:'',user:{},autentic:{},token:{}}));
}