const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

const userController = {
    // Obtiene todos los usuarios en formato JSON
    getAllUsers: async (req, res) => {
        try {
            const users = await db.USERS.findAll();
            res.json(users);
        } catch (error) {
            console.error("Error al obtener todos los usuarios:", error);
            res.status(500).send("Error al obtener los usuarios.");
        }
    },
    getAllUsers2: async (req, res) => {
        try {
            const users = await db.USERS.findAll();
            res.json(users);
        } catch (error) {
            console.error("Error al obtener todos los usuarios:", error);
            res.status(500).send("Error al obtener los usuarios.");
        }
    }, getUserById2: async (req, res) => {
        try {
            const user = await db.USERS.findByPk(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("Usuario no encontrado.");
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            res.status(500).send("Error al obtener el usuario.");
        }
    },

    // Obtiene un usuario específico por su ID
    getUserById: async (req, res) => {
        try {
            const user = await db.USERS.findByPk(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("Usuario no encontrado.");
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            res.status(500).send("Error al obtener el usuario.");
        }
    },

    // Crea un nuevo usuario
    createUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userName, password, firstname, category } = req.body;

        try {
            // Verifica si el usuario ya existe
            const existingUser = await db.USERS.findOne({ where: { mail: userName } });
            if (existingUser) {
                return res.status(400).json({ error: "El correo ya está registrado." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.USERS.create({
                name: userName,
                firstname,
                mail: userName,
                password: hashedPassword,
                category
            });

            res.status(201).json(newUser);

        } catch (error) {
            console.error("Error al crear el usuario:", error);
            res.status(500).send("Error al crear el usuario.");
        }

    },
    // Crear un nuevo usuario
    createUser2: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userName, password, firstname, category } = req.body;

        try {
            const existingUser = await db.USERS.findOne({ where: { mail: userName } });
            if (existingUser) {
                return res.status(400).json({ error: "El correo ya está registrado." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.USERS.create({
                name: userName,
                firstname,
                mail: userName,
                password: hashedPassword,
                category
            });
            res.redirect("/")

            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            res.status(500).send("Error al crear el usuario.");
        }
    },
        showProfile: async (req, res) => {
            const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la URL

            try {
                // Busca el usuario en la base de datos por su ID
                const user = await Usuario.findByPk(userId);

                if (!user) {
                    // Si no se encuentra el usuario, envía un mensaje de error o redirige a otra página
                    return res.status(404).send("Usuario no encontrado");
                }

                // Renderiza la vista del perfil, pasando los datos del usuario
                res.render("profile", { user });
            } catch (error) {
                console.error("Error al cargar el perfil del usuario:", error);
                res.status(500).send("Error al cargar el perfil del usuario.");
            }
        },

        showRegister: (req, res) => {
            res.render("register.ejs", { errors: [], oldData: {} });
        },
        showLogin: (req, res) => {
            try {
                res.render("login");
            } catch (error) {
                console.error("Error al mostrar la página de login:", error);
                res.status(500).send("Error al cargar la página de login.");
            }
        },

        /*         if (req.session.userId) {
                    return res.redirect(`/profile/${req.session.userId}`);
                } */
        processRegister: async (req, res) => {
            const { userName, password, repassword } = req.body;
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
                console.error("Error al eliminar el usuario:", error);
                res.status(500).send("Error al eliminar el usuario.");
            }
        },
        processLogin: async (req, res) => {
            const { userName, password } = req.body;
    
            try {
                // Buscar el usuario en la base de datos usando el email o userName
                const user = await Usuario.findOne({ where: { email: userName } });
    
                if (!user) {
                    // Si no se encuentra el usuario, envía un mensaje de error
                    return res.status(401).render("login", { error: "Usuario o contraseña incorrectos" });
                }
    
                // Verificar si la contraseña es correcta
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    // Si la contraseña no coincide, enviar un mensaje de error
                    return res.status(401).render("login", { error: "Usuario o contraseña incorrectos" });
                }
    
                // Establecer una sesión para el usuario
                req.session.user = {
                    id: user.id,
                    name: user.nombre,
                    email: user.email
                };
    
                console.log(`Usuario ${user.email} ha iniciado sesión exitosamente`);
    
                // Redirigir al perfil o página de bienvenida
                res.redirect(`/profile/${user.id}`);
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                res.status(500).send("Error al iniciar sesión.");
            }
        },
    }

module.exports = userController;