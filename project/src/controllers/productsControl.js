const articles = require("../models/products.json")


const product = {
    main: (req,res) =>{
        res.render("carrito-compra");
    },
    detail: (req,res) =>{
        res.render("detail",{ articles });
    },
    edit: (req, res) =>{
        res.render("formEdit")
    },
    upLoad: (req, res) =>{
        res.render("formUpload")
    }

};

module.exports= product;