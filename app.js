const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/mongoose-connection.js")
const expressSession = require("express-session")
const flash = require("connect-flash");

const indexRouter = require("./routes/index.js")
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

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
})