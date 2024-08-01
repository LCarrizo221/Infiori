const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");
const Fileupload = require("../services/fileUpload");


router.get("/cart", productsControl.cart);
router.get("/detail/:id", productsControl.detail);
router.get("/edit",productsControl.edit);
router.get("/upload", productsControl.upLoad);
router.post("/upload/", Fileupload.single('imagen'), productsControl.upLoadImag);



module.exports = router;