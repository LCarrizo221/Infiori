
const { hashSync } = require("bcryptjs");
const db = require("../database/models");
const sequelize = db.sequelize;
const fs = require("node:fs/promises");
const path = require("path");

const usersFilePath = path.join(__dirname, '../models/users.json');

const userController = {
    showForein: (req,res) =>{
        db.USERS.findAll()
        .then(users => res.send(users));
    },
    showLogin: (req, res) => {
        res.render("login.ejs");
    },
 // proceso del login para guardar en session
    processLogin: (req, res) => {
        const { userName, password } = req.body;
        console.log(`Intento de login con usuario: ${userName}`);

        try {
            const usersData = fs.readFile(usersFilePath, "utf-8");
            const users = JSON.parse(usersData);
            const user = users.find(u => u.email === userName && u.password === password);


            if (user) {
                req.session.userId = user.id;
                req.session.userName = user.firstName
                req.session.user = user;
                console.log(`${userName} se ha logueado correctamente.`);
                res.redirect("/")
            } else {
                console.log("Credenciales invalidas.");
                res.redirect("login.ejs")
            }
        } catch (error) {
            console.error("Error al procesar el login", error);
            res.status(500).send("Error al procesar el login.");
        }

        //res.redirect('/');
    },

    showProfile: (req, res) => {
        if (!req.session.userId) {
            return res.redirect("login.ejs")
        }

        const userId = req.params.id;

        try {
            const usersData = fs.readFile(usersFilePath, "utf8");
            const users = JSON.parse(usersData);

            const user = users.find(u => u.id === userId);

            if (!user) {
                return res.status(404).send("Usuario no encontrado")
            }

            if (req.session.userId !== user.id) {
                return res.status(403).send("Acceso denegado")
            }

            res.render("profile", { user });
        } catch (error) {
            console.error("Error al leer el archivo de usuarios", error);
            res.status(500).send("Error interno del servidor");
        }

    },

    showRegister: (req, res) => {

        if (req.session.userId) {
            return res.redirect(`/profile/${req.session.userId}`);
        }
        res.render("register.ejs");
    },

    processRegister: async (req, res) => {
        const { userName, 
            password, 
            nombre, 
            apellido } = req.body;
        console.log(`Intento de registro con user: ${userName}`);
        
        try {
            // Generar un hash para la contraseña
            const salt = await bcrypt.genSalt(10); // Genera un "salt" con un factor de costo de 10
            const hashedPassword = await bcrypt.hash(password, salt); // Hashea la contraseña usando el "salt"
    
            // Crear un nuevo usuario con la contraseña hasheada
            await Usuario.create({
                nombre,
                email: userName, // Añadido userName como email
                password: hashedPassword
            });
    
            // Leer los usuarios actuales
            let users = [];
            try {
                const usersData = await fs.readFile(usersFilePath, 'utf8');
                users = JSON.parse(usersData);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    // Si el archivo no existe, creamos un archivo vacío
                    await fs.writeFile(usersFilePath, JSON.stringify([]), 'utf8');
                } else {
                    console.error("No se pudo leer el JSON de usuarios", error);
                    throw error;
                }
            }
    
            // Crear un nuevo usuario
            const newUser = {
                id: users.length + 1,
                firstName: nombre,
                lastName: apellido,
                email: userName,
                password,
                category: "user",
                image: ""
            };
    
            users.push(newUser);
    
            // Escribir los usuarios actualizados en el archivo
            await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
            console.log(`${userName} se agregó correctamente`);
    
            // Redirigir al usuario después de que se haya agregado correctamente
            res.redirect('/user/login');
    
        } catch (error) {
            console.error("Error en el registro:", error);
            if (!res.headersSent) {
                res.status(500).send("Error al registrar el usuario");
            }
        }
    }
}

module.exports = userController;
