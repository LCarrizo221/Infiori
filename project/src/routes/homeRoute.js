const express = require("express");
const homeControl = require("../controllers/homeControl");
const router = express.Router();


router.get("/", homeControl.main);


module.exports = router;