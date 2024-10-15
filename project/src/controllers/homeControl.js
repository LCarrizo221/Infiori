const articles = require("../database/products.json")



const homeController = {
    main: (req, res) => {
        res.render('home', { articles });
    },
    filter: (req, res) =>{
        const listCategory = [];
    }
};


module.exports = homeController;
