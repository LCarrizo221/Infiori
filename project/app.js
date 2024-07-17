const express=require('express');
const path = require("node:path");
const app= express();
const homeRoute = require("./routes/homeRoute")
const productsRoute = require("./routes/productsRoute")
const userRoute = require("./routes/userRoute")

const port = 3000 || process.env.PORT;



app.listen(port, (err) => console.log(`Server run: http://localhost:${port}`))

app.use(express.static("./public"));

app.set ("view engine", "ejs");



app.use("/", homeRoute)
app.use("/product", productsRoute);
app.use("/user", userRoute)
