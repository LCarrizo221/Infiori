const express = require("express");
const router = express.Router();
const productsControl = require("../controllers/productsControl");
const Fileupload = require("../services/fileUpload");
const logMiddleware = require("../middleware/logMiddleware");
const validationProduct = require("../services/validationProduct");
const productController = require("../controllers/productController");



//rutas para el home------------------------------------------------
router.get("/", productsControl.renderHomePage); //muestra todos los objetos en el HOME
router.post("/");

router.get("/cart", productsControl.renderCart);
//router.get("/detail/:id",logMiddleware, productsControl.detail);
/*
router.get("/create", productsControl.createProd);
router.post("/create/",validationProduct,Fileupload.single('imagen'), productsControl.create);
*/
// prueba view all product
router.get("/view/:id",productsControl.viewDetail);
// rutas de desarrollo
router.get("/viewAll",productsControl.viewAllProducts);
router.get("/view/:id",productsControl.viewDetail);


router.get("/cart", productsControl.renderCart);
//rutas para detail--------------------------------------------------
router.get("/detail/:id",logMiddleware, productsControl.renderViewDetail); // MUESTRA SOLO 1 OBJETO

router.get("/create", productsControl.create);
router.post("/create/",validationProduct,Fileupload.single('img_url'), productController.createNewP);
/*
router.get("/edit/:id",productsControl.edit);
router.put("/edit/", validationProduct,productsControl.upLoadImag);


router.get("/delete/:id/", productsControl.delete);
 */

//ARREGLAR DESPUES EL CRUD

module.exports = router;