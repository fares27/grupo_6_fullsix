const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require ('method-override'); //Para poder usar los métodos PUT y DELETE

const mainRouter = require("./routes/mainRouter")
// Crear el path hacia la carpeta Public
const publicPath = path.resolve(__dirname, "./public");


// MIDDLEWARES //
// Establecer como carpeta Publica - Public
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.use(methodOverride('_method')); //Para poder pisar el method="POST" en el formulario por PUT y DELETE

// Rutas
app.use(mainRouter);

//Error 404
app.use((req, res, next) => {
  res.status(404).render('not-found')
})


// Poner a escuchar el servidor en el puerto indicado
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

