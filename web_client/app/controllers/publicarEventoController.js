module.exports.publicar = (app,req,res)=>{
   if(req.session.autentic){
        res.render('publicarEvento');
   }else{
       res.send('4004 NOT FOUND');
   }
}