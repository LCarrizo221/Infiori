// Config multer for multimedia
const path = require('node:path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
      let folder = path.join(__dirname,'../../public/imageProductInfo');
        callback(null,folder);
    },
    filename: (req,file,callback)=> {

    callback(null, file.originalname+'-'+ Date.now() + path.extname(file.originalname));
    }
});

var Fileupload = multer({storage : storage});

module.exports = Fileupload;
