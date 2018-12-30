const crypto = require('crypto');
const express = require("express");
const app = express();
const expressValidator = require('express-validator');
const connection = require('./connections/conection')();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const authMiddle = require('./middlewares/auth');
const authConfig = require('./config/auth.json');   
const port = 9000;
var token;
app.listen(port,()=>{

    console.log(`Rodando na porta ${port}`);
});


app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    res.setHeader("Access-Control-Allow-Credentials",true);
  
    next();
});

var erros;


app.post('/api/cadastro/users/',(req,res)=>{
    let dados = req.body;
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('sobrenome', 'Sobrenome não pode ser vazio').notEmpty();
	req.assert('email', 'Email não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    erros = req.validationErrors();

    if(erros.length > 0){
        res.status(500).json({'status':'error','error':erros});
        console.log(erros);
        return;
    }

    dados.senha = crypto.createHash("md5").update(dados.senha).digest("hex");
   
        connection.query(`SELECT email FROM users WHERE email = '${dados.email}'`,(error,results)=>{
            if(results.length > 0){
                res.status(500).json({'status':'email ja existe!'});
            }else{
                connection.query("INSERT INTO users SET ?",dados,(err,resul)=>{
                    if(err){
                        res.status(500).json({'status':err});
                    }else{
                        res.status(200).json({'status':'Adicionado com sucesso'});
            
                    }
                });

            }
    });
});

app.post('/api/users/autentic',(req,res)=>{
    let dados = req.body;
    dados.senha = crypto.createHash("md5").update(dados.senha).digest("hex")
    connection.query(`SELECT * FROM users WHERE email = '${dados.email}' AND senha ='${dados.senha}'`,(err,result,fields)=>{
        
        if(err){
            throw err;

        }else if(result.length > 0){
            let token = jwt.sign({id:result.id},authConfig.secret,{
                expiresIn:86400
            });

            res.status(200).json({'results':result,'token':token});
        }else{
            res.status(500).json({'results':{},'token':{}});
        }
    });
});



app.use(function(req,res,next){
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

    if(token){
        jwt.verify(token, authConfig.secret,(err,decoded)=>{
            if(err){
                return res.status(403).json({'status':'Falha ao autenticar token'});
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.status(403).json({'status':'nao existe token'});
        
    }

    next();
});

app.get('/api/home',(req,res)=>{
    res.status(200).json({'autentic':true});
});


app.get('/api/oimundo',(req,res)=>{
    res.send('Essa porra');
});



