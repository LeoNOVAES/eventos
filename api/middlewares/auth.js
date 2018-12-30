
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
module.exports = (req,res,next)=>{
    const authHeader = req.headers.autentic;

    if(!authHeader){
        return res.status(401).send({error:'Nao existe token'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({error:'TOken error'});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error:'Token malformatado'});
    }

    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
          return  res.status(401).send({error:'token errado'});
        }

        req.userId = decoded.id;
    });

    next();
}