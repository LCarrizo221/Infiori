const { log } = require("console");

const fs = require('fs');
const path = require('node:path');

const productsFilePath = path.join(__dirname,"../models/products.json");
const articles = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const product = {
    main: (req, res) => {
        res.render("carrito-compra");
    },
    detail: (req, res) => {
        let id = req.params.id;
        let product = articles.find((product) => product.id == req.params.id);
        res.render('detail', { product });
    },
    edit: (req, res) => {
        res.render("formEdit");
    },
    upLoad: (req, res) => {
        res.render("formUpload");
    },
    create: (req,res) =>{
        let id = articles.length+1;
        const article = {
            id: id,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: '/img/products/' + req.file.filename,
            tipo: req.body.tipo,
            precio: req.body.precio
        };
        articles.push(article);
        fs.writeFileSync(productsFilePath, JSON.stringify(articles, null, 2));
        //res.send("archivo subido correctamente" );
        res.redirect("/");

    },
    delete: (req,res)=>{
        let id = req.params.id;
        let artDel = articles.filter((article) => article.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(artDel, null, 2));
        res.redirect("/");
    }
}


module.exports = product;