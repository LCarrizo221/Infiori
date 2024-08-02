const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");
const Fileupload = require("../services/fileUpload");
const logMiddleware = require("../middleware/logMiddleware");


router.get("/cart", productsControl.main);

router.get("/detail/:id",logMiddleware, productsControl.detail);
router.get("/edit",productsControl.edit);
router.get("/upload", productsControl.upLoad);
router.post("/upload/", Fileupload.single('imagen'), productsControl.create);

router.get("/delete/:id/", productsControl.delete);



module.exports = router;