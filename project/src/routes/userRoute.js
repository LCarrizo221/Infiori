const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidations = require("../services/userValidations")

router.get("/register", userController.showRegister);
router.get("/login", userController.showLogin);

router.post("/login", userController.processLogin);
router.post("/register", userController.processRegister);

module.exports = router;