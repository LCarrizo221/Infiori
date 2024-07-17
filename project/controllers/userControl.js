const user = {
    login: (req,res) =>{
        res.render("login")
    },
    register: (req,res) =>{
        res.render("register.ejs")
    }
}

module.exports = user;