const express = require("express");
const router = express.Router();
const productsControl = require("../controllers/productsControl");
const Fileupload = require("../services/fileUpload");
const logMiddleware = require("../middleware/logMiddleware");
const { validateProduct } = require("../services/validateEditprod");
const validationProduct = require("../services/validationProduct");





//rutas para el home------------------------------------------------
router.get("/", productsControl.renderHomePage); //muestra todos los objetos en el HOME
router.post("/");

router.get("/cart", productsControl.renderCart);
//router.get("/detail/:id",logMiddleware, productsControl.detail);
/*
router.get("/create", productsControl.createProd);
router.post("/create/",validationProduct,Fileupload.single('imagen'), productsControl.create);
*/
router.get("/cart", productsControl.renderCart);
//rutas para detail--------------------------------------------------
router.get("/detail/:id",logMiddleware, productsControl.renderViewDetail); // MUESTRA SOLO 1 OBJETO

router.get("/create", productsControl.create);
router.post("/create/",validationProduct,Fileupload.single('img_url'), productsControl.createNewProduct);

router.get("/edit/:id",productsControl.edit);
router.put("/edit/:id/",Fileupload.single('img_url'),validateProduct,productsControl.updateProduct);
    //validationProduct,productsControl.upLoadImag);
router.get("/delete/:id", productsControl.deleteProduct);


module.exports = router;