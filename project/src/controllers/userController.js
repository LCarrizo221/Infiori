const userController = {
    showLogin: (req,res) => {
        res.render("login.ejs");
    },
    processLogin: (req, res) => {
        const { userName, password } = req.body;
        console.log(`Intento de login con usuario: ${userName}`);
        res.redirect('/');
    },
    showRegister: (req,res) => {
        res.render("register.ejs");
    },
    processRegister: (req, res) => {
        const { userName, password } = req.body;
        console.log(`Intento de registro con user: ${userName}`);
        res.redirect('/user/login');
    }
};

module.exports = userController;