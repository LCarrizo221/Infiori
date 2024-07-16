const expres = require("express");
const homecontrol = require("../controllers/homeControl");
const router = express.Router;


router.get("/", homecontrol.main);


module.exports = router;