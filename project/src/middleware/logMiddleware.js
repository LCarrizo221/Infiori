const exp = require("constants");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const logFilePath = path.join("src","middleware","logUser.txt") ;


function logMiddleware(req,res,next){
    fs.appendFileSync(logFilePath, "El usuario ingreso a la ruta: "+req.url+"\n");
    next();
};

module.exports = logMiddleware;