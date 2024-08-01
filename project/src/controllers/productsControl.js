const { log } = require("console");

const fs = require('fs');
const path = require('node:path');

const productsFilePath = path.join(__dirname,"../models/products.json");
const articles = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const product = {
    cart: (req, res) => {
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
    upLoadImag: (req,res) =>{
        let updated = false;
        let id = articles.length+1;
        
        let articleUpd = articles.filter((article) => {
            if(article.id != id){
            article.id = id;
            article.titulo = req.body.titulo;
            article.descripcion = req.body.descripcion;
            article.imagen = '/img/'+req.file.filename;
            article.tipo = req.body.tipo;
            article.precio = req.body.precio;
            updated = true;
        }
            return article;
        });
        if (updated) {
            fs.writeFileSync(productsFilePath, JSON.stringify(articleUpd, null, 2));
            //res.send(productUpd[id-1]);
            res.send("archivo subido correctamente");
        } else {
            res.send('Producto no encontrado' );
        }
    
    }
}


module.exports = product;