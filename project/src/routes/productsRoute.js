const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");

router.get("/cart", productsControl.main);
router.get("/detail", productsControl.detail);

module.exports = router;