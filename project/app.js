const express=require('express');
const path = require("node:path");
const app= express();
const homeRoute = ("/routes/homeRoute")

const port = 3000 || process.env.PORT;



app.listen(port, (err) => console.log(`Server run: http://localhost:${port}`))

app.use(express.static("./public"));

app.set ("view engine", "ejs");



app.get("/", homeRoute)


app.get('/detailProduct',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/detailProduct.html'));
});

app.get("/login", (req,res) =>{
    res.sendFile(path.resolve("views/login.html"))
})
app.get('/shoppingCart',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/carrito-compra.html'));
});

app.get("/register", (req,res) =>{
    res.sendFile(path.resolve("views/formulario.html"))
})