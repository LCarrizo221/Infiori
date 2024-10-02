const articles = require("../database1/products.json")



const homeController = {
    main: (req, res) => {
        res.render('home', { articles });
    },
    filter: (req, res) =>{
        const listCategory = [];
    }
};


module.exports = homeController;
