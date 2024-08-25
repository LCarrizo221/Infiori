const User=require('../models/User')


user.create(req.body);
return res.send('ok, las validaciones se pasaron y no tiene errores')
const user = {
    login: (req,res) =>{
        res.render("login.ejs");
    },
    register: (req,res) =>{
        res.render("register.ejs");
    }
};

module.exports = user;