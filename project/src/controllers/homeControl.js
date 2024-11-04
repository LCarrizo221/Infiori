const articles = require("../database/products.json")
const db = require('../database/models');


const homeController = {
    main: (req, res) => {
        db.Product.findAll({
            include: [{
              model: db.Picture,
            
            }],
          }). then(products =>  res.render("home", {products}));
      
    },
    filter: (req, res) =>{
        const listCategory = [];
    }
};


module.exports = homeController;
