const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");

router.get("/cart", productsControl.main);
router.get("/detail/:id", productsControl.detail);
router.get("/edit",productsControl.edit)
router.get("/upload", productsControl.upLoad)


module.exports = router;