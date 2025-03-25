const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/mongoose-connection.js")

const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");

const PORT = process.env.PORT;

const cookieParser = require("cookie-parser");
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.get("/", (req, res) => {
    res.send("Hello World!!");
})

app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
})