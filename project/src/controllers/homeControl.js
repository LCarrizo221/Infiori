const articles = require("../models/products.json")


const homeController = {
    main: (req, res) => {
        res.render('home', { articles });
    }
};

module.exports = homeController;
