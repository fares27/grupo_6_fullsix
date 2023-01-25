const express = require("express");

const router = express.Router();
const mainController = require("../controllers/mainController")
const path = require('path');

// EJEMPLO DE MIDDLEWARE, ELIMINAR DESPUES
/*const checkBody = (req,res,next) => {
  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.picture);
  console.log(req.body.category);
  console.log(req.body.price);
  next();
}*/

// Vista a ejecutar en el Home
router.get("/", mainController.index);  // HOME 
  
  router.get("/login", mainController.login); // LOGIN USUARIO
  
  router.get("/register", mainController.register); // REGISTRO DE USUARIO

  router.get("/productCart", mainController.productCart); // CARRITO DE COMPRAS

  router.get("/products/create", mainController.productFormLoad); // FORMULARIO DE CREACION DE PRODUCTO // CREATE GET

  router.post("/products", mainController.productCreate); // FORMULARIO DE ENVIO DE CREACION DE PRODUCTO // CREATE POST

  router.get("/products", mainController.products); // LISTADO DE PLANES (PRODUCTOS) // READ ALL

  router.get("/products/:id/", mainController.productDetail); //  LISTADO DE PLAN (PRODUCTO) // READ ONLY 

  router.get("/products/:id/edit", mainController.productFormEdit); // FORMULARIO DE EDICION DE PRODUCTO // UPDATE GET

  router.put("/products/:id/", mainController.productEdit); // FORMULARIO DE ENVIO DE EDICION DE PRODUCTO // UPDATE PUT

  router.delete("/products/:id/", mainController.productDelete); // FORMULARIO DE ENVIO DE ORDEN DE ELIMINACION

  
module.exports = router;
