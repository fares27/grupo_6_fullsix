

// REQUIRES DEL APP.JS
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require ('method-override'); //Para poder usar los métodos PUT y DELETE
const fs = require("fs");
const mainRouter = require("./routes/mainRouter")
const productsRouter = require("./routes/productsRouter")
const authRouter = require("./routes/authRouter")
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Crear el path hacia la carpeta Public
const publicPath = path.resolve(__dirname, "./public");


// MIDDLEWARES //
// Establecer como carpeta Publica - Public
app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.use(methodOverride('_method')); //Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: '$3cr3T0 Fu11 $1x'}));
app.use(cookieParser());


// Rutas
app.use(mainRouter);
app.use(productsRouter);
app.use(authRouter);

//Error 404. Tiene que ir desp de las rutas 
app.use((req, res, next) => {
  res.status(404).render('not-found')
})


// Poner a escuchar el servidor en el puerto indicado
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
