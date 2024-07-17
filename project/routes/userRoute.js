const express = require("express");
const router = express.Router();
const userControl = require("../controllers/userControl")


router.get("/register", userControl.register)
router.get("/login", userControl.login)


module.exports = router;