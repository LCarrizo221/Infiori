const express = require("express")
const router = express.Router()
const productsControl = require("../controllers/productsControl");

// Config multer for multimedia
const multer = require('multer');

let multerDiskStorage = multer.diskStorage({
    destination:(req,file,callback)=>{
      let folder = '/public/imageProductInfo'
        callback(null,folder);
    },
    filename: (req,file,callback)=> {

    callback(null, file.fieldname+'-'+path.extname(file.originalname));
    }
});

const fileUpload = multer({ multerDiskStorage : multerDiskStorage });

router.get("/cart", productsControl.main);
router.get("/detail/:id", productsControl.detail);
router.get("/edit",productsControl.edit);
router.get("/upload", productsControl.upLoad);
router.post("/upload/", fileUpload.single('imagen'), productsControl.upLoadImag);



module.exports = router;