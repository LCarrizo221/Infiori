let path = require('node:path');

const homeController = {
    main: (req,res) =>{
        res.render("home");
    }
};

module.exports = homeController ;