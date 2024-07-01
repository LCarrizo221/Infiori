const express=require('express');
const path = require("node:path");
const app= express();

let port = 3000 || process.env.PORT;

app.get("/",(req, res)=>{
    res.sendFile(path.resolve("views/home.html"));
});

app.listen(port, (err) => console.log(`Server run: http://localhost:${port}`))

app.use(express.static("./public"));

app.get('/detailProduct',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/detailProduct.html'));
});