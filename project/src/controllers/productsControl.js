const { log } = require("console");
const articles = require("../models/products.json")


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
    upLoadImag: (req, res) => {
        console.log(req.file);
        res.send("archivo subido correctamente")

    }
}


module.exports = product;