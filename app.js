const express = require ('express');
const path = require('path');
const app = express();

// Crear el path hacia la carpeta Public
const publicPath = path.resolve(__dirname,'./public');

// Establecer como carpeta Publica - Public
app.use(express.static(publicPath));

// Poner a escuchar el servidor en el puerto indicado
app.listen(3000, () => {
console.log ("Servidor corriendo en el puerto 3000")
});

// Vista a ejecutar en el Home
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})
