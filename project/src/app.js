const express = require("express");
const path = require("node:path");
const app = express();

//define port
const port = 3000 || process.env.PORT;

//define routes
const homeRoute = require("./routes/homeRoute");
const productsRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoute");

//define templates engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//midleware dir public
app.use(express.static(path.join(__dirname, "..", "public")));

//track routes
app.use("/", homeRoute);
app.use("/product", productsRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server run: http://localhost:${port}`);
});
