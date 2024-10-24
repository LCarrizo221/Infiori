const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");
const Fileupload = require("../services/fileUpload");
const logMiddleware = require("../middleware/logMiddleware");
const validationProduct = require("../services/validationProduct");

router.post("/");

router.get("/cart", productsControl.cart);
router.get("/detail/:id",logMiddleware, productsControl.detail);

router.get("/create", productsControl.createProd);
router.post("/create/",Fileupload.single('imagen'), productsControl.create);

// prueba view all product
router.get("/view/:id",productsControl.viewDetail);

router.get("/edit/:id",productsControl.edit);
router.put("/edit/", validationProduct,productsControl.upLoadImag);


router.get("/delete/:id/", productsControl.delete);


module.exports = router;