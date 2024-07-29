const articles = require("../models/products.json")


const product = {
    main: (req, res) => {
        res.render("carrito-compra");
    },
    detail: (req, res) => {
        const productId = req.params.id;
        const selectedProduct = articles.find(article => article.id == productId);

        if (selectedProduct) {
            res.render("detail", { selectedProduct });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    edit: (req, res) => {
        res.render("formEdit")
    },

    upLoad: (req, res) => {
        res.render("formUpload")
    }
}


module.exports = product;