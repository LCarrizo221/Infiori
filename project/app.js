const express=require('express');
const path = require("node:path");
const app= express();
app.use(express.static("./public"));
const PORT=process.env.PORT ?? 3030;
app.get("/",(req, res)=>{
    res.sendFile(path.resolve("views/home.html"));
});

app.listen(PORT, (err)=>{
    err
    ?console.error("Servidor failed:",err.message)
    : console.log(`Server running on http://localhost:&{PORT}`)
})