const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");
const Fileupload = require("../services/fileUpload");
const logMiddleware = require("../middleware/logMiddleware");
const validationProduct = require("../services/validationProduct");


router.get("/cart", productsControl.cart);
router.get("/detail/:id",logMiddleware, productsControl.detail);
router.get("/edit",productsControl.edit);
router.get("/upload", productsControl.upLoad);
router.post("/upload/", Fileupload.single('imagen'), validationProduct, productsControl.create);

//Implements for Lucas Carrizo 
//router.post("/upload/", Fileupload.single('imagen'), productsControl.upLoadImag);
router.post("/");

router.get("/delete/:id/", productsControl.delete);



module.exports = router;