const express = require("express");
const app = express();
const consign = require("consign");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const expressSession = require('express-session');
app.set("view engine","ejs");
app.set("views","./app/views");
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(expressSession({
    secret:'mcflyviajounotempocomrick',
    resave:false,
    saveUninitialized:false       
}));


consign().include("app/routes").then("app/controllers").then("app/models").into(app,fetch);
module.exports = app;

