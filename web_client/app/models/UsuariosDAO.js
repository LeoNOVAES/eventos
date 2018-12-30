function UsuariosDAO(){

}

UsuariosDAO.prototype.cadastrar = (fetch,dados,res)=>{

    const post  =`http://localhost:9000/api/cadastro/users/`;
    fetch(post,{
        method:'POST',
        body:JSON.stringify(dados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then((res)=>res.json())
    .then((json)=>{
        if(json.error){
            res.render('index',({res:json.status,error:json.error,user:{},autentic:{},token:{}}));
            return;
        }
        res.render('index',({res:json.status,error:{length:{}},user:{},autentic:{},token:{}}));

    })
    .catch((e)=>e);
}

UsuariosDAO.prototype.autenticUsuario = (app,fetch,dados,req,res)=>{
    const post = `http://localhost:9000/api/users/autentic`;
    fetch(post,{
         
        method:'POST',
        body:JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json',
           
        }
        
    })
    .then((res)=>res.json())
    .then((json)=>{
     
        if(json.results.length > 0 && json.token.length > 0){
            req.session.autentic = true;
            req.session.user = ' '+json.results[0].nome+' '+json.results[0].sobrenome;  
            req.session.token = json.token;
            req.session.id = json.results[0].id;
        }else{
            res.render('index',({res:'login errado',error:'',user:{},autentic:{},token:{}}));
        }
      
        if(json.token.length > 0){
            fetch(`http://localhost:9000/api/home`,{
                method:'GET',
                headers: {"Authorization":json.token}
            })
            .then(res=>res.json())
            .then((json)=>{
    
                if(json.autentic){
                    res.render('index',({res:'',error:'',user:req.session.user,autentic:req.session.autentic,token:req.session.token}));
                }

                if(json.status ==  'Falha ao autenticar token'){
                    res.render('index',({res:'login errado',error:'',user:{},autentic:{},token:{}}));
                }
            }); 
        }
    })
    
    .catch((err)=>err);
}


module.exports = ()=>{
    return UsuariosDAO;

}