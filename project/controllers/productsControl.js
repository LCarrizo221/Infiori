const product = {
    main: (req,res) =>{
        res.render("carrito-compra")
    },
    detail: (req,res) =>{
        res.render("detailProduct")
    }

};

module.exports= product;