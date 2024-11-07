const express = require("express");
const path = require("node:path");
const app = express();
const session = require('express-session');
const methodOverride =  require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser')
const APIroutes = require('./routes/APIsRoute')

//define port
const port = 3000 || process.env.PORT;

//Ready const for working method POST
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Importar rutas
const productsRoute = require("./routes/productsRoute");
/* const userRoute = require("./routes/userRoute"); */ // SACAR DESPUES ---------------------------------------------------------------------------

//define templates engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//midleware dir public
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(session({secret: "secreto"}));
//track routes
app.use("/", productsRoute);   // La ruta home ahora está dentro de productsRoute
app.use("/product", productsRoute);
/* app.use("/user", userRoute); */ //SACAR DESPUES---------------------------------------------------------------------------
app.use("/cart", productsRoute)

//Configuration petitions user the method PUT and DELETE
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

/* Configuration 404 error handler
app.use((req,res,next) => {
res.status(404).render('not-found');
}); */
//------------Lo tuve que sacar por que interferia con la API, hay que ver de hacerlo mejor-----------//

app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes como JSON
app.use(cors())

// Usar las rutas
app.use('/api', APIroutes); 

app.listen(port, () => {
  console.log(`\\*-------------------------*\\`);
  console.log(`Server running in ${port} port`);
  console.log(`Now, you can open http://localhost:${port} in your favorite browser `);
  console.log(`Happy programming and never stop learning!`);
  
  console.log(`\\*-------------------------*\\`);
});
