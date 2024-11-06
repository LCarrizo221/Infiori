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

    // Actualiza un usuario existente
    updateUser: async (req, res) => {
        const { userName, firstname, category } = req.body;

        try {
            const user = await db.USERS.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send("Usuario no encontrado.");
            }

            user.name = userName || user.name;
            user.firstname = firstname || user.firstname;
            user.category = category || user.category;
            await user.save();

            res.json(user);

        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            res.status(500).send("Error al actualizar el usuario.");
        }
    },

    // Elimina un usuario existente
    deleteUser: async (req, res) => {
        try {
            const user = await db.USERS.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send("Usuario no encontrado.");
            }

            await user.destroy();
            res.status(204).send();  // Respuesta sin contenido

        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            res.status(500).send("Error al eliminar el usuario.");
        }
    }
};

module.exports = userController;