
const product = {
    main: (req,res) =>{
        res.render("carrito-compra");
    },
    detail: (req,res) =>{
        res.render("detail");
    }

};

module.exports= product;